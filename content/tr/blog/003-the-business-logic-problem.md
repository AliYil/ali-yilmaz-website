---
title: "'İş Mantığı' Problemi"
description: "Buyruksal, bildirimsel ve bir kunduzun birbiriyle alakası"
date: 2026-10-30
author: "Ali Yılmaz"
readTime: "5 dk"
tags: 
  - business-logic
  - dsl
  - bever
icon: "lucide:briefcase-business"
image: ""
---

Yazılımcısınız ve size bir görev geldi.

> Aktivite kaydını kapatma yetkisi X rolünden Y rolüne alınsın.

Uygulama kodunu IDE ile açtınız. Karşınızda şirketin enterprise uygulamasının yüzlerce dosyadan oluşan kod projesi. İçinde 1000 satır kod bulunan dosyalar. Birçoğu endpoint, doğrulama, yetkilendirme, veri erişimi, loglama gibi sistemin **boilerplate** dediğimiz, iş kuralları ve iş mantığı dışında kalan kodlar. Nereden başlayacağınızı bile bilemiyorsunuz, çünkü karşınıza çıkan tablo, çalışmanızı yapacağınız asıl alan olan iş kurallarını samanlıkta iğne arar gibi aratıyor.

Günümüz iş uygulaması kod tabanlarında bu boilerplate ve iş mantığını sağlayan kodlar iç içe geçmiş durumda. Bu durum yıllardır "ya bunları ayırırsak?" sorusunu düşünmeme sebep oldu. Hayır, farklı bir klasöre almaktan ya da farklı bir kod katmanında bulundurmaktan bahsetmiyorum. Bunlar ilerleme, ancak kastettiğim "ayırmak" farklı bir şey.

## Buyruksal kodlar

Geleneksel uygulama kodları **imperative** dediğimiz, yani **buyruksal** ya da **emredici** olarak Türkçeye çevirebileceğimiz yapıdadır. Kaba bir örnek olarak:

    A yap;
    B'yi C parametresi ile yap;
    D == E ise:
        F yap;

İşlemler yukarıdan aşağıya sırayla yapılıyor. Bu yapı günün sonunda işlemcide çalışacak bir görev için bire bir. Çünkü işlemciler de derlenmiş opcode'ları çalıştırırken bu şekilde, sırayla, bir talimatlar zincirini işleyerek çalışır.

Bu yapı, bir makineye sırayla yapması gereken şeyleri söylemek için uygun. Örneğin bir dosya güncellenmesi gerektiğinde;

    X dosyasını aç;
    İçine bir satır metin ekle;
    Dosyayı kapat;

şeklinde talimatlandırılabilir.

## Bildirimsel kodlar

Şimdi de *imperative* programlamanın zıttı olan *declarative* yani *bildirimsel* yapıya bakalım.

    A şöyledir
    B şunlardır:
        C'si vardır
        D'si şu şekildedir

Talimatlardan çok bir **yapıyı**, bir **veriyi** tanımlıyor. Veri depolama ve **serialize** edilmiş bir veriyi temsil etmek için de kullanılıyor. XML, CSS ve JSON, *declarative* kodlara örnek verilebilir.

Eskiden *imperative* kullanılan birçok alan *declarative* yapıya geçirildi. Örneğin arayüzü tasarlayan kodlar için günümüzde neredeyse sadece *declarative* kullanılıyor (HTML, CSS gibi). React gibi daha modern arayüz kütüphane/*framework*lerinin gelişmesiyle verilerin arayüzde temsil edilmesi de *declarative* yapıya geçirildi. Artık **Gönder** butonuna basınca formdaki her girişi tek tek okuyup bir JSON'a çevirmiyoruz; veri nesnesini form elementlerine *bind* etmek işi hallediyor.

## İş Mantığının Yeri

İş uygulamalarındaki o "Sipariş kaydı 5000$ ve üzerindeyse yönetici onayından geçsin" kuralını nasıl yazacağız?

Kullandığımız yazılım dili *imperative* olduğu için mecbur bu kuralı o yapıda gerçekleştirmeye kendimizi zorluyoruz.

```cs
    // Sipariş gönderilirken:
    if (order.Amount < 5000)
    {
        order.Status = Status.Approved;
    }
    else
    {
        createApproval(order, Role.Manager);
    }

    // Onay verilirken:
    if(User.IsInRole(Role.Manager))
    {
        order.Status = Status.Approved;
    }
```

İlk bakışta bu kodda sorun gözükmüyor. Kısa ve okunaklı. Sorun zaman geçtikçe ortaya çıkıyor.

- **Kural sadece gönderim anında çalıştı.** 4000$'lık sipariş onaylandı, ardından tutar 6000$ olarak güncellendi. Sipariş hala onaylı. Güncelleme endpoint'i dahil tutarın değişebileceği her yere kuralı koymak gerekiyor.
- **Yeni bir sipariş yolu açılıyor.** Bir yıl sonra gelen toplu içe aktarma özelliği ve bir iş ortağı API'ı da siparişler oluşturuyor. Kuralın kodu ya kopyalanıyor ya da unutuluyor. Unutulursa hiçbir şey hata vermiyor.
- **Kuralın değiştiğini düşünün.** Gold müşterilerde limit 10.000$ olsun. Kaç yeri değiştireceksiniz? Hepsini bulduğunuzu nasıl bileceksiniz?

Bunların hiçbiri kötü yazılımcının hatası değil. Hepsinin kaynağı aynı: **`if` tek bir yolu anlatır, iş kuralı ise bütün yollar hakkında bir iddiadır.** "5000$ ve üzeri hiçbir sipariş yönetici onayı olmadan onaylı olamaz" cümlesi, o duruma giden her yol için geçerlidir. *Imperative* kod ise bunu ancak yol yol söyleyebilir.

## Proje Yöneticisinin Sorusu

> 5000$ ve üzeri bir sipariş, yönetici onayı olmadan onaylı duruma gelebilir mi?

*Imperative* kod tabanlarında yazılımcının cevabı şu:

> `Status` ve `Amount` alanını güncelleyen her yeri kontrol etmem gerekiyor.

O cevap da bir sonraki *commit*'e kadar geçerli. Testler de bu soruyu kapatmıyor, çünkü yalnızca akla gelen yolları sınıyorlar.

Peki kuralı, farklı yollara dağıtmak yerine siparişin kendisi hakkında bir bildirim olarak, yani **bildirimsel** yazsaydık?

    Varlık: Sipariş
        Alan: Tutar
        Alan: Durum (Taslak, Onaylı)
        Alan: Onaylayan
        Kural: Durum = Onaylı ise, Tutar < 5000 veya Onaylayan yönetici olmalı

Burada "ne zaman kontrol et" diye bir şey yok. Hangi endpoint'ten, hangi ekrandan geldiğinin de önemi yok. Sipariş kaydedilecekse kural geçerli olmak zorunda. Proje yöneticisinin sorusunun cevabı ise tek satır ve okunabilir.

Aynı şey yazının başındaki göreve de uyuyor. `Role.X` için arama yapıp 40 sonuç içinden hangilerinin kapatmayla ilgili olduğunu çözmek yerine, değişiklik tek satırlık bir fark oluyor. Üstelik bu farkı kod bilmeyen bir iş analisti de inceleyebilir.

## Karşınızda: Bever - İş Mantığı Dili

![Bever](/images/blog/003-the-business-logic-problem/bever-logo.svg){width="360" class="dark:hidden"}
![Bever](/images/blog/003-the-business-logic-problem/bever-logo-on-dark.svg){width="360" class="hidden dark:block"}

Bu soruların peşinden giderek [Bever](https://bever.dev)'ı geliştiriyorum. Maskotu kunduz olan Bever, iş uygulamalarının varlıklarını, kurallarını ve yetkilerini tanımladığınız bildirimsel bir dil. Yukarıdaki kuralın bugün yazılabilen hali şöyle:

```bev
Identity

Role Sales
Role Manager

Entity Order
    Field Number Text(20)
    Field Amount Money
    Field Status Enum(Draft, Approved) = Draft
    Field ApprovedBy -> Identity?

    Rule Status != Approved Or Amount < 5000 Or ApprovedBy != Null "Orders of 5000 or more need a manager's approval"

Action Create, Read Order
    By Sales
    By Manager

Action Update Order
    By Manager
```

<figure>
  <img src="/images/blog/003-the-business-logic-problem/order-validation.jpg" alt="Sipariş doğrulama">
  <figcaption>Yukarıdaki kodu Bever ile koşturduğunuzda karşınıza gelecek ekran ve kuralı çiğnemeye kalkıştığınızda karşılaşacağınız hata mesajı.</figcaption>
</figure>

Kural her oluşturma ve güncellemede, kaydın değişiklikten sonraki hali üzerinden kontrol ediliyor. Yani 4000$'lık onaylı siparişi 6000$ yapma isteği, onaylayan yoksa reddediliyor. Modelden üretilen API'ı kullanan yeni bir içe aktarma aracı da aynı kurala takılıyor; kimsenin kuralı kopyalaması gerekmiyor.

Yetki de aynı şekilde okunuyor. Yazının başındaki göreve benzeyen bir değişiklik şöyle olabilir:

```
    Action Update Activity
Sil:    By X
Ekle:   By Y
```

Geri kalan *boilerplate*'i, yani endpoint'leri, doğrulamayı ve yetki kontrollerini framework üstleniyor. Üstelik içinde gelen arayüz taslağı ile ekranlarınız temel işlevleriyle hazır geliyor.

## Henüz Çözmediği Şeyler

Bever henüz alfa öncesi aşamasında. Bu yazıda savunduğum yapıyı sağlayabilmesi için çok yol katetmesi gerekecek.

- `Sales` bir siparişi doğrudan `Approved` olarak oluşturup `ApprovedBy` alanına kendini yazabiliyor; kural onaylayanın gerçekten yönetici olduğunu kontrol etmiyor.
- `Update` yetkisi kayıt düzeyinde. `Sales` kendi taslağını düzenleyemiyor. Yönetici de `ApprovedBy` alanına başka birini yazabiliyor.
- 6000$'dan onaylanmış bir sipariş, `ApprovedBy` dolu olduğu için 50.000$'a çıkarılabiliyor.
- "Kapat" ya da "Onayla" gibi isimli işlemler, durum geçişleri ve koşullu yetkiler henüz yok; hepsi [yol haritasında](https://bever.dev/roadmap). Şu an yetkiler oluşturma, okuma, güncelleme ve silme düzeyinde tanımlanıyor.

Şu itiraz da haklı: "Bunu iyi bir domain modeliyle, `Order.Approve()` metoduyla da çözerim." Evet, iyi tasarlanmış bir domain modeli çok şeyi düzeltir. Ama bu yine koda yazılmış bir kuraldır; yeni bir yol onu atlayabilir. Ayrıca *boilerplate* ile aynı dilde yazılır. Hedefim, **alana özgü** bir dille *(domain-specific language - DSL)* işleri verimli hale getirmek.

Benim iddiam, her kodun bildirimsel olması gerektiği değil. İş mantığı ve kuralları dışında kalan kodlar *imperative* kalsın. Ama "5000$ ve üzeri sipariş yönetici onayı ister" bir talimat değil, işletmenin kendisi hakkında bir kural. Onu bir kural gibi yazabilmeliyiz.

## Yapay Zeka Çağına Uyumu

Yukarıdaki "yeni bir sipariş yolu açılıyor" maddesini hatırlayın. Bunu bir yılda bir yaşıyorduk. Yapay zeka ajanlarıyla her hafta yaşayabiliriz.

Ajana şunu söylediğinizi düşünün:

> Siparişler için toplu içe aktarma ekle.

Kural kod tabanına `if`'ler halinde dağılmışsa, ajan şöyle bir şey yazabilir:

```cs
foreach (var row in rows)
{
    _db.Orders.Add(new Order
    {
        Amount = row.Amount,
        Status = row.Status
    });
}
```

Kod derlenir, ajanın yazdığı testler de geçer. Burada yanlış bir satır yok, eksik bir satır var. Eksik satır da *diff*'te görünmez. İncelemeyi yapan kişi, kuralın burada da olması gerektiğini kendisi hatırlamak zorunda.

Kural modelde olduğunda, ajanın modelden üretilen API üzerinden yazdığı içe aktarma aracı da aynı kurala takılır. Kuralı gevşetmenin yolu modeli değiştirmektir, bu da tek satırlık ve gözden kaçması zor bir değişikliktir:

```
Sil:    Rule Status != Approved Or Amount < 5000 Or ApprovedBy != Null "..."
Ekle:   Rule Status != Approved Or Amount < 20000 Or ApprovedBy != Null "..."
```

Yani "yapay zekanın yazdığı kodu kim denetleyecek?" sorusunda, denetlemeniz gereken alan küçülüyor. Üstelik gelecekteki versiyonlarda, kısa bir `.bev` koduyla uygulamanın iş mantığı haritasının çıkarılabilmesinin, tüm kod tabanını taramaya nazaran token'ları da daha verimli kullanmanızı sağlayacağını düşünüyorum. Bever'ı geliştirme sebeplerimden biri de bu.

## Geri Bildirim

Proje açık kaynaklı. Çekirdek projeler Apache 2.0 lisanslı. [GitHub](https://github.com/bever-team) üzerinden projeye katkıda bulunabilirsiniz. Şu anda çok erken sürüm olduğu için geri bildirime ve kurcalanmaya çok ihtiyacı var. Küçük bir projede denemeniz *(henüz ciddi projelerde önermem)* ve geri bildiriminizin projeye büyük katkıları olacaktır.