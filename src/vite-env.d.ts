/**
 * @file TypeScript environment declarations for Vite client types and custom environment variables.
 */

/// <reference types="vite/client" />

/**
 * Defines the available environment variables for the Vite application.
 */
interface ImportMetaEnv {
  readonly VITE_PLAUSIBLE_DOMAIN?: string;
}

/**
 * Extends the global ImportMeta interface with the application's environment types.
 */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
