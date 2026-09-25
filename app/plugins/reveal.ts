import type { DirectiveBinding } from 'vue'

type RevealValue = number | undefined

function delayStyle(binding: DirectiveBinding<RevealValue>) {
  return binding.value ? { '--reveal-delay': `${binding.value}ms` } : {}
}

export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | undefined

  function getObserver() {
    observer ??= new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute('data-revealed', '')
        observer?.unobserve(entry.target)
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
    return observer
  }

  nuxtApp.vueApp.directive<HTMLElement, RevealValue>('reveal', {
    getSSRProps(binding) {
      return {
        'data-reveal': binding.arg || 'up',
        'style': delayStyle(binding),
      }
    },
    mounted(el, binding) {
      el.setAttribute('data-reveal', binding.arg || 'up')
      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)

      if (!('IntersectionObserver' in window)) {
        el.setAttribute('data-revealed', '')
        return
      }
      getObserver().observe(el)
    },
    unmounted(el) {
      observer?.unobserve(el)
    },
  })
})
