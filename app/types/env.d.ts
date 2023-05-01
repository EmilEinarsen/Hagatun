declare global {
  interface ENV {
    SANITY_PUBLIC_PROJECT_ID: string
    SANITY_PUBLIC_DATASET: string
    SANITY_PUBLIC_API_VERSION: string
    
    FORMSPREE_KEY: string
    RECAPTCHA_SITE_KEY: string
  }
  namespace NodeJS {
    interface ProcessEnv extends ENV { }
  }

  interface Window {
    ENV: ENV
  }
}
window.ENV