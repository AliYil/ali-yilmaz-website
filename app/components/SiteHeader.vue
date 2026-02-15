<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
const colorMode = useColorMode()

const isMenuOpen = ref(false)
const isScrolled = ref(false)

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const navItems = computed(() => [
  { key: 'home', href: `${localePath('/')}#hero` },
  { key: 'about', href: `${localePath('/')}#about` },
  { key: 'services', href: `${localePath('/')}#services` },
  { key: 'portfolio', href: localePath('/projects') },
  { key: 'blog', href: localePath('/blog') },
  { key: 'contact', href: `${localePath('/')}#contact` },
])

const otherLocale = computed(() => locale.value === 'tr' ? 'en' : 'tr')

function toggleLocale() {
  setLocale(otherLocale.value)
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="(isScrolled || isMenuOpen) ? 'bg-background/80 backdrop-blur-lg border-b shadow-sm' : 'bg-transparent'"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <a :href="localePath('/')" class="text-xl font-bold text-primary">
          AY
        </a>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-6">
          <a
            v-for="item in navItems"
            :key="item.key"
            :href="item.href"
            class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {{ t(`nav.${item.key}`) }}
          </a>
          <button
            @click="toggleColorMode"
            class="p-2 text-muted-foreground hover:text-foreground transition-colors"
            :title="colorMode.value === 'dark' ? 'Light mode' : 'Dark mode'"
          >
            <Icon :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'" :size="18" />
          </button>
          <button
            @click="toggleLocale"
            class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border"
          >
            {{ otherLocale.toUpperCase() }}
          </button>
        </nav>

        <!-- Mobile menu button -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden p-2 text-foreground"
        >
          <Icon :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'" :size="20" class="" />
        </button>
      </div>

      <!-- Mobile Nav -->
      <nav
        v-if="isMenuOpen"
        class="md:hidden pb-4 flex flex-col gap-3"
      >
        <a
          v-for="item in navItems"
          :key="item.key"
          :href="item.href"
          class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          @click="isMenuOpen = false"
        >
          {{ t(`nav.${item.key}`) }}
        </a>
        <button
          @click="toggleColorMode"
          class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left flex items-center gap-2"
        >
          <Icon :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'" :size="16" />
          {{ colorMode.value === 'dark' ? 'Light' : 'Dark' }}
        </button>
        <button
          @click="toggleLocale"
          class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
        >
          🌐 {{ otherLocale.toUpperCase() }}
        </button>
      </nav>
    </div>
  </header>
</template>
