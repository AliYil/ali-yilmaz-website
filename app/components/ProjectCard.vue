<script setup lang="ts">
import type { ProjectsCollectionItem } from '@nuxt/content'

defineProps<{
  project: ProjectsCollectionItem
}>()

const galleryOpen = ref(false)
</script>

<template>
  <SpotlightCard class="group h-full flex flex-col overflow-hidden">
    <button
      v-if="project.images?.length"
      type="button"
      class="relative block aspect-[16/10] overflow-hidden bg-muted cursor-zoom-in"
      :aria-label="project.title"
      @click="galleryOpen = true"
    >
      <img
        :src="project.images[0]"
        :alt="project.title"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
      <span
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 rounded-full glass text-foreground scale-75 opacity-0 transition-all duration-500 ease-out-expo group-hover:scale-100 group-hover:opacity-100"
      >
        <Icon name="lucide:expand" :size="18" />
      </span>
      <span
        v-if="project.images.length > 1"
        class="absolute right-4 bottom-4 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-xs text-white backdrop-blur"
      >
        <Icon name="lucide:images" :size="12" />
        {{ project.images.length }}
      </span>
    </button>
    <div
      v-else
      class="aspect-[16/10] bg-gradient-to-br from-primary/10 to-highlight/15 grid place-items-center"
    >
      <Icon name="lucide:image" :size="40" class="text-primary/30" />
    </div>

    <div class="flex flex-1 flex-col p-6">
      <h3 class="font-semibold text-lg leading-snug mb-2 transition-colors group-hover:text-primary">
        {{ project.title }}
      </h3>
      <p class="text-sm text-muted-foreground leading-relaxed mb-5">
        {{ project.description }}
      </p>
      <div class="mt-auto flex flex-wrap gap-1.5 mb-5">
        <span
          v-for="tech in project.tech"
          :key="tech"
          class="font-mono text-[11px] px-2 py-1 rounded-md border bg-muted/60 text-muted-foreground"
        >
          {{ tech }}
        </span>
      </div>
      <ProjectLinks
        :link="project.link"
        :google-play-link="project.googlePlayLink"
        :app-store-link="project.appStoreLink"
      />
    </div>

    <ImageLightbox
      v-if="project.images?.length"
      v-model:open="galleryOpen"
      :images="project.images"
      :alt="project.title"
    />
  </SpotlightCard>
</template>
