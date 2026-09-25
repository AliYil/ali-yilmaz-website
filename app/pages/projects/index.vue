<script setup lang="ts">
const { t, locale } = useI18n()

const projectsKey = computed(() => `projects-list-${locale.value}`)

const { data: projects } = await useAsyncData(projectsKey, () =>
  queryCollection('projects')
    .where('stem', 'LIKE', `${locale.value}/projects/%`)
    .order('order', 'ASC')
    .all()
)

useHead({
  title: () => `${t('portfolio.title')} · Ali Yılmaz`,
})
</script>

<template>
  <div>
    <PageHeader
      :eyebrow="t('portfolio.title')"
      :title="t('portfolio.subtitle')"
    />

    <section class="pb-24 lg:pb-32">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div
            v-for="(project, i) in projects"
            :key="project.id"
            v-reveal="(i % 3) * 120"
          >
            <ProjectCard :project="project" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
