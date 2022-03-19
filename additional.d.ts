/// <reference types="next-images" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONVERTKIT_ENDPOINT: string;
      CONVERTKIT_PUBLIC_KEY: string;
      CONVERTKIT_SIGNUP_FORM: string;
    }
  }
}

export {};
