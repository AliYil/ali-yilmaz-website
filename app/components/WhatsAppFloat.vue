<script setup lang="ts">
const phone = '905345909974'
const waLink = `https://wa.me/${phone}`
</script>

<template>
  <a
    :href="waLink"
    target="_blank"
    rel="noopener noreferrer"
    class="group fixed bottom-6 right-6 z-[90] grid place-items-center w-14 h-14 rounded-full border glass text-foreground shadow-lift animate-enter transition-transform duration-500 ease-out-expo hover:scale-110"
    style="--d: 1200ms"
    aria-label="Contact on WhatsApp"
  >
    <span class="absolute inset-0 rounded-full border-2 border-[#25D366]/50 animate-ping-soft" />
    <WhatsAppIcon class="w-7 h-7 transition-colors duration-300 group-hover:text-[#25D366]" />
  </a>
</template>
