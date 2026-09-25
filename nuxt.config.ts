import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: ['@nuxt/icon', 'shadcn-nuxt', '@nuxtjs/i18n', '@nuxt/content', '@nuxtjs/color-mode'],

  colorMode: {
    classSuffix: '',
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
        },
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },

  i18n: {
    locales: [
      { code: 'tr', language: 'tr-TR', file: 'tr.json' },
      { code: 'en', language: 'en-US', file: 'en.json' },
    ],
    defaultLocale: 'tr',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_lang',
      redirectOn: 'root',
    },
  },

  css: ['~/assets/css/tailwind.css'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Ali Yılmaz - Freelance .NET & Web Developer',
      meta: [
        { name: 'description', content: 'Ali Yılmaz - 10+ yıl deneyimli Freelance .NET ve Web Geliştirici. Kurumsal web uygulamaları, API geliştirme ve SaaS çözümleri.' },
        { name: 'author', content: 'Ali Yılmaz' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Geist:wght@300..800&family=Geist+Mono:wght@400;500&display=swap' },
      ],
      script: [
        // Enables scroll-reveal styles only when JS is available, before first paint
        { innerHTML: 'document.documentElement.classList.add(\'js\')' },
      ],
    },
  },

  nitro: {
    prerender: {
      routes: ['/', '/en', '/blog', '/en/blog', '/projects', '/en/projects'],
      crawlLinks: true,
    },
  },

  icon: {
    mode: 'svg',
    serverBundle: false,
    clientBundle: {
      scan: true,
    },
  },

  devtools: { enabled: true },
})