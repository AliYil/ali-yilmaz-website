<script setup lang="ts">
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
  <div class="py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <!-- Back link -->
        <NuxtLink
          :to="localePath('/blog')"
          class="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <Icon name="lucide:arrow-left" :size="16" />
          {{ t('blog.backToList') }}
        </NuxtLink>

        <!-- Header -->
        <header class="mb-10">
          <div class="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span v-if="post?.author" class="font-medium text-foreground">{{ post.author }}</span>
            <span v-if="post?.author">·</span>
            <time>{{ post?.date }}</time>
            <span>·</span>
            <span>{{ post?.readTime }}</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-bold mb-4">{{ post?.title }}</h1>
          <p class="text-lg text-muted-foreground">{{ post?.description }}</p>
          <div class="flex flex-wrap gap-2 mt-4">
            <span
              v-for="tag in post?.tags"
              :key="tag"
              class="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium"
            >
              {{ tag }}
            </span>
          </div>
        </header>

        <!-- Content -->
        <article class="prose prose-neutral dark:prose-invert max-w-none">
          <ContentRenderer v-if="post" :value="post" />
        </article>
      </div>
    </div>
  </div>
</template>
