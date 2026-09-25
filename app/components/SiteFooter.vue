<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const socials = [
  { label: 'GitHub', icon: 'lucide:github', href: 'https://github.com/AliYil' },
  { label: 'LinkedIn', icon: 'lucide:linkedin', href: 'https://www.linkedin.com/in/aliyil/' },
  { label: 'Instagram', icon: 'lucide:instagram', href: 'https://www.instagram.com/aliyil' },
  { label: 'WhatsApp', icon: 'lucide:phone', href: 'https://wa.me/905345909974' },
]

const links = computed(() => [
  { key: 'about', href: `${localePath('/')}#about` },
  { key: 'services', href: `${localePath('/')}#services` },
  { key: 'portfolio', href: localePath('/projects') },
  { key: 'blog', href: localePath('/blog') },
  { key: 'contact', href: `${localePath('/')}#contact` },
])
</script>

<template>
  <footer class="relative overflow-hidden border-t bg-card/50 backdrop-blur-sm">
    <div class="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />

    <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      <div class="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div class="flex items-center gap-2.5 mb-4">
            <span class="grid place-items-center w-9 h-9 rounded-xl bg-brand-gradient text-white text-sm font-bold">AY</span>
            <span class="font-semibold tracking-tight">Ali Yılmaz</span>
          </div>
          <p class="text-sm text-muted-foreground max-w-xs leading-relaxed">
            {{ t('hero.title') }}
          </p>
          <a
            href="mailto:ali@aliyil.com"
            class="group mt-5 inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
          >
            ali@aliyil.com
            <Icon name="lucide:arrow-up-right" :size="15" class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <nav class="grid content-start gap-2.5">
          <a
            v-for="link in links"
            :key="link.key"
            :href="link.href"
            class="w-fit text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {{ t(`nav.${link.key}`) }}
          </a>
        </nav>

        <div class="flex md:justify-end items-start gap-2">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="social.label"
            class="grid place-items-center w-10 h-10 rounded-full border bg-background text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary hover:border-primary/50"
          >
            <Icon :name="social.icon" :size="17" />
          </a>
        </div>
      </div>

      <p
        v-reveal
        aria-hidden="true"
        class="select-none mt-14 text-center font-semibold tracking-tighter leading-none text-[18vw] lg:text-[12rem] bg-gradient-to-b from-foreground/15 to-transparent bg-clip-text text-transparent"
      >
        aliyil
      </p>

      <div class="mt-2 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <p>© {{ new Date().getFullYear() }} Ali Yılmaz. {{ t('footer.rights') }}</p>
        <p>{{ t('footer.builtWith') }}</p>
      </div>
    </div>
  </footer>
</template>
