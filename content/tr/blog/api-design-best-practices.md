---
title: "RESTful API Tasarım İlkeleri"
description: "Profesyonel ve sürdürülebilir API'ler tasarlamak için en iyi pratikler."
date: 2026-01-12
readTime: "10 dk"
tags: ["API", "REST", ".NET"]
icon: "lucide:plug"
image: ""
---


İyi tasarlanmış bir API, hem geliştirici deneyimini hem de sistem güvenilirliğini artırır.

## Kaynak İsimlendirme

Endpoint'lerinizde çoğul isimler ve tutarlı yapı kullanın:

```
GET    /api/products        → Tümünü listele
GET    /api/products/{id}   → Tek kayıt getir
POST   /api/products        → Yeni oluştur
PUT    /api/products/{id}   → Güncelle
DELETE /api/products/{id}   → Sil
```

## Hata Yönetimi

Anlamlı HTTP durum kodları ve tutarlı hata formatı kullanın:

```json
{
  "type": "validation_error",
  "title": "Doğrulama hatası",
  "errors": {
    "name": ["İsim alanı zorunludur"]
  }
}
```

## Versiyonlama

API'nizi baştan versiyonlayın. URL tabanlı (`/api/v1/`) veya header tabanlı versiyonlama kullanabilirsiniz.
