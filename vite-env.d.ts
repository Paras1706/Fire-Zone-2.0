/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_ADMIN_PASSWORD: string
  readonly VITE_UPI_ID: string
  readonly VITE_PAYEE_NAME: string
  readonly PROD: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
