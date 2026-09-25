<script setup lang="ts">
const items = [
  'C#', '.NET', 'ASP.NET Core', 'Vue.js', 'Nuxt', 'TypeScript', 'PostgreSQL',
  'SQL Server', 'Flutter', 'Docker', 'REST APIs', 'LLM & AI', 'Tailwind CSS', 'Automation',
]
</script>

<template>
  <div class="group relative border-y bg-card/40 backdrop-blur-sm py-5 overflow-hidden mask-fade-x">
    <div class="flex w-max animate-marquee">
      <ul
        v-for="copy in 2"
        :key="copy"
        class="flex shrink-0 items-center"
        :aria-hidden="copy === 2"
      >
        <li
          v-for="item in items"
          :key="item"
          class="flex items-center gap-8 pr-8 text-base sm:text-lg font-medium text-muted-foreground whitespace-nowrap transition-colors hover:text-foreground"
        >
          {{ item }}
          <Icon name="lucide:sparkle" :size="14" class="text-primary/50" />
        </li>
      </ul>
    </div>
  </div>
</template>
