<script setup lang="ts">
import { formatDate } from '~/lib/utils'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`blog-${locale.value}-${slug}`, () =>
  queryCollection('content')
    .where('path', '=', `/${locale.value}/blog/${slug}`)
    .first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useHead({
  title: post.value?.title,
  meta: [
    { name: 'description', content: post.value?.description },
  ],
})
</script>

<template>
  <div>
    <header class="relative overflow-hidden pt-32 pb-12 lg:pt-40 lg:pb-16">
      <div class="absolute inset-0 -z-10 pointer-events-none">
        <div class="absolute inset-0 grid-lines" />
        <div class="absolute -top-40 left-1/3 w-[520px] h-[520px] bg-primary/20 rounded-full blur-[140px] animate-glow-1" />
        <div class="absolute -top-20 right-1/4 w-[380px] h-[380px] bg-highlight/15 rounded-full blur-[140px] animate-glow-2" />
      </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
          <NuxtLink
            :to="localePath('/blog')"
            class="animate-enter group inline-flex items-center gap-1.5 rounded-full border glass px-3.5 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <Icon name="lucide:arrow-left" :size="15" class="transition-transform duration-300 group-hover:-translate-x-0.5" />
            {{ t('blog.backToList') }}
          </NuxtLink>

          <div
            class="animate-enter flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-wider text-muted-foreground mb-5"
            style="--d: 80ms"
          >
            <span v-if="post?.author" class="inline-flex items-center gap-2 normal-case tracking-normal text-sm font-sans font-medium text-foreground">
              <span class="grid place-items-center w-7 h-7 rounded-full bg-brand-gradient text-white text-xs font-semibold">
                {{ post.author.charAt(0) }}
              </span>
              {{ post.author }}
            </span>
            <span v-if="post?.author">·</span>
            <time :datetime="post?.date">{{ formatDate(post?.date, locale) }}</time>
            <span v-if="post?.readTime">·</span>
            <span v-if="post?.readTime" class="inline-flex items-center gap-1">
              <Icon name="lucide:clock" :size="12" />
              {{ post.readTime }}
            </span>
          </div>

          <h1
            class="animate-enter text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance leading-[1.05] mb-6"
            style="--d: 160ms"
          >
            {{ post?.title }}
          </h1>
          <p class="animate-enter text-xl text-muted-foreground text-pretty" style="--d: 240ms">
            {{ post?.description }}
          </p>
          <div v-if="post?.tags?.length" class="animate-enter flex flex-wrap gap-2 mt-6" style="--d: 320ms">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="font-mono text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-32">
      <div class="max-w-3xl mx-auto">
        <div class="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />

        <article
          class="animate-enter prose prose-lg prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:rounded-xl prose-pre:border prose-img:rounded-xl"
          style="--d: 400ms"
        >
          <ContentRenderer v-if="post" :value="post" />
        </article>

        <div class="mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <NuxtLink
            :to="localePath('/blog')"
            class="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="lucide:arrow-left" :size="15" class="transition-transform duration-300 group-hover:-translate-x-0.5" />
            {{ t('blog.backToList') }}
          </NuxtLink>
          <a
            :href="`${localePath('/')}#contact`"
            class="btn-shine group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium shadow-soft transition-transform duration-300 hover:scale-[1.03]"
          >
            {{ t('hero.cta') }}
            <Icon name="lucide:arrow-right" :size="15" class="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
