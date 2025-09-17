/// <reference types="vite/client" />

// ========================================
// DEFINICIONES DE TIPOS VITE - CENYCA
// Sistema de Monitoreo de Atención Docente
// Versión Codex - Tipos de Entorno
// ========================================

/**
 * Interfaz extendida para variables de entorno de Vite
 * Especifica todas las variables esperadas para CENYCA
 */
interface ImportMetaEnv {
  // === CONFIGURACIÓN SUPABASE ===
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  
  // === CONFIGURACIÓN DE LA APLICACIÓN ===
  readonly VITE_APP_TITLE: string;
  readonly VITE_KOMMO_WEBHOOK_URL: string;
  
  // === CONFIGURACIÓN ESPECÍFICA CODEX ===
  readonly VITE_CODEX_FEATURES: string;
  readonly VITE_PERFORMANCE_MODE: string;
  
  // === CONFIGURACIÓN DE DESARROLLO ===
  readonly VITE_DEBUG_MODE: string;
  readonly VITE_LOG_LEVEL: string;
  
  // === VARIABLES ESTÁNDAR DE VITE ===
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
  readonly SSR: boolean;
}

/**
 * Interfaz extendida para ImportMeta
 * Incluye tipado para variables de entorno
 */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// ========================================
// TIPOS GLOBALES PARA LA APLICACIÓN
// ========================================

/**
 * Tipos globales para Window
 * Extensiones específicas para CENYCA
 */
declare global {
  interface Window {
    // Para debugging en desarrollo
    __CENYCA_DEBUG__?: boolean;
    
    // Para métricas de performance
    __CENYCA_PERFORMANCE__?: {
      startTime: number;
      loadTime: number;
    };
    
    // Para integración con herramientas externas
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// ========================================
// DECLARACIONES DE MÓDULOS ESPECÍFICOS
// ========================================

/**
 * Declaración para archivos CSS modules
 */
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

/**
 * Declaración para archivos de imagen
 */
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

/**
 * Declaración para archivos de fuentes
 */
declare module '*.woff' {
  const src: string;
  export default src;
}

declare module '*.woff2' {
  const src: string;
  export default src;
}

/**
 * Declaración para archivos JSON
 */
declare module '*.json' {
  const value: any;
  export default value;
}

// ========================================
// TIPOS ESPECÍFICOS PARA WORKER THREADS
// ========================================

/**
 * Tipos para Service Workers y Web Workers
 */
declare module '*?worker' {
  const workerConstructor: {
    new (): Worker;
  };
  export default workerConstructor;
}

declare module '*?worker&inline' {
  const workerConstructor: {
    new (): Worker;
  };
  export default workerConstructor;
}

// ========================================
// CONFIGURACIÓN DE ANÁLISIS ESTÁTICO
// ========================================

/**
 * Configuración para herramientas de análisis
 */
declare module 'virtual:*' {
  const result: any;
  export default result;
}

// ========================================
// NOTAS DE VERSIÓN CODEX:
// ========================================
//
// ✨ DEFINICIONES IMPLEMENTADAS:
// - Variables de entorno tipadas para CENYCA
// - Extensiones de Window para debugging
// - Declaraciones para assets estáticos
// - Tipado para Worker threads
// - Configuración para herramientas de análisis
//
// 🎯 ESPECIALIZACIÓN EDUCATIVA:
// - Variables específicas para gestión docente
// - Configuración Codex personalizada
// - Tipado para métricas de performance
//
// 🔧 BENEFICIOS:
// - IntelliSense completo en VS Code
// - Detección temprana de errores
// - Documentación inline
// - Mejor experiencia de desarrollo
// ========================================