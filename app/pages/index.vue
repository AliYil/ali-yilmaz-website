<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

const services = computed(() => [
  { key: 'webApps', icon: 'lucide:globe' },
  { key: 'api', icon: 'lucide:link' },
  { key: 'saas', icon: 'lucide:shopping-cart' },
  { key: 'consulting', icon: 'lucide:brain' },
])

const { data: projects } = await useAsyncData(`projects-home-${locale.value}`, () =>
  queryCollection('projects')
    .where('stem', 'LIKE', `${locale.value}/projects/%`)
    .order('order', 'ASC')
    .limit(3)
    .all()
)

const { data: blogPosts } = await useAsyncData(`blog-home-${locale.value}`, () =>
  queryCollection('content')
    .where('path', 'LIKE', `/${locale.value}/blog/%`)
    .order('date', 'DESC')
    .limit(3)
    .all()
)

// Lightbox state
const lightboxOpen = ref(false)
const lightboxImages = ref<string[]>([])
const lightboxIndex = ref(0)

function openLightbox(images: string[], index: number) {
  lightboxImages.value = images
  lightboxIndex.value = index
  lightboxOpen.value = true
}
function closeLightbox() { lightboxOpen.value = false }
function lightboxPrev() { lightboxIndex.value = (lightboxIndex.value - 1 + lightboxImages.value.length) % lightboxImages.value.length }
function lightboxNext() { lightboxIndex.value = (lightboxIndex.value + 1) % lightboxImages.value.length }

onMounted(() => {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (!lightboxOpen.value) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') lightboxPrev()
    if (e.key === 'ArrowRight') lightboxNext()
  })
})

const skills = [
  { name: 'C# / .NET', level: 95 },
  { name: 'ASP.NET Core', level: 95 },
  { name: 'Vue / Nuxt', level: 85 },
  { name: 'TypeScript', level: 85 },
  { name: 'PostgreSQL / SQL Server', level: 90 },
  { name: 'AI Integration', level: 80 },
  { name: 'Docker / DevOps', level: 75 },
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 -z-10 overflow-hidden">
        <div class="absolute top-1/4 left-1/5 w-[700px] h-[700px] bg-primary/30 rounded-full blur-[180px] animate-glow-1" />
        <div class="absolute bottom-1/5 right-1/5 w-[800px] h-[800px] bg-accent/35 rounded-full blur-[200px] animate-glow-2" />
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[160px] animate-glow-3" />
      </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row items-center gap-12">
          <!-- Text -->
          <div class="flex-1 text-center lg:text-left">
            <p class="text-lg text-muted-foreground mb-2">{{ t('hero.greeting') }}</p>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              {{ t('hero.name') }}
            </h1>
            <p class="text-xl sm:text-2xl text-primary font-semibold mb-6">
              {{ t('hero.title') }}
            </p>
            <p class="text-lg text-muted-foreground max-w-xl mb-8">
              {{ t('hero.description') }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                class="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {{ t('hero.cta') }}
              </a>
              <a
                href="#portfolio"
                class="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
              >
                {{ t('hero.portfolio') }}
              </a>
            </div>
          </div>

          <!-- Avatar placeholder -->
          <div class="flex-shrink-0">
            <div class="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/40 flex items-center justify-center border-4 border-primary/20">
              <img
                src="/images/avatar.jpg"
                alt="Ali Yılmaz"
                class="w-56 h-56 lg:w-72 lg:h-72 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-gray-400/10 dark:bg-muted/20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-3">{{ t('about.title') }}</h2>
          <p class="text-muted-foreground text-lg">{{ t('about.subtitle') }}</p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p class="text-lg text-muted-foreground leading-relaxed mb-8">
              {{ t('about.bio') }}
            </p>

            <div class="grid grid-cols-2 gap-4 mb-8">
              <div class="text-center p-4 rounded-lg bg-card border">
                <p class="text-2xl font-bold text-primary">10+</p>
                <p class="text-sm text-muted-foreground">{{ t('about.experience') }}</p>
              </div>
              <div class="text-center p-4 rounded-lg bg-card border">
                <p class="text-2xl font-bold text-primary">15+</p>
                <p class="text-sm text-muted-foreground">{{ t('about.projects') }}</p>
              </div>
            </div>

            <a
              href="/Ali_Abdullah_Yılmaz_CV_EN.pdf"
              target="_blank"
              class="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Icon name="lucide:file-text" :size="16" class="" />
              {{ t('about.seeCv') }}
            </a>
          </div>

          <!-- Skills -->
          <div class="space-y-4">
            <div v-for="skill in skills" :key="skill.name" class="space-y-1.5">
              <div class="flex justify-between text-sm">
                <span class="font-medium">{{ skill.name }}</span>
                <span class="text-muted-foreground">{{ skill.level }}%</span>
              </div>
              <div class="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  class="h-full rounded-full bg-primary transition-all duration-1000"
                  :style="{ width: skill.level + '%' }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-3">{{ t('services.title') }}</h2>
          <p class="text-muted-foreground text-lg">{{ t('services.subtitle') }}</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="service in services"
            :key="service.key"
            class="group p-6 rounded-xl border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
          >
            <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Icon :name="service.icon" :size="24" class=" text-primary" />
            </div>
            <h3 class="font-semibold mb-2">{{ t(`services.${service.key}.title`) }}</h3>
            <p class="text-sm text-muted-foreground">{{ t(`services.${service.key}.description`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Section -->
    <section id="portfolio" class="py-20 bg-gray-400/10 dark:bg-muted/20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-3">{{ t('portfolio.title') }}</h2>
          <p class="text-muted-foreground text-lg">{{ t('portfolio.subtitle') }}</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="project in projects"
            :key="project.id"
            class="group rounded-xl border bg-card overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <!-- Clickable image thumbnail -->
            <div v-if="project.images?.length" class="relative aspect-video bg-gradient-to-br from-primary/10 to-accent/20 overflow-hidden cursor-pointer" @click="openLightbox(project.images, 0)">
              <img :src="project.images[0]" :alt="project.title" class="w-full h-full object-cover" />
              <div v-if="project.images.length > 1" class="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <Icon name="lucide:images" :size="12" />
                {{ project.images.length }}
              </div>
            </div>
            <div v-else class="aspect-video bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
              <Icon name="lucide:image" :size="40" class="text-primary/30" />
            </div>

            <div class="p-6 cursor-default">
              <h3 class="font-semibold text-lg mb-2">{{ project.title }}</h3>
              <p class="text-sm text-muted-foreground mb-4">
                {{ project.description }}
              </p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium"
                >
                  {{ tech }}
                </span>
              </div>
              <a
                v-if="project.link"
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
              >
                <Icon name="lucide:external-link" :size="14" />
                {{ t('portfolio.viewProject') }}
              </a>
            </div>
          </div>
        </div>

        <div class="text-center mt-10">
          <NuxtLink
            :to="localePath('/projects')"
            class="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            {{ t('portfolio.viewAll') }}
            <Icon name="lucide:arrow-right" :size="16" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Blog Section -->
    <section id="blog" class="py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-3">{{ t('blog.title') }}</h2>
          <p class="text-muted-foreground text-lg">{{ t('blog.subtitle') }}</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="post in blogPosts"
            :key="post.path"
            :to="localePath(`/blog/${post.stem?.split('/').pop()}`)"
            class="group rounded-xl border bg-card overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div class="aspect-[2/1] bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
              <Icon :name="post.icon || 'lucide:file-text'" :size="40" class="text-primary/40" />
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <time>{{ post.date }}</time>
                <span>·</span>
                <span>{{ post.readTime }}</span>
              </div>
              <h3 class="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {{ post.title }}
              </h3>
              <p class="text-sm text-muted-foreground line-clamp-3">
                {{ post.description }}
              </p>
              <div class="flex flex-wrap gap-2 mt-4">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="text-center mt-10">
          <NuxtLink
            :to="localePath('/blog')"
            class="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            {{ t('blog.viewAll') }}
            <Icon name="lucide:arrow-right" :size="16" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-gray-400/10 dark:bg-muted/20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-3">{{ t('contact.title') }}</h2>
          <p class="text-muted-foreground text-lg">{{ t('contact.subtitle') }}</p>
        </div>

        <div class="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
          <!-- Left Column: Form -->
          <div>
            <!-- Contact Info -->
            <div class="grid sm:grid-cols-2 gap-4 mb-6">
              <div class="flex items-center gap-3 p-4 rounded-lg border bg-card">
                <Icon name="lucide:mail" :size="20" class="text-primary" />
                <div>
                  <p class="text-sm text-muted-foreground">{{ t('contact.info.email') }}</p>
                  <a href="mailto:ali@aliyil.com" class="font-medium hover:text-primary transition-colors">ali@aliyil.com</a>
                </div>
              </div>
              <div class="flex items-center gap-3 p-4 rounded-lg border bg-card">
                <Icon name="lucide:map-pin" :size="20" class="text-primary" />
                <div>
                  <p class="text-sm text-muted-foreground">{{ t('contact.info.location') }}</p>
                  <p class="font-medium">{{ t('contact.info.locationValue') }}</p>
                </div>
              </div>
            </div>

            <!-- Contact Form -->
            <form action="https://formspree.io/f/xaqdopaw" method="POST" class="space-y-4">
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium mb-1.5 block">{{ t('contact.name') }}</label>
                  <input
                    type="text"
                    name="name"
                    required
                    class="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label class="text-sm font-medium mb-1.5 block">{{ t('contact.email') }}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    class="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label class="text-sm font-medium mb-1.5 block">{{ t('contact.message') }}</label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  class="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Icon name="lucide:send" :size="16" />
                {{ t('contact.send') }}
              </button>
            </form>
          </div>

          <!-- Right Column: Social Links -->
          <div class="flex flex-col gap-4">
            <h3 class="text-lg font-semibold mb-2">{{ t('contact.socials') }}</h3>
            <a
              href="https://wa.me/905345909974"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 px-5 py-4 rounded-lg border bg-card hover:border-primary/50 hover:text-primary transition-colors"
            >
              <WhatsAppIcon class="w-5 h-5" />
              <span class="font-medium">WhatsApp</span>
            </a>
            <a
              href="mailto:ali@aliyil.com"
              class="flex items-center gap-3 px-5 py-4 rounded-lg border bg-card hover:border-primary/50 hover:text-primary transition-colors"
            >
              <Icon name="lucide:mail" :size="20" />
              <span class="font-medium">ali@aliyil.com</span>
            </a>
            <a
              href="https://www.instagram.com/aliyil"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 px-5 py-4 rounded-lg border bg-card hover:border-primary/50 hover:text-primary transition-colors"
            >
              <Icon name="lucide:instagram" :size="20" />
              <span class="font-medium">Instagram</span>
            </a>
            <a
              href="https://github.com/AliYil"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 px-5 py-4 rounded-lg border bg-card hover:border-primary/50 hover:text-primary transition-colors"
            >
              <Icon name="lucide:github" :size="20" />
              <span class="font-medium">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/aliyil/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 px-5 py-4 rounded-lg border bg-card hover:border-primary/50 hover:text-primary transition-colors"
            >
              <Icon name="lucide:linkedin" :size="20" />
              <span class="font-medium">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="lightboxOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90" @click.self="closeLightbox">
          <button class="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10" @click="closeLightbox">
            <Icon name="lucide:x" :size="28" />
          </button>
          <div v-if="lightboxImages.length > 1" class="absolute top-4 left-4 text-white/70 text-sm z-10">
            {{ lightboxIndex + 1 }} / {{ lightboxImages.length }}
          </div>
          <button v-if="lightboxImages.length > 1" class="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2" @click="lightboxPrev">
            <Icon name="lucide:chevron-left" :size="36" />
          </button>
          <img :src="lightboxImages[lightboxIndex]" :alt="`Image ${lightboxIndex + 1}`" class="max-w-[90vw] max-h-[85vh] object-contain rounded-lg" />
          <button v-if="lightboxImages.length > 1" class="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2" @click="lightboxNext">
            <Icon name="lucide:chevron-right" :size="36" />
          </button>
          <div v-if="lightboxImages.length > 1" class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            <button v-for="(_, i) in lightboxImages" :key="i" class="w-2.5 h-2.5 rounded-full transition-colors" :class="i === lightboxIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'" @click="lightboxIndex = i" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
