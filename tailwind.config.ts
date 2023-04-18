import type { Config } from 'tailwindcss'
import tailwindTypography from '@tailwindcss/typography'

export default <Partial<Config>>{
  content: [
    process.env.NODE_ENV === 'production'
      ? './node_modules/@trevio/ui/src/**/*.{js,ts,vue}'
      : `${process.env.UI}/src/**/*.{js,ts,vue}`
  ],
  tailwindcss: {
    config: {
      plugins: [tailwindTypography]
    }
  }
}