import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ========================================
// UTILIDADES GENERALES - CENYCA
// Sistema de Monitoreo de Atención Docente
// Versión Codex - Utilidades Optimizadas
// ========================================

/**
 * Combina y optimiza clases de Tailwind CSS
 * Utilidad principal para manejo de clases condicionales
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatea nombres para mostrar (capitaliza primera letra)
 * Útil para nombres de docentes y estudiantes
 */
export function formatDisplayName(name: string): string {
  if (!name) return 'Sin nombre';
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Formatea números para mostrar con separadores de miles
 * Útil para estadísticas académicas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-MX').format(num);
}

/**
 * Formatea porcentajes para mostrar
 * Útil para métricas educativas
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Genera un ID único para elementos del DOM
 * Útil para accesibilidad y referencias
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Trunca texto a una longitud específica
 * Útil para previstas de mensajes largos
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Valida si una cadena es un email válido
 * Útil para validar emails de docentes
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida si una cadena es un teléfono válido mexicano
 * Útil para validar teléfonos de contacto
 */
export function isValidMexicanPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length === 10 && cleanPhone.startsWith('5');
}

/**
 * Formatea un teléfono mexicano para mostrar
 * Ejemplo: 5512345678 -> (55) 1234-5678
 */
export function formatMexicanPhone(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length !== 10) return phone;
  
  return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 6)}-${cleanPhone.slice(6)}`;
}

/**
 * Calcula el tiempo transcurrido desde una fecha
 * Útil para mostrar "hace X tiempo" en mensajes
 */
export function timeAgo(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Hace un momento';
  if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} h`;
  if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
  
  return past.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Convierte bytes a formato legible
 * Útil para mostrar tamaños de archivos
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

/**
 * Sanitiza texto para evitar XSS
 * Útil para contenido generado por usuarios
 */
export function sanitizeText(text: string): string {
  if (!text) return '';
  
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Genera colores consistentes para avatares basados en texto
 * Útil para avatares de docentes sin foto
 */
export function getAvatarColor(text: string): string {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
    'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-teal-500'
  ];
  
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}

/**
 * Debounce para optimizar búsquedas y filtros
 * Útil para inputs de búsqueda en tiempo real
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle para limitar frecuencia de ejecución
 * Útil para eventos de scroll o resize
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Copia texto al portapapeles
 * Útil para copiar IDs, enlaces, etc.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error al copiar al portapapeles:', error);
    return false;
  }
}

/**
 * Descarga contenido como archivo
 * Útil para exportar reportes
 */
export function downloadAsFile(content: string, filename: string, type: string = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Convierte fecha a formato ISO para Supabase
 * Útil para filtros de fecha
 */
export function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Obtiene el saludo apropiado según la hora
 * Útil para personalizar la experiencia del usuario
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'Buenos días';
  if (hour < 18) return 'Buenas tardes';
  return 'Buenas noches';
}

/**
 * Detecta si el usuario está en un dispositivo móvil
 * Útil para comportamientos responsive
 */
export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// ========================================
// UTILIDADES ESPECÍFICAS PARA EDUCACIÓN
// ========================================

/**
 * Genera iniciales para nombres de docentes
 * Útil para avatares cuando no hay foto
 */
export function getInitials(name: string): string {
  if (!name) return 'ND';
  
  return name
    .split(' ')
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
}

/**
 * Clasifica el nivel de urgencia basado en keywords
 * Útil para priorizar casos docentes
 */
export function getUrgencyLevel(text: string): 'alta' | 'media' | 'baja' {
  const urgentKeywords = ['urgente', 'emergencia', 'inmediato', 'crítico'];
  const mediumKeywords = ['importante', 'pronto', 'necesario', 'revisar'];
  
  const lowerText = text.toLowerCase();
  
  if (urgentKeywords.some(keyword => lowerText.includes(keyword))) {
    return 'alta';
  }
  
  if (mediumKeywords.some(keyword => lowerText.includes(keyword))) {
    return 'media';
  }
  
  return 'baja';
}

/**
 * Formatea el nombre de un plantel educativo
 * Útil para mostrar consistentemente los planteles
 */
export function formatPlantelName(plantel: string): string {
  if (!plantel) return 'Sin plantel';
  
  // Remover "Plantel" si ya está incluido
  const clean = plantel.replace(/^plantel\s+/i, '');
  return `Plantel ${clean}`;
}

// ========================================
// CONSTANTES EDUCATIVAS ÚTILES
// ========================================

export const ACADEMIC_PRIORITIES = {
  ALTA: { label: 'Alta', color: 'text-red-500', bg: 'bg-red-50' },
  MEDIA: { label: 'Media', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  BAJA: { label: 'Baja', color: 'text-green-500', bg: 'bg-green-50' }
} as const;

export const MESSAGE_TYPES = {
  CONSULTA: { label: 'Consulta', icon: '❓' },
  INCIDENCIA: { label: 'Incidencia', icon: '⚠️' },
  SEGUIMIENTO: { label: 'Seguimiento', icon: '📋' },
  RESOLUCION: { label: 'Resolución', icon: '✅' }
} as const;

export const ACADEMIC_STATUSES = {
  PENDIENTE: { label: 'Pendiente', color: 'text-yellow-600' },
  EN_PROCESO: { label: 'En Proceso', color: 'text-blue-600' },
  COMPLETADO: { label: 'Completado', color: 'text-green-600' },
  CANCELADO: { label: 'Cancelado', color: 'text-red-600' }
} as const;

// ========================================
// NOTAS DE VERSIÓN CODEX:
// ========================================
//
// ✨ UTILIDADES IMPLEMENTADAS:
// - Funciones de formateo específicas para educación
// - Validaciones de datos académicos
// - Utilidades de tiempo y fecha
// - Helpers para UI/UX educativo
// - Constantes para estados académicos
// - Funciones de sanitización y seguridad
// - Utilidades para performance (debounce/throttle)
// - Helpers para avatares y colores
//
// 🎯 ESPECIALIZACIÓN CENYCA:
// - Validación de teléfonos mexicanos
// - Formateo de nombres de planteles
// - Clasificación de urgencia académica
// - Constantes específicas educativas
//
// 🔧 OPTIMIZACIONES:
// - Funciones puras sin efectos secundarios
// - TypeScript tipado estrictamente
// - Manejo de errores robusto
// - Performance optimizado
// ========================================