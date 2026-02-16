<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

const { data: posts } = await useAsyncData(`blog-list-${locale.value}`, () =>
  queryCollection('content')
    .where('path', 'LIKE', `/${locale.value}/blog/%`)
    .order('date', 'DESC')
    .all()
)
</script>

<template>
  <div class="py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-3">{{ t('blog.title') }}</h1>
        <p class="text-muted-foreground text-lg">{{ t('blog.subtitle') }}</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <article
          v-for="post in posts"
          :key="post.path"
          class="group rounded-xl border bg-card overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <NuxtLink :to="localePath(`/blog/${post.stem?.split('/').pop()}`)">
            <div class="aspect-[2/1] bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
              <Icon :name="post.icon || 'lucide:file-text'" :size="40" class="text-primary/40" />
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <span v-if="post.author" class="font-medium text-foreground">{{ post.author }}</span>
                <span v-if="post.author">·</span>
                <time>{{ post.date }}</time>
                <span>·</span>
                <span>{{ post.readTime }}</span>
              </div>
              <h2 class="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {{ post.title }}
              </h2>
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
        </article>
      </div>
    </div>
  </div>
</template>
