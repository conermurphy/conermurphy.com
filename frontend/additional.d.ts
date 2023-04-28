/// <reference types="next-images" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONVERTKIT_ENDPOINT: string;
      CONVERTKIT_PUBLIC_KEY: string;
      CONVERTKIT_SIGNUP_FORM: string;
      NEXT_PUBLIC_WPM: string;
      POSTS_PER_PAGE: string;
      CONTACT_FORM_ENDPOINT: string;
      CONTACT_FORM_API_KEY: string;
      AWS_API_REGION: string;
      AWS_ACCESS_KEY: string;
      AWS_SECRET_KEY: string;
      POST_DB_TABLE_NAME: string;
    }
  }
}

export {};
