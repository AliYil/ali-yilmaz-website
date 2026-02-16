# aliyil.com — Personal Website

Personal portfolio and blog for **Ali Yılmaz**, a freelance .NET & web developer with 10+ years of experience.

🔗 [aliyil.com](https://aliyil.com)

## Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com) (Vue 3)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com) + [shadcn-vue](https://www.shadcn-vue.com/)
- **Content:** [@nuxt/content](https://content.nuxt.com) — blog posts (Markdown) & projects (YAML)
- **i18n:** Turkish (default) + English via `@nuxtjs/i18n`
- **Icons:** @nuxt/icon with Lucide icon set
- **Dark mode:** @nuxtjs/color-mode

## Features

- 📝 **Blog** — Markdown-based posts with syntax highlighting
- 💼 **Projects** — Portfolio with multiple images, lightbox modal, and optional links
- 🌍 **Bilingual** — Full Turkish/English support (`prefix_except_default` strategy)
- 🌙 **Dark mode** — System-aware with manual toggle
- 💬 **WhatsApp float** — Quick contact button
- 📱 **Responsive** — Mobile-first design

## Project Structure

```
app/
  pages/           # index, blog/, projects/, kartvizit
  components/      # SiteHeader, SiteFooter, WhatsAppFloat
  layouts/         # default
content/
  tr/              # Turkish content
    blog/          # .md blog posts
    projects/      # .yaml project entries
  en/              # English content (same structure)
public/            # Static assets, favicon
i18n/              # tr.json, en.json locale files
```

## Setup

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production

```bash
npm run generate   # Static site generation
npm run preview    # Preview the generated site
```

## License

All rights reserved.
