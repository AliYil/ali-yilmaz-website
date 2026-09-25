<script setup lang="ts">
const props = withDefaults(defineProps<{
  to: number
  suffix?: string
  duration?: number
}>(), {
  suffix: '',
  duration: 1800,
})

const el = ref<HTMLElement>()
const current = ref(props.to)
let observer: IntersectionObserver | undefined
let frame = 0

function animate() {
  const start = performance.now()
  const step = (now: number) => {
    const progress = Math.min((now - start) / props.duration, 1)
    const eased = 1 - Math.pow(1 - progress, 4)
    current.value = Math.round(props.to * eased)
    if (progress < 1) frame = requestAnimationFrame(step)
  }
  frame = requestAnimationFrame(step)
}

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion || !('IntersectionObserver' in window) || !el.value) return

  current.value = 0
  observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    observer?.disconnect()
    animate()
  }, { threshold: 0.6 })
  observer.observe(el.value)
})

onUnmounted(() => {
  observer?.disconnect()
  cancelAnimationFrame(frame)
})
</script>

<template>
  <span ref="el" class="tabular-nums">{{ current }}{{ suffix }}</span>
</template>
