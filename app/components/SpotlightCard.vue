<script setup lang="ts">
function onPointerMove(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  el.style.setProperty('--spot', '1')
}

function onPointerLeave(e: PointerEvent) {
  (e.currentTarget as HTMLElement).style.setProperty('--spot', '0')
}
</script>

<template>
  <div
    class="spotlight rounded-2xl border bg-card shadow-soft transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <slot />
  </div>
</template>
