<script setup lang="ts">
const phone = '905345909974'
const waLink = `https://wa.me/${phone}`
</script>

<template>
  <a
    :href="waLink"
    target="_blank"
    rel="noopener noreferrer"
    class="wa-float"
    aria-label="Contact on WhatsApp"
  >
    <WhatsAppIcon class="w-8 h-8" />
  </a>
</template>

<style scoped>
.wa-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  background-color: var(--muted);
  color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.wa-float:hover {
  transform: scale(1.1);
  background-color: var(--accent);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

</style>
