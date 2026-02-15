<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t bg-muted/30">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <a href="https://github.com/AliYil" target="_blank" rel="noopener" class="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="lucide:github" :size="20" class="" />
          </a>
          <a href="https://www.linkedin.com/in/aliyil/" target="_blank" rel="noopener" class="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="lucide:linkedin" :size="20" class="" />
          </a>
          <a href="https://wa.me/905345909974?text=Merhaba" target="_blank" rel="noopener" class="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="lucide:phone" :size="20" class="" />
          </a>
          <a href="mailto:ali@aliyil.com" class="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="lucide:mail" :size="20" class="" />
          </a>
        </div>
        <p class="text-sm text-muted-foreground">
          © {{ year }} Ali Yılmaz. {{ t('footer.rights') }}
        </p>
        <p class="text-sm text-muted-foreground">
          {{ t('footer.builtWith') }}
        </p>
      </div>
    </div>
  </footer>
</template>
