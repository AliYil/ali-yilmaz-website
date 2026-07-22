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
      class="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
    >
      <Icon name="lucide:external-link" :size="14" />
      {{ t('portfolio.viewProject') }}
    </a>
    <a
      v-if="googlePlayLink"
      :href="googlePlayLink"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium hover:bg-accent transition-colors"
    >
      <Icon name="simple-icons:googleplay" :size="14" />
      {{ t('portfolio.googlePlay') }}
    </a>
    <a
      v-if="appStoreLink"
      :href="appStoreLink"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium hover:bg-accent transition-colors"
    >
      <Icon name="simple-icons:appstore" :size="14" />
      {{ t('portfolio.appStore') }}
    </a>
  </div>
</template>
