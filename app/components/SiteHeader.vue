<script setup lang="ts">
const { t, locale, setLocale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const colorMode = useColorMode()

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const scrollProgress = ref(0)
const activeSection = ref('hero')

function normalizePath(path: string) {
  if (path !== '/' && path.endsWith('/')) return path.slice(0, -1)
  return path
}

const homePath = computed(() => normalizePath(localePath('/')))
const currentPath = computed(() => normalizePath(route.path))
const isHome = computed(() => currentPath.value === homePath.value)

function sectionHref(id: string) {
  return isHome.value ? `#${id}` : `${homePath.value}#${id}`
}

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const navItems = computed(() => [
  { key: 'home', section: 'hero', href: sectionHref('hero') },
  { key: 'about', section: 'about', href: sectionHref('about') },
  { key: 'services', section: 'services', href: sectionHref('services') },
  { key: 'portfolio', section: 'portfolio', href: localePath('/projects'), page: localePath('/projects') },
  { key: 'blog', section: 'blog', href: localePath('/blog'), page: localePath('/blog') },
])

type NavItem = (typeof navItems.value)[number]

function isActive(item: NavItem) {
  if (isHome.value) return activeSection.value === item.section
  return !!item.page && currentPath.value.startsWith(item.page)
}

const otherLocale = computed(() => locale.value === 'tr' ? 'en' : 'tr')

function toggleLocale() {
  setLocale(otherLocale.value)
}

const sectionIds = ['hero', 'about', 'services', 'portfolio', 'blog', 'contact']
let ticking = false

function updateScrollState() {
  ticking = false
  const scrollTop = window.scrollY
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  isScrolled.value = scrollTop > 40
  scrollProgress.value = maxScroll > 0 ? scrollTop / maxScroll : 0

  if (!isHome.value) return
  const probe = window.innerHeight * 0.4
  for (const id of sectionIds) {
    const top = document.getElementById(id)?.getBoundingClientRect().top
    if (top !== undefined && top <= probe) activeSection.value = id
  }
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(updateScrollState)
}

watch(() => route.fullPath, () => {
  isMenuOpen.value = false
})

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50">
    <div
      class="absolute inset-x-0 top-0 h-0.5 origin-left bg-brand-gradient"
      :style="{ transform: `scaleX(${scrollProgress})` }"
    />

    <div
      class="mx-auto transition-all duration-500 ease-out-expo"
      :class="(isScrolled || isMenuOpen) ? 'max-w-5xl px-3 pt-3' : 'max-w-7xl px-0 pt-0'"
    >
      <div
        class="border transition-all duration-500 ease-out-expo"
        :class="(isScrolled || isMenuOpen)
          ? 'glass bg-background/80! rounded-3xl shadow-soft px-3 sm:px-4'
          : 'border-transparent rounded-none px-4 sm:px-6 lg:px-8'"
      >
        <div
          class="flex items-center justify-between transition-[height] duration-500 ease-out-expo"
          :class="isScrolled ? 'h-14' : 'h-18'"
        >
          <NuxtLink :to="localePath('/')" class="group flex items-center gap-2.5" aria-label="Ali Yılmaz">
            <span class="grid place-items-center w-9 h-9 rounded-xl bg-brand-gradient text-white text-sm font-bold tracking-tight shadow-soft transition-transform duration-500 ease-out-expo group-hover:rotate-[-8deg] group-hover:scale-105">
              AY
            </span>
            <span class="hidden sm:block font-semibold tracking-tight">Ali Yılmaz</span>
          </NuxtLink>

          <nav class="hidden md:flex items-center gap-1">
            <a
              v-for="item in navItems"
              :key="item.key"
              :href="item.href"
              class="relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300"
              :class="isActive(item) ? 'text-foreground bg-muted' : 'text-muted-foreground hover:text-foreground'"
            >
              {{ t(`nav.${item.key}`) }}
            </a>
          </nav>

          <div class="flex items-center gap-1.5">
            <ClientOnly>
              <button
                class="grid place-items-center w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                :title="colorMode.value === 'dark' ? 'Light mode' : 'Dark mode'"
                :aria-label="colorMode.value === 'dark' ? 'Light mode' : 'Dark mode'"
                @click="toggleColorMode"
              >
                <Transition name="icon-swap" mode="out-in">
                  <Icon
                    :key="colorMode.value"
                    :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'"
                    :size="17"
                  />
                </Transition>
              </button>
              <template #fallback>
                <span class="w-9 h-9" />
              </template>
            </ClientOnly>
            <button
              class="h-9 px-2.5 rounded-full font-mono text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              @click="toggleLocale"
            >
              {{ otherLocale.toUpperCase() }}
            </button>
            <a
              :href="sectionHref('contact')"
              class="btn-shine hidden md:inline-flex items-center gap-1.5 ml-1 h-9 rounded-full bg-foreground text-background px-4 text-sm font-medium transition-transform hover:scale-[1.03]"
            >
              {{ t('nav.contact') }}
              <Icon name="lucide:arrow-up-right" :size="15" />
            </a>
            <button
              class="md:hidden grid place-items-center w-9 h-9 rounded-full hover:bg-muted transition-colors"
              :aria-expanded="isMenuOpen"
              aria-label="Menu"
              @click="isMenuOpen = !isMenuOpen"
            >
              <Icon :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'" :size="20" />
            </button>
          </div>
        </div>

        <Transition name="menu">
          <nav v-if="isMenuOpen" class="md:hidden pb-4 pt-1 grid gap-1">
            <a
              v-for="(item, i) in [...navItems, { key: 'contact', section: 'contact', href: sectionHref('contact') }]"
              :key="item.key"
              :href="item.href"
              class="menu-item flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
              :class="isActive(item) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'"
              :style="{ '--i': i }"
              @click="isMenuOpen = false"
            >
              {{ t(`nav.${item.key}`) }}
              <Icon name="lucide:arrow-right" :size="15" class="opacity-50" />
            </a>
          </nav>
        </Transition>
      </div>
    </div>
  </header>
</template>

<style scoped>
.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: transform 0.3s var(--ease-out-expo), opacity 0.2s ease;
}
.icon-swap-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}
.icon-swap-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.25s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
.menu-enter-active .menu-item {
  animation: enter 0.6s var(--ease-out-expo) both;
  animation-delay: calc(var(--i) * 40ms);
}
</style>
