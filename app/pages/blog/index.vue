<script setup lang="ts">
const { t, locale } = useI18n()

const { data: posts } = await useAsyncData(`blog-list-${locale.value}`, () =>
  queryCollection('content')
    .where('path', 'LIKE', `/${locale.value}/blog/%`)
    .order('date', 'DESC')
    .all()
)

useHead({
  title: () => `${t('blog.title')} · Ali Yılmaz`,
})
</script>

<template>
  <div>
    <PageHeader
      :eyebrow="t('blog.title')"
      :title="t('blog.subtitle')"
    />

    <section class="pb-24 lg:pb-32">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div
            v-for="(post, i) in posts"
            :key="post.path"
            v-reveal="(i % 3) * 120"
          >
            <BlogCard :post="post" />
          </div>
        </div>
        <p
          v-if="!posts?.length"
          class="text-center text-muted-foreground"
        >
          {{ t('blog.comingSoon') }}
        </p>
      </div>
    </section>
  </div>
</template>
