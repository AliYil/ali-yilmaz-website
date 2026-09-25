<template>
  <div class="min-h-screen flex flex-col overflow-x-clip">
    <SiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
  <WhatsAppFloat />
</template>
