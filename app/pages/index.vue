<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

const services = [
  { key: 'webApps', icon: 'lucide:globe', span: 'lg:col-span-2' },
  { key: 'api', icon: 'lucide:server', span: '' },
  { key: 'saas', icon: 'lucide:store', span: '' },
  { key: 'consulting', icon: 'lucide:sparkles', span: 'lg:col-span-2' },
]

const skills = [
  { name: 'C# / .NET', level: 95 },
  { name: 'ASP.NET Core', level: 95 },
  { name: 'PostgreSQL / SQL Server', level: 90 },
  { name: 'Vue / Nuxt', level: 85 },
  { name: 'TypeScript', level: 85 },
  { name: 'AI Integration', level: 80 },
  { name: 'Docker / DevOps', level: 75 },
]

const socials = [
  { label: 'Instagram', icon: 'lucide:instagram', href: 'https://www.instagram.com/aliyil' },
  { label: 'GitHub', icon: 'lucide:github', href: 'https://github.com/AliYil' },
  { label: 'LinkedIn', icon: 'lucide:linkedin', href: 'https://www.linkedin.com/in/aliyil/' },
]

const nameWords = computed(() => t('hero.name').split(' '))
const cvHref = computed(() => `/Ali_Abdullah_Yılmaz_CV_${locale.value === 'tr' ? 'TR' : 'EN'}.pdf`)

const projectsKey = computed(() => `projects-home-${locale.value}`)

const { data: projects } = await useAsyncData(projectsKey, () =>
  queryCollection('projects')
    .where('stem', 'LIKE', `${locale.value}/projects/%`)
    .order('order', 'ASC')
    .limit(3)
    .all()
)

const { data: blogPosts } = await useAsyncData(`blog-home-${locale.value}`, () =>
  queryCollection('content')
    .where('path', 'LIKE', `/${locale.value}/blog/%`)
    .order('date', 'DESC')
    .limit(3)
    .all()
)

function onHeroPointerMove(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  el.style.setProperty('--hx', `${x}px`)
  el.style.setProperty('--hy', `${y}px`)
  el.style.setProperty('--px', `${(x / rect.width - 0.5) * 2}`)
  el.style.setProperty('--py', `${(y / rect.height - 0.5) * 2}`)
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section
      id="hero"
      class="hero relative min-h-[100svh] flex items-center overflow-hidden"
      @pointermove="onHeroPointerMove"
    >
      <div class="absolute inset-0 -z-10 pointer-events-none">
        <div class="absolute inset-0 grid-lines" />
        <div class="absolute top-1/4 left-1/5 w-[700px] h-[700px] bg-primary/30 rounded-full blur-[180px] animate-glow-1" />
        <div class="absolute bottom-1/5 right-1/5 w-[700px] h-[700px] bg-highlight/25 rounded-full blur-[200px] animate-glow-2" />
        <div class="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[160px] animate-glow-3" />
        <div class="hero-spotlight absolute inset-0" />
      </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-28 lg:pt-28">
        <div class="grid lg:grid-cols-[1.2fr_1fr] items-center gap-16 lg:gap-10">
          <div class="text-center lg:text-left">
            <div class="animate-enter inline-flex items-center gap-2.5 rounded-full border glass px-3.5 py-1.5 text-xs font-medium shadow-soft mb-8">
              <span class="relative flex w-2 h-2">
                <span class="absolute inset-0 rounded-full bg-emerald-500 animate-ping-soft" />
                <span class="relative w-2 h-2 rounded-full bg-emerald-500" />
              </span>
              {{ t('hero.available') }}
            </div>

            <p class="animate-enter font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4" style="--d: 100ms">
              {{ t('hero.greeting') }}
            </p>

            <h1 class="text-6xl sm:text-7xl xl:text-8xl font-semibold tracking-tighter leading-[0.95] mb-5">
              <span
                v-for="(word, i) in nameWords"
                :key="word"
                class="word"
              >
                <span :style="{ '--d': `${180 + i * 110}ms` }">{{ word }}</span>
              </span>
            </h1>

            <p class="animate-enter font-medium tracking-tight text-2xl sm:text-3xl lg:text-4xl mb-7" style="--d: 420ms">
              <span class="text-gradient pr-1">{{ t('hero.title') }}</span>
            </p>

            <p class="animate-enter text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10 text-pretty" style="--d: 520ms">
              {{ t('hero.description') }}
            </p>

            <div class="animate-enter flex flex-col sm:flex-row gap-3 justify-center lg:justify-start" style="--d: 620ms">
              <a
                href="#contact"
                class="btn-shine group inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium shadow-lift transition-transform duration-300 hover:scale-[1.03]"
              >
                {{ t('hero.cta') }}
                <Icon name="lucide:arrow-right" :size="16" class="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#portfolio"
                class="inline-flex items-center justify-center gap-2 rounded-full border glass px-7 py-3.5 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
              >
                {{ t('hero.portfolio') }}
              </a>
            </div>
          </div>

          <!-- Avatar composition -->
          <div class="animate-enter flex justify-center" style="--d: 300ms">
            <div class="hero-parallax relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[24rem] lg:h-[24rem]">
              <div class="absolute -inset-6 rounded-full avatar-ring blur-2xl opacity-60 animate-spin-slow" />
              <div class="absolute -inset-1.5 rounded-full avatar-ring animate-spin-slow" />
              <div class="relative w-full h-full rounded-full p-1.5 bg-background">
                <img
                  src="/images/avatar.webp"
                  alt="Ali Yılmaz"
                  class="w-full h-full rounded-full object-cover"
                  fetchpriority="high"
                />
              </div>

              <div class="chip glass -left-6 sm:-left-12 top-6 animate-float">
                <Icon name="lucide:code-xml" :size="16" class="text-primary" />
                .NET · C#
              </div>
              <div class="chip glass -right-4 sm:-right-10 top-1/2 animate-float" style="--d: 1.2s">
                <Icon name="lucide:sparkles" :size="16" class="text-highlight" />
                AI · LLM
              </div>
              <div class="chip glass left-0 sm:-left-4 -bottom-3 animate-float" style="--d: 2.4s">
                <span class="text-lg font-semibold text-gradient">10+</span>
                <span class="text-muted-foreground">{{ t('about.experience') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        class="animate-enter absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        style="--d: 1000ms"
      >
        <span class="relative w-6 h-9 rounded-full border-2 border-current">
          <span class="absolute left-1/2 top-1.5 -ml-0.5 w-1 h-2 rounded-full bg-current animate-scroll-dot" />
        </span>
        <span class="font-mono text-[10px] uppercase tracking-[0.25em]">{{ t('hero.scroll') }}</span>
      </a>
    </section>

    <TechMarquee />

    <!-- About -->
    <section id="about" class="relative py-24 lg:py-32">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading :eyebrow="t('about.title')" :title="t('about.subtitle')" />

        <div class="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
          <div>
            <p v-reveal class="text-lg sm:text-xl leading-relaxed text-muted-foreground text-pretty mb-10">
              {{ t('about.bio') }}
            </p>

            <div class="grid grid-cols-2 gap-4 mb-10">
              <div v-reveal="100">
                <SpotlightCard class="p-6">
                  <p class="text-5xl font-semibold tracking-tight text-gradient">
                    <CountUp :to="10" suffix="+" />
                  </p>
                  <p class="mt-2 text-sm text-muted-foreground">{{ t('about.experience') }}</p>
                </SpotlightCard>
              </div>
              <div v-reveal="200">
                <SpotlightCard class="p-6">
                  <p class="text-5xl font-semibold tracking-tight text-gradient">
                    <CountUp :to="15" suffix="+" />
                  </p>
                  <p class="mt-2 text-sm text-muted-foreground">{{ t('about.projects') }}</p>
                </SpotlightCard>
              </div>
            </div>

            <div v-reveal="300">
              <a
                :href="cvHref"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-shine group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium transition-transform duration-300 hover:scale-[1.03]"
              >
                <Icon name="lucide:file-text" :size="16" />
                {{ t('about.seeCv') }}
                <Icon name="lucide:arrow-up-right" :size="15" class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div v-reveal:right="150">
            <SpotlightCard class="p-7 sm:p-8">
              <p class="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                {{ t('about.stack') }}
              </p>
              <ul class="space-y-5">
                <li
                  v-for="(skill, i) in skills"
                  :key="skill.name"
                  :style="{ '--i': i, '--level': skill.level / 100 }"
                >
                  <div class="flex justify-between text-sm mb-2">
                    <span class="font-medium">{{ skill.name }}</span>
                    <span class="font-mono text-xs text-muted-foreground">{{ skill.level }}%</span>
                  </div>
                  <div class="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div class="skill-fill h-full rounded-full bg-brand-gradient" />
                  </div>
                </li>
              </ul>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section id="services" class="relative py-24 lg:py-32">
      <div class="absolute inset-x-0 top-1/3 h-96 bg-primary/5 blur-3xl -z-10" />
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading :eyebrow="t('services.title')" :title="t('services.subtitle')" />

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(service, i) in services"
            :key="service.key"
            v-reveal="i * 100"
            :class="service.span"
          >
            <SpotlightCard class="group relative h-full min-h-64 overflow-hidden p-7 lg:p-8 flex flex-col">
              <Icon
                v-if="service.span"
                :name="service.icon"
                :size="180"
                class="absolute -right-8 -bottom-10 text-primary/[0.04] transition-transform duration-700 ease-out-expo group-hover:-rotate-12 group-hover:scale-110"
              />
              <div class="flex items-start justify-between mb-10">
                <div class="grid place-items-center w-12 h-12 rounded-xl bg-brand-gradient text-white shadow-soft transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110">
                  <Icon :name="service.icon" :size="22" />
                </div>
                <span class="font-mono text-xs text-muted-foreground">0{{ i + 1 }}</span>
              </div>
              <div class="mt-auto">
                <h3 class="text-xl font-semibold tracking-tight mb-2">{{ t(`services.${service.key}.title`) }}</h3>
                <p class="text-muted-foreground leading-relaxed max-w-md">{{ t(`services.${service.key}.description`) }}</p>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio -->
    <section id="portfolio" class="relative py-24 lg:py-32">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading :eyebrow="t('portfolio.title')" :title="t('portfolio.subtitle')">
          <NuxtLink
            :to="localePath('/projects')"
            class="group inline-flex items-center gap-2 rounded-full border glass px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
          >
            {{ t('portfolio.viewAll') }}
            <Icon name="lucide:arrow-right" :size="15" class="transition-transform duration-300 group-hover:translate-x-1" />
          </NuxtLink>
        </SectionHeading>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(project, i) in projects" :key="project.id" v-reveal="i * 120">
            <ProjectCard :project="project" />
          </div>
        </div>
      </div>
    </section>

    <!-- Blog -->
    <section id="blog" class="relative py-24 lg:py-32">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading :eyebrow="t('blog.title')" :title="t('blog.subtitle')">
          <NuxtLink
            :to="localePath('/blog')"
            class="group inline-flex items-center gap-2 rounded-full border glass px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
          >
            {{ t('blog.viewAll') }}
            <Icon name="lucide:arrow-right" :size="15" class="transition-transform duration-300 group-hover:translate-x-1" />
          </NuxtLink>
        </SectionHeading>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(post, i) in blogPosts" :key="post.path" v-reveal="i * 120">
            <BlogCard :post="post" />
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="relative py-24 lg:py-32">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div v-reveal:scale class="relative overflow-hidden rounded-[2rem] border bg-card shadow-lift">
          <div class="absolute inset-0 pointer-events-none">
            <div class="absolute inset-0 grid-lines opacity-60" />
            <div class="absolute -top-32 -left-32 w-[480px] h-[480px] bg-primary/20 rounded-full blur-[120px] animate-glow-1" />
            <div class="absolute -bottom-40 right-0 w-[420px] h-[420px] bg-highlight/15 rounded-full blur-[120px] animate-glow-2" />
          </div>

          <div class="relative grid lg:grid-cols-[1fr_1.1fr]">
            <div class="p-8 sm:p-10 lg:p-14">
              <p class="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
                <span class="h-px w-8 bg-brand-gradient" />
                {{ t('contact.title') }}
              </p>
              <h2 class="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance mb-10">
                {{ t('contact.subtitle') }}
              </h2>

              <div class="space-y-3 mb-8">
                <a
                  href="mailto:ali@aliyil.com"
                  class="group flex items-center gap-4 rounded-2xl border bg-background/60 p-4 transition-colors hover:border-primary/40"
                >
                  <span class="grid place-items-center w-11 h-11 rounded-xl bg-primary/10 text-primary">
                    <Icon name="lucide:mail" :size="20" />
                  </span>
                  <span class="flex-1">
                    <span class="block text-xs text-muted-foreground">{{ t('contact.info.email') }}</span>
                    <span class="font-medium">ali@aliyil.com</span>
                  </span>
                  <Icon name="lucide:arrow-up-right" :size="16" class="text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <div class="flex items-center gap-4 rounded-2xl border bg-background/60 p-4">
                  <span class="grid place-items-center w-11 h-11 rounded-xl bg-primary/10 text-primary">
                    <Icon name="lucide:map-pin" :size="20" />
                  </span>
                  <span>
                    <span class="block text-xs text-muted-foreground">{{ t('contact.info.location') }}</span>
                    <span class="font-medium">{{ t('contact.info.locationValue') }}</span>
                  </span>
                </div>
              </div>

              <a
                href="https://wa.me/905345909974"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-shine group flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] text-white px-6 py-3.5 text-sm font-semibold shadow-soft transition-transform duration-300 hover:scale-[1.02]"
              >
                <WhatsAppIcon class="w-5 h-5" />
                {{ t('contact.whatsapp') }}
              </a>

              <div class="mt-8 flex items-center gap-3">
                <span class="text-sm text-muted-foreground">{{ t('contact.socials') }}</span>
                <span class="h-px flex-1 bg-border" />
                <a
                  v-for="social in socials"
                  :key="social.label"
                  :href="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="social.label"
                  class="grid place-items-center w-10 h-10 rounded-full border bg-background text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary hover:border-primary/50"
                >
                  <Icon :name="social.icon" :size="17" />
                </a>
              </div>
            </div>

            <div class="p-8 sm:p-10 lg:p-14 border-t lg:border-t-0 lg:border-l bg-background/40">
              <form action="https://formspree.io/f/xaqdopaw" method="POST" class="space-y-5">
                <div class="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label for="contact-name" class="text-sm font-medium mb-2 block">{{ t('contact.name') }}</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      autocomplete="name"
                      class="field"
                    />
                  </div>
                  <div>
                    <label for="contact-email" class="text-sm font-medium mb-2 block">{{ t('contact.email') }}</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      autocomplete="email"
                      class="field"
                    />
                  </div>
                </div>
                <div>
                  <label for="contact-message" class="text-sm font-medium mb-2 block">{{ t('contact.message') }}</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="7"
                    required
                    class="field resize-none"
                  />
                </div>
                <button
                  type="submit"
                  class="btn-shine group w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium shadow-soft transition-transform duration-300 hover:scale-[1.01]"
                >
                  {{ t('contact.send') }}
                  <Icon name="lucide:send" :size="16" class="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  --hx: 50%;
  --hy: 40%;
  --px: 0;
  --py: 0;
}

.hero-spotlight {
  background: radial-gradient(600px circle at var(--hx) var(--hy), color-mix(in oklch, var(--primary) 10%, transparent), transparent 45%);
}

.hero-parallax {
  translate: calc(var(--px) * -14px) calc(var(--py) * -14px);
  transition: translate 0.8s var(--ease-out-expo);
}

.word {
  display: inline-block;
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-right: 0.22em;
  vertical-align: bottom;
}
.word:last-child {
  margin-right: 0;
}
.word > span {
  display: inline-block;
  animation: word-rise 1.2s var(--ease-out-expo) var(--d, 0ms) both;
}
@keyframes word-rise {
  from {
    transform: translateY(110%) rotate(6deg);
  }
}

.avatar-ring {
  background: conic-gradient(from 0deg, var(--primary), var(--highlight), transparent 45%, transparent 55%, var(--primary));
}

.chip {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 1rem;
  box-shadow: 0 12px 32px -12px hsl(var(--shadow-color) / 0.3);
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
}

.skill-fill {
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1.4s var(--ease-out-expo) calc(var(--i) * 90ms + 250ms);
}
[data-revealed] .skill-fill,
html:not(.js) .skill-fill {
  transform: scaleX(var(--level));
}

.field {
  width: 100%;
  border-radius: 0.9rem;
  border: 1px solid var(--border);
  background: var(--background);
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.3s ease;
}
.field:hover {
  border-color: color-mix(in oklch, var(--primary) 30%, var(--border));
}
.field:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px color-mix(in oklch, var(--primary) 15%, transparent);
}
</style>
