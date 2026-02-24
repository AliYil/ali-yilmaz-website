<script setup lang="ts">
definePageMeta({ layout: false })

const contact = [
  { icon: 'lucide:phone', value: '0534 590 99 74' },
  { icon: 'lucide:globe', value: 'aliyil.com' },
  { icon: 'lucide:map-pin', value: 'İstanbul, Türkiye' },
  { icon: 'lucide:mail', value: 'ali@aliyil.com' },
]
</script>

<template>
  <div class="kartvizit-page">
    <!-- FRONT -->
    <div class="section">
      <h2>Ön Yüz</h2>
      <div class="card front">
        <div class="accent" />
        <div class="name">Ali Yılmaz</div>
        <div class="title">Yazılım & Yapay Zeka Çözümleri</div>
        <div class="services">
          <span class="tag">Web Sitesi & Uygulama</span>
          <span class="tag">Kurumsal Yazılım</span>
          <span class="tag">Online Satış & Yönetim</span>
          <span class="tag">Yapay Zeka Entegrasyonu</span>
        </div>
        <div class="website">aliyil.com</div>
      </div>
    </div>

    <!-- BACK -->
    <div class="section">
      <h2>Arka Yüz</h2>
      <div class="card back">
        <div class="stripe" />
        <div class="contact-grid">
          <div v-for="c in contact" :key="c.value" class="info-row">
            <Icon :name="c.icon" :size="14" class="icon" />
            <span>{{ c.value }}</span>
          </div>
        </div>
        <div class="bottom-tagline">10+ YILLIK DENEYİM</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kartvizit-page {
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 40px;
  padding: 300px 0 0 0;
  scale: 3;
}

.hint {
  font-size: 13px;
  color: #888;
}

h2 {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

/* ---- Card shell ---- */
.card {
  width: 340px;   /* ≈90mm at 96dpi */
  height: 189px;  /* ≈50mm at 96dpi */
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
  position: relative;
}

/* ---- FRONT ---- */
.front {
  background: 
    radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.12) 1px, transparent 1px),
    linear-gradient(135deg, #0f172a 0%, #334561 100%);
  background-size: 16px 16px, 100% 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 24px;
}

.front .accent {
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 0 0 0 80px;
  opacity: 0.7;
}

.front .name {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.front .title {
  font-size: 9px;
  font-weight: 400;
  color: #94a3b8;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.front .website {
  font-size: 9px;
  color: #60a5fa;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-align: right;
}

.front .services {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 16px 0;
}

.front .tag {
  font-size: 6.5px;
  background: rgba(59, 130, 246, 0.15);
  color: #93c5fd;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 500;
  letter-spacing: 0.2px;
  white-space: nowrap;
  flex: 0 0 calc(50% - 2px);
  text-align: center;
}

/* ---- BACK ---- */
.back {
  background: 
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 8px,
      rgba(59, 130, 246, 0.06) 8px,
      rgba(59, 130, 246, 0.06) 9px
    ),
    #ffffff;
  color: #1e293b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 42px;
}

.back .stripe {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #3b82f6, #8b5cf6);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 16px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: #475569;
}

.info-row :deep(.icon) {
  color: #3b82f6;
  flex-shrink: 0;
}

.bottom-tagline {
  position: absolute;
  bottom: 8px;
  right: 16px;
  font-size: 7px;
  color: #94a3b8;
  letter-spacing: 1px;
}

/* ---- Print ---- */
@media print {
  .kartvizit-page {
    background: #fff;
    gap: 20px;
    padding: 10mm;
  }
  .card {
    box-shadow: none;
    border: 0.5px solid #ddd;
  }
  h2, .hint {
    display: none;
  }
}
</style>
