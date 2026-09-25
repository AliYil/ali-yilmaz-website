<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
}>()
</script>

<template>
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
    <div v-reveal class="max-w-2xl">
      <p class="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
        <span class="h-px w-8 bg-brand-gradient" />
        {{ eyebrow }}
      </p>
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
        {{ title }}
      </h2>
    </div>
    <div v-if="$slots.default" v-reveal="150" class="shrink-0">
      <slot />
    </div>
  </div>
</template>
