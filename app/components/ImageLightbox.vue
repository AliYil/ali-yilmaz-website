<script setup lang="ts">
const props = defineProps<{
  images: string[]
  alt: string
}>()

const open = defineModel<boolean>('open', { default: false })
const index = ref(0)

function prev() {
  index.value = (index.value - 1 + props.images.length) % props.images.length
}

function next() {
  index.value = (index.value + 1) % props.images.length
}

function onKeydown(e: KeyboardEvent) {
  if (!open.value) return
  if (e.key === 'Escape') open.value = false
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

watch(open, (isOpen) => {
  if (isOpen) index.value = 0
  document.documentElement.style.overflow = isOpen ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        :aria-label="alt"
        @click.self="open = false"
      >
        <button
          class="absolute top-5 right-5 z-10 grid place-items-center w-11 h-11 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
          aria-label="Close"
          @click="open = false"
        >
          <Icon name="lucide:x" :size="22" />
        </button>

        <div
          v-if="images.length > 1"
          class="absolute top-7 left-6 z-10 font-mono text-sm text-white/70"
        >
          {{ String(index + 1).padStart(2, '0') }} / {{ String(images.length).padStart(2, '0') }}
        </div>

        <button
          v-if="images.length > 1"
          class="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 grid place-items-center w-12 h-12 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
          aria-label="Previous image"
          @click="prev"
        >
          <Icon name="lucide:chevron-left" :size="26" />
        </button>

        <div class="lightbox-stage relative grid place-items-center">
          <Transition name="lightbox-img" mode="out-in">
            <img
              :key="images[index]"
              :src="images[index]"
              :alt="`${alt} ${index + 1}`"
              class="max-w-[88vw] max-h-[82vh] object-contain rounded-xl shadow-2xl"
            />
          </Transition>
        </div>

        <button
          v-if="images.length > 1"
          class="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 grid place-items-center w-12 h-12 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
          aria-label="Next image"
          @click="next"
        >
          <Icon name="lucide:chevron-right" :size="26" />
        </button>

        <div
          v-if="images.length > 1"
          class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2"
        >
          <button
            v-for="(_, i) in images"
            :key="i"
            class="h-1.5 rounded-full transition-all duration-500 ease-out-expo"
            :class="i === index ? 'w-8 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'"
            :aria-label="`${i + 1}`"
            @click="index = i"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}
.lightbox-enter-active .lightbox-stage,
.lightbox-leave-active .lightbox-stage {
  transition: transform 0.5s var(--ease-out-expo);
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
.lightbox-enter-from .lightbox-stage,
.lightbox-leave-to .lightbox-stage {
  transform: scale(0.94);
}

.lightbox-img-enter-active,
.lightbox-img-leave-active {
  transition: opacity 0.25s ease, transform 0.35s var(--ease-out-expo);
}
.lightbox-img-enter-from {
  opacity: 0;
  transform: scale(0.97);
}
.lightbox-img-leave-to {
  opacity: 0;
}
</style>
