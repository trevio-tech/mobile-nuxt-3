import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
const config = {
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

if (process.env.ENV != 'production') {
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
