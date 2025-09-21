import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

// ========================================
// ESLINT CONFIGURATION - CENYCA
// Sistema de Monitoreo de Atención Docente
// Versión Codex - Configuración de Linting
// ========================================

export default tseslint.config(
  // Ignorar archivos que no necesitan linting
  { 
    ignores: [
      'dist',
      'node_modules',
      '*.config.js',
      'public',
      'netlify/functions',
      '.netlify',
      'dev-dist'
    ] 
  },
  
  // Configuración base para JavaScript
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    
    // Plugins específicos para React y TypeScript
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    
    // Reglas personalizadas para CENYCA
    rules: {
      // === REGLAS DE REACT HOOKS ===
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // === REGLAS DE TYPESCRIPT ===
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { 
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true 
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-var-requires': 'error',
      
      // === REGLAS DE CALIDAD DE CÓDIGO ===
      'no-debugger': 'warn',
      'no-alert': 'warn',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-script-url': 'error',
      
      // === REGLAS DE ESTILO PARA EDUCACIÓN ===
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'warn',
      'prefer-arrow-callback': 'warn',
      'prefer-template': 'warn',
      
      // === REGLAS DE ACCESIBILIDAD ===
      'jsx-a11y/alt-text': 'off', // Deshabilitado temporalmente
      
      // === REGLAS ESPECÍFICAS PARA CENYCA ===
      // Permitir console.log en desarrollo
      'no-console': process.env.NODE_ENV === 'production'
        ? ['error', { allow: ['warn', 'error'] }]
        : ['warn', { allow: ['warn', 'error', 'info'] }],
      
      // Preferir nomenclatura específica educativa
      'id-length': ['warn', { min: 2, exceptions: ['i', 'j', 'k', 'x', 'y'] }],
      
      // Consistencia en naming
      'camelcase': ['warn', { 
        properties: 'never',
        ignoreDestructuring: true,
        allow: ['^UNSAFE_', '^VITE_', 'student_id', 'teacher_id'] 
      }],
    }
  },
  {
    files: ['*.config.{js,ts}', 'vite.config.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    files: ['src/types/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['src/vite-env.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  }
)

// ========================================
// NOTAS DE CONFIGURACIÓN CODEX:
// ========================================
//
// ✨ REGLAS IMPLEMENTADAS:
// - TypeScript estricto con excepciones educativas
// - React Hooks con validación completa
// - Reglas de accesibilidad consideradas
// - Nomenclatura específica para educación
// - Calidad de código enfocada en mantenibilidad
//
// 🎯 ESPECIALIZACIÓN CENYCA:
// - Excepciones para variables de entorno educativas
// - Nomenclatura específica para IDs académicos
// - Configuración optimizada para desarrollo educativo
//
// 🔧 CONFIGURACIÓN:
// - Ignora archivos de build y configuración
// - Diferentes reglas para desarrollo vs producción
// - Overrides específicos para tipos y configuración
// - Compatibilidad con herramientas modernas
// ========================================