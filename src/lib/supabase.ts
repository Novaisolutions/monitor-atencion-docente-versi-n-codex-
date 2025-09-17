import { createClient } from '@supabase/supabase-js';

// ========================================
// SUPABASE CLIENT CONFIGURATION
// Sistema de Monitoreo de Atención Docente - CENYCA
// Versión Codex - Configuración Optimizada
// ========================================

// Obtener configuración desde variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validación crítica de configuración
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ CONFIGURACIÓN CRÍTICA FALTANTE: Variables de entorno Supabase no configuradas.\n' +
    'Asegúrate de tener VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env'
  );
}

// Crear cliente de Supabase con configuración optimizada para CENYCA
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  // Configuración de tiempo real optimizada para gestión docente
  realtime: {
    params: {
      eventsPerSecond: 10, // Limitado para rendimiento
      heartbeatIntervalMs: 30000, // 30 segundos
      reconnectAfterMs: function (tries: number) {
        return Math.min(tries * 1000, 10000); // Reconexión exponencial máx 10s
      },
    },
  },
  
  // Configuración de autenticación
  auth: {
    persistSession: true, // Mantener sesión entre recargas
    autoRefreshToken: true, // Renovar tokens automáticamente
    detectSessionInUrl: true, // Detectar auth tokens en URL
    flowType: 'pkce', // PKCE para mayor seguridad
  },
  
  // Configuración global del cliente
  global: {
    headers: {
      'X-Client-Name': 'CENYCA-Monitor-Docentes',
      'X-Client-Version': 'Codex-1.0.0',
    },
  },
  
  // Configuración de base de datos
  db: {
    schema: 'public', // Schema por defecto
  },
});

// Log de inicialización para debugging
console.log('🔗 Supabase inicializado correctamente:', {
  url: supabaseUrl,
  proyecto: supabaseUrl.split('//')[1]?.split('.')[0] || 'desconocido',
  timestamp: new Date().toISOString(),
  version: 'Codex 1.0.0'
});

// Función de utilidad para verificar conexión
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('CRM_Docentes')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Error de conexión Supabase:', error.message);
      return false;
    }
    
    console.log('✅ Conexión Supabase verificada correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error crítico de Supabase:', error);
    return false;
  }
};

// ========================================
// CONFIGURACIÓN ESPECIALIZADA CENYCA:
// ========================================
//
// ✅ OPTIMIZACIONES IMPLEMENTADAS:
// - Validación crítica de variables de entorno
// - Configuración de tiempo real para gestión docente
// - Headers personalizados para identificación
// - Reconexión inteligente con backoff exponencial
// - PKCE habilitado para máxima seguridad
//
// 🎯 CONFIGURACIÓN EDUCATIVA:
// - Parámetros ajustados para uso académico
// - Logging estructurado para debugging
// - Función de verificación de conexión
//
// 🔒 SEGURIDAD:
// - Variables de entorno validadas
// - Tokens renovados automáticamente
// - Sesiones persistentes seguras
// ========================================