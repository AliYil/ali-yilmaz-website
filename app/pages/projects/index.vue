<script setup lang="ts">
const { t, locale } = useI18n()

const { data: projects } = await useAsyncData(`projects-list-${locale.value}`, () =>
  queryCollection('projects')
    .where('stem', 'LIKE', `${locale.value}/projects/%`)
    .order('order', 'ASC')
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

function closeLightbox() {
  lightboxOpen.value = false
}

function lightboxPrev() {
  lightboxIndex.value = (lightboxIndex.value - 1 + lightboxImages.value.length) % lightboxImages.value.length
}

function lightboxNext() {
  lightboxIndex.value = (lightboxIndex.value + 1) % lightboxImages.value.length
}

function onLightboxKeydown(e: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') lightboxPrev()
  if (e.key === 'ArrowRight') lightboxNext()
}

onMounted(() => {
  window.addEventListener('keydown', onLightboxKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onLightboxKeydown)
})
</script>

<template>
  <div class="py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-3">{{ t('portfolio.title') }}</h1>
        <p class="text-muted-foreground text-lg">{{ t('portfolio.subtitle') }}</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div
          v-for="project in projects"
          :key="project.id"
          class="group rounded-xl border bg-card overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <!-- Clickable images -->
          <div v-if="project.images?.length" class="relative aspect-video bg-gradient-to-br from-primary/10 to-accent/20 overflow-hidden cursor-pointer" @click="openLightbox(project.images, 0)">
            <img
              :src="project.images[0]"
              :alt="project.title"
              class="w-full h-full object-cover"
            />
            <!-- Image count badge -->
            <div v-if="project.images.length > 1" class="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Icon name="lucide:images" :size="12" />
              {{ project.images.length }}
            </div>
          </div>
          <div v-else class="aspect-video bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
            <Icon name="lucide:image" :size="40" class="text-primary/30" />
          </div>

          <div class="p-6">
            <h3 class="font-semibold text-lg mb-2">{{ project.title }}</h3>
            <p class="text-sm text-muted-foreground mb-4">{{ project.description }}</p>
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
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          @click.self="closeLightbox"
        >
          <!-- Close button -->
          <button
            class="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            @click="closeLightbox"
          >
            <Icon name="lucide:x" :size="28" />
          </button>

          <!-- Counter -->
          <div v-if="lightboxImages.length > 1" class="absolute top-4 left-4 text-white/70 text-sm z-10">
            {{ lightboxIndex + 1 }} / {{ lightboxImages.length }}
          </div>

          <!-- Prev button -->
          <button
            v-if="lightboxImages.length > 1"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
            @click="lightboxPrev"
          >
            <Icon name="lucide:chevron-left" :size="36" />
          </button>

          <!-- Image -->
          <img
            :src="lightboxImages[lightboxIndex]"
            :alt="`Image ${lightboxIndex + 1}`"
            class="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
          />

          <!-- Next button -->
          <button
            v-if="lightboxImages.length > 1"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
            @click="lightboxNext"
          >
            <Icon name="lucide:chevron-right" :size="36" />
          </button>

          <!-- Dots -->
          <div v-if="lightboxImages.length > 1" class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            <button
              v-for="(_, i) in lightboxImages"
              :key="i"
              class="w-2.5 h-2.5 rounded-full transition-colors"
              :class="i === lightboxIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'"
              @click="lightboxIndex = i"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
