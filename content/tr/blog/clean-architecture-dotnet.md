---
title: ".NET'te Clean Architecture: Pratik Bir Rehber"
description: "Clean Architecture prensiplerini .NET projelerinizde nasıl uygulayacağınızı adım adım öğrenin."
date: 2026-02-10
readTime: "8 dk"
tags: [".NET", "Architecture"]
icon: "lucide:layers"
image: ""
---


Clean Architecture, yazılım projelerinin sürdürülebilirliğini ve test edilebilirliğini artıran güçlü bir mimari yaklaşımdır.

## Neden Clean Architecture?

Geleneksel katmanlı mimarilerde, iş mantığı genellikle altyapı bağımlılıklarıyla iç içe geçer. Clean Architecture bu sorunu **bağımlılık tersine çevirme** prensibiyle çözer.

### Katmanlar

1. **Domain** - İş kuralları ve entity'ler
2. **Application** - Use case'ler ve iş mantığı
3. **Infrastructure** - Veritabanı, dosya sistemi, harici servisler
4. **Presentation** - API controller'ları, UI

```csharp
// Domain katmanında bir entity örneği
public class Product
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public decimal Price { get; private set; }

    public static Product Create(string name, decimal price)
    {
        return new Product
        {
            Id = Guid.NewGuid(),
            Name = name,
            Price = price
        };
    }
}
```

## Pratikte Uygulama

Her katman ayrı bir proje olarak oluşturulur ve bağımlılıklar her zaman içten dışa doğru akar.

> Bu yaklaşım, özellikle büyüyen projelerde bakım maliyetini ciddi ölçüde düşürür.

Gelecek yazıda **CQRS ve MediatR** entegrasyonunu ele alacağız.
