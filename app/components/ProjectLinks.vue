<script setup lang="ts">
defineProps<{
  link?: string
  googlePlayLink?: string
  appStoreLink?: string
}>()

const { t } = useI18n()
</script>

<template>
  <div
    v-if="link || googlePlayLink || appStoreLink"
    class="flex flex-wrap items-center gap-2"
  >
    <a
      v-if="link"
      :href="link"
      target="_blank"
      rel="noopener noreferrer"
      class="group/link inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-xs font-medium transition-colors hover:bg-primary/90"
    >
      {{ t('portfolio.viewProject') }}
      <Icon name="lucide:arrow-up-right" :size="14" class="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
    </a>
    <a
      v-if="googlePlayLink"
      :href="googlePlayLink"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-1.5 rounded-lg border bg-background px-3 py-2 text-xs font-medium transition-colors hover:border-primary/50 hover:text-primary"
    >
      <Icon name="simple-icons:googleplay" :size="14" />
      {{ t('portfolio.googlePlay') }}
    </a>
    <a
      v-if="appStoreLink"
      :href="appStoreLink"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-1.5 rounded-lg border bg-background px-3 py-2 text-xs font-medium transition-colors hover:border-primary/50 hover:text-primary"
    >
      <Icon name="simple-icons:appstore" :size="14" />
      {{ t('portfolio.appStore') }}
    </a>
  </div>
</template>
