<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header class="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-20">
    <div class="absolute inset-0 -z-10 pointer-events-none">
      <div class="absolute inset-0 grid-lines" />
      <div class="absolute -top-40 left-1/4 w-[520px] h-[520px] bg-primary/25 rounded-full blur-[140px] animate-glow-1" />
      <div class="absolute -top-20 right-1/5 w-[420px] h-[420px] bg-highlight/20 rounded-full blur-[140px] animate-glow-2" />
    </div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p
        class="animate-enter inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary mb-5"
      >
        <span class="h-px w-8 bg-brand-gradient" />
        {{ eyebrow }}
        <span class="h-px w-8 bg-brand-gradient" />
      </p>
      <h1
        class="animate-enter text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance max-w-3xl mx-auto"
        style="--d: 100ms"
      >
        <slot>{{ title }}</slot>
      </h1>
      <p
        v-if="subtitle"
        class="animate-enter mt-5 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty"
        style="--d: 200ms"
      >
        {{ subtitle }}
      </p>
    </div>
  </header>
</template>
