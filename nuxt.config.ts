import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
const config = {
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'msapplication-TileColor', content: '#da532c' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'description', content: `Любите путешествовать? Вливайтесь в сообщество Тревио. Здесь вы найдете полезную информацию о всех уголках земного шара. Откройте для себя новый мир, полный незабываемых эмоций!`},
        { name: 'yandex-verification', content: '0a06729b08d54752' }
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: 'favicon/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'favicon/favicon-16x16.png' },
        { rel: 'manifest', href: 'favicon/site.webmanifest' },
        { rel: 'mask-icon', href: 'favicon/safari-pinned-tab.svg', color: "#5bbad5" },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,500,600&display=swap' }
      ],
    },
  },
  css: [
    '~/assets/scss/main.scss'
  ],
  modules: [
    '@nuxt-alt/auth',
    '@nuxt-alt/http',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      ...process.env,
    }
  },
  auth: {
    strategies: {
      graphql: {
        scheme: '~/authentication-strategies/graphql.ts',
      }
    }
  },
}

if (process.env.NODE_ENV != 'production') {
  config.alias = {
    '@trevio/ui': resolve(`${process.env.UI}/src/index.ts`),
  }

  config.vite = {
    server: {
      fs: {
        allow: ['..']
      }
    }
  }
}

export default defineNuxtConfig(config)
