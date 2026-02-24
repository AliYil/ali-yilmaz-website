<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const colorMode = useColorMode()

const isMenuOpen = ref(false)
const isScrolled = ref(false)

function normalizePath(path: string) {
  if (path !== '/' && path.endsWith('/')) return path.slice(0, -1)
  return path
}

const homePath = computed(() => normalizePath(localePath('/')))
const currentPath = computed(() => normalizePath(route.path))

function sectionHref(id: string) {
  return currentPath.value === homePath.value ? `#${id}` : `${homePath.value}#${id}`
}

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const navItems = computed(() => [
  { key: 'home', href: sectionHref('hero') },
  { key: 'about', href: sectionHref('about') },
  { key: 'services', href: sectionHref('services') },
  { key: 'portfolio', href: localePath('/projects') },
  { key: 'blog', href: localePath('/blog') },
  { key: 'contact', href: sectionHref('contact') },
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
          <ClientOnly>
            <button
              @click="toggleColorMode"
              class="p-2 text-muted-foreground hover:text-foreground transition-colors"
              :title="colorMode.value === 'dark' ? 'Light mode' : 'Dark mode'"
            >
              <Icon :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'" :size="18" />
            </button>
          </ClientOnly>
          <button
            @click="toggleLocale"
            class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border"
          >
            {{ otherLocale.toUpperCase() }}
          </button>
        </nav>

        <!-- Mobile: Theme & Language (visible directly, hamburger for nav) -->
        <div class="flex items-center gap-2 md:hidden">
          <ClientOnly>
            <button
              @click="toggleColorMode"
              class="p-2 text-foreground hover:text-primary transition-colors"
              :title="colorMode.value === 'dark' ? 'Light mode' : 'Dark mode'"
            >
              <Icon :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'" :size="18" />
            </button>
          </ClientOnly>
          <button
            @click="toggleLocale"
            class="text-xs font-medium text-foreground hover:text-primary transition-colors px-2 py-1 rounded border border-border"
          >
            {{ otherLocale.toUpperCase() }}
          </button>
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="p-2 text-foreground"
          >
            <Icon :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'" :size="20" />
          </button>
        </div>
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
      </nav>
    </div>
  </header>
</template>
