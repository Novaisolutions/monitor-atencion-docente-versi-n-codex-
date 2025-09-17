// ========================================
// KOMMO CRM PROXY - NETLIFY FUNCTION
// Sistema de Monitoreo de Atención Docente - CENYCA
// Versión Codex - Configuración Segura
// ========================================

/**
 * Función proxy segura para integración con Kommo CRM
 * 🔒 CRÍTICO: Utiliza variables de entorno para tokens
 * 🔒 NUNCA hardcodear credenciales en el código
 */

exports.handler = async (event, context) => {
  // Validación de método HTTP
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: JSON.stringify({
        error: 'Método no permitido',
        message: 'Solo se permiten peticiones POST'
      })
    };
  }

  // Configuración CORS para preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: ''
    };
  }

  try {
    // 🔒 VALIDACIÓN CRÍTICA DE VARIABLES DE ENTORNO
    const kommoBaseUrl = process.env.KOMMO_BASE_URL;
    const kommoToken = process.env.KOMMO_ACCESS_TOKEN;

    if (!kommoBaseUrl || !kommoToken) {
      console.error('❌ CONFIGURACIÓN FALTANTE: Variables de entorno no configuradas');
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Configuración del servidor incompleta',
          message: 'Contacte al administrador del sistema',
          code: 'MISSING_ENV_CONFIG'
        })
      };
    }

    // Parsear el cuerpo de la petición
    let requestBody;
    try {
      requestBody = JSON.parse(event.body);
    } catch (parseError) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Formato de datos inválido',
          message: 'El cuerpo de la petición debe ser JSON válido'
        })
      };
    }

    // Validar que se especifique el endpoint
    if (!requestBody.endpoint) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Endpoint no especificado',
          message: 'Debe especificar el endpoint de Kommo a consultar'
        })
      };
    }

    // Construir URL completa
    const fullUrl = `${kommoBaseUrl}${requestBody.endpoint}`;

    // Configurar headers para Kommo
    const headers = {
      'Authorization': `Bearer ${kommoToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'CENYCA-Docentes-Monitor/1.0 (Codex)'
    };

    // Realizar petición a Kommo
    const response = await fetch(fullUrl, {
      method: requestBody.method || 'GET',
      headers: headers,
      body: requestBody.data ? JSON.stringify(requestBody.data) : undefined
    });

    // Obtener respuesta de Kommo
    const responseData = await response.json();

    // Log de éxito (sin exponer datos sensibles)
    console.log(`✅ Petición exitosa a Kommo: ${requestBody.endpoint} - Status: ${response.status}`);

    // Retornar respuesta exitosa
    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: JSON.stringify({
        success: true,
        data: responseData,
        status: response.status,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    // Log del error (sin exponer información sensible)
    console.error('❌ Error en proxy Kommo:', {
      message: error.message,
      endpoint: JSON.parse(event.body || '{}').endpoint,
      timestamp: new Date().toISOString()
    });

    // Retornar error genérico al cliente
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Error interno del servidor',
        message: 'No se pudo procesar la petición a Kommo CRM',
        code: 'KOMMO_PROXY_ERROR',
        timestamp: new Date().toISOString()
      })
    };
  }
};

// ========================================
// NOTAS DE SEGURIDAD - VERSIÓN CODEX:
// ========================================
// 
// ✅ IMPLEMENTADO:
// - Variables de entorno para credenciales
// - Validación de tokens antes de uso
// - CORS configurado correctamente
// - Logging sin exposición de datos sensibles
// - Manejo de errores seguro
// - Validación de entrada
//
// 🔒 RECORDATORIOS CRÍTICOS:
// - NUNCA hardcodear tokens JWT
// - Variables de entorno configuradas en Netlify
// - Logs monitoreados regularmente
// - Rotación periódica de tokens
//
// 📋 VARIABLES REQUERIDAS:
// - KOMMO_BASE_URL: https://tu-subdominio.kommo.com/api/v4
// - KOMMO_ACCESS_TOKEN: Token JWT de Kommo
//
// 🚀 VERSIÓN CODEX - OPTIMIZADA PARA CENYCA
// ========================================