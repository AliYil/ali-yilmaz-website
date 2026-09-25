<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content'
import { formatDate } from '~/lib/utils'

const props = defineProps<{
  post: ContentCollectionItem
}>()

const { t, locale } = useI18n()
const localePath = useLocalePath()

const href = computed(() => localePath(`/blog/${props.post.stem?.split('/').pop()}`))
</script>

<template>
  <SpotlightCard class="group h-full overflow-hidden">
    <NuxtLink :to="href" class="flex h-full flex-col">
      <div class="relative aspect-[2/1] overflow-hidden bg-gradient-to-br from-primary/10 via-accent/40 to-highlight/15">
        <div class="absolute inset-0 grid-lines opacity-70" />
        <div class="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-highlight/25 blur-3xl transition-transform duration-700 ease-out-expo group-hover:-translate-x-10 group-hover:translate-y-6" />
        <div class="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-primary/25 blur-3xl transition-transform duration-700 ease-out-expo group-hover:translate-x-10 group-hover:-translate-y-6" />
        <div class="absolute inset-0 grid place-items-center">
          <div class="grid place-items-center w-16 h-16 rounded-2xl glass border shadow-soft transition-transform duration-700 ease-out-expo group-hover:scale-110 group-hover:-rotate-6">
            <Icon :name="post.icon || 'lucide:file-text'" :size="28" class="text-primary" />
          </div>
        </div>
      </div>
      <div class="flex flex-1 flex-col p-6">
        <div class="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
          <time :datetime="post.date">{{ formatDate(post.date, locale) }}</time>
          <span v-if="post.readTime">·</span>
          <span v-if="post.readTime">{{ post.readTime }}</span>
          <span v-if="post.author">·</span>
          <span v-if="post.author" class="normal-case tracking-normal text-foreground/80">{{ post.author }}</span>
        </div>
        <h3 class="font-semibold text-lg leading-snug mb-2 transition-colors group-hover:text-primary">
          {{ post.title }}
        </h3>
        <p class="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {{ post.description }}
        </p>
        <div class="mt-auto pt-5 flex items-center justify-between gap-4">
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="font-mono text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
            >
              #{{ tag }}
            </span>
          </div>
          <span class="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary">
            {{ t('blog.readMore') }}
            <Icon name="lucide:arrow-right" :size="15" class="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </NuxtLink>
  </SpotlightCard>
</template>
