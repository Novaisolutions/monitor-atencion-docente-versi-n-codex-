# 🎓 Monitor de Atención Docente - CENYCA (Versión Codex)

> Sistema integral de gestión y monitoreo de atención docente especializado para instituciones educativas - **Versión Codex**.

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green.svg)](https://supabase.com/)
[![Netlify](https://img.shields.io/badge/Deploy-Netlify-teal.svg)](https://www.netlify.com/)
[![Codex](https://img.shields.io/badge/Versión-Codex-purple.svg)](https://github.com/Novaisolutions/monitor-atencion-docente-versi-n-codex-)

## 🚀 Características Principales

### 🎯 **CRM Docentes Especializado**
- Gestión completa de consultas docentes
- Seguimiento de casos académicos
- Sistema de canalización coordinadores
- Métricas de satisfacción

### 📊 **Dashboard Inteligente**
- Estadísticas en tiempo real
- Análisis de consultas por categoría
- Indicadores de performance académica
- Reportes automatizados

### 💬 **Sistema de Conversaciones**
- Chat en tiempo real con WhatsApp Web
- Historial completo de interacciones
- Estados de seguimiento personalizados
- Notificaciones inteligentes

### 🤖 **Asistente IA - Esthela**
- Respuestas automáticas contextualizadas
- Análisis de sentimientos
- Clasificación automática de consultas
- Sugerencias de respuesta

## 🏗️ Arquitectura del Sistema

### **Frontend**
- **React 18.3.1** + **TypeScript**
- **Vite** para desarrollo y build optimizado
- **Tailwind CSS** con tema dark/light
- **Lucide React** para iconografía educativa

### **Backend**
- **Supabase** (PostgreSQL + Real-time + Auth)
- **Row Level Security (RLS)** implementado
- **Edge Functions** para lógica de negocio
- **Real-time subscriptions** para actualizaciones

### **Despliegue**
- **Netlify** con CI/CD automático
- **Edge Functions** para proxys seguros
- **PWA** ready con service workers
- **CDN** global para performance

## 🗄️ Estructura de Base de Datos

### **Tablas Principales:**

```sql
-- CRM Docentes (7 registros)
CRM_Docentes: Gestión principal de docentes
├── Datos personales y contacto
├── Estado de embudo educativo
├── Historial de consultas
└── Métricas de satisfacción

-- Casos Docentes (6 registros)
casos_docentes: Seguimiento de casos académicos
├── Asignación de casos
├── Estados de progreso
├── Notas y observaciones
└── Fechas de seguimiento

-- Seguimientos (7 registros)
casos_docentes_seguimientos: Historial detallado
├── Acciones realizadas
├── Resultados obtenidos
├── Próximos pasos
└── Evaluaciones
```

### **Schema Completo:**
- **35+ tablas** especializadas
- **Relaciones FK** bien definidas
- **Índices optimizados** para performance
- **Triggers** para automatización

## ⚙️ Instalación y Configuración

### **1. Clonado del Repositorio**
```bash
git clone https://github.com/Novaisolutions/monitor-atencion-docente-versi-n-codex-.git
cd monitor-atencion-docente-versi-n-codex-
```

### **2. Instalación de Dependencias**
```bash
npm install
```

### **3. ⚠️ CONFIGURACIÓN CRÍTICA DE SEGURIDAD**

**Crear archivo `.env` en la raíz del proyecto:**

```env
# ========================================
# SUPABASE CONFIGURATION
# ========================================
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_publica_supabase

# ========================================
# KOMMO CRM INTEGRATION (Netlify Functions)
# ========================================
KOMMO_BASE_URL=https://tu-subdominio.kommo.com/api/v4
KOMMO_ACCESS_TOKEN=tu_token_kommo_jwt

# ========================================
# APPLICATION CONFIGURATION
# ========================================
VITE_APP_TITLE="Monitor de Atención Docente - CENYCA (Versión Codex)"
VITE_KOMMO_WEBHOOK_URL=https://tu-app.netlify.app/.netlify/functions/kommo-proxy
```

### **🔒 SEGURIDAD - NUNCA EXPONGAS:**
- ❌ Tokens JWT de Kommo
- ❌ Claves privadas de Supabase
- ❌ Credenciales de base de datos
- ❌ Variables de entorno en el código

### **4. Desarrollo Local**
```bash
npm run dev
```
Acceso: `http://localhost:5173`

### **5. Build de Producción**
```bash
npm run build
npm run preview
```

## 🚀 Despliegue en Netlify

### **1. Configuración Automática**
```toml
# netlify.toml ya configurado
[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"
```

### **2. Variables de Entorno en Netlify**
1. Ve a tu dashboard de Netlify
2. Site settings → Environment variables
3. Agrega las variables del archivo `.env`
4. **CRÍTICO**: Nunca expongas tokens en el código

### **3. Deploy Automático**
```bash
# Manual
netlify deploy --prod --dir dist

# Automático via Git
git push origin main
```

## 🎨 Características de UI/UX

### **Tema Adaptativo**
- 🌙 **Dark Mode** por defecto
- ☀️ **Light Mode** disponible
- 🎨 **Colores educativos** (azules académicos)
- 📱 **Responsive** completo

### **Iconografía Educativa**
- 🎓 **Graduation Cap** para CRM Docentes
- 📚 **Elementos académicos** consistentes
- 🏫 **Branding CENYCA** integrado

### **Navegación Intuitiva**
- 📱 **Mobile-first** design
- 🖥️ **Desktop optimizado**
- ⚡ **Transiciones fluidas**
- 🎯 **UX especializada** para educación

## 📊 Funcionalidades por Módulo

### **🎓 CRM Docentes**
- ✅ Gestión de consultas académicas
- ✅ Categorización por tipo (General/Incidencias)
- ✅ Estados de seguimiento personalizados
- ✅ Historial completo de interacciones
- ✅ Métricas removidas (Score/Conversión/Sentimiento)

### **💬 Sistema de Chat**
- ✅ Integración WhatsApp Web
- ✅ Mensajes en tiempo real
- ✅ Estados de lectura
- ✅ Búsqueda avanzada
- ✅ Filtros por plantel

### **🤖 Asistente Esthela**
- ✅ IA conversacional educativa
- ✅ Respuestas contextualizadas
- ✅ Escalamiento inteligente
- ✅ Aprendizaje continuo

### **📈 Dashboard Analytics**
- ✅ KPIs educativos
- ✅ Gráficos interactivos
- ✅ Reportes automatizados
- ✅ Exportación de datos

## 🛠️ Desarrollo y Mantenimiento

### **Scripts Disponibles**
```bash
npm run dev          # Desarrollo local
npm run build        # Build producción
npm run preview      # Preview build
npm run lint         # Linting código
npm run type-check   # Verificación tipos
```

### **Estructura del Proyecto**
```
src/
├── components/          # Componentes React
│   ├── auth/           # Autenticación
│   ├── layout/         # Layouts principales
│   ├── ui/             # Componentes UI base
│   └── demo/           # Demos y prototipos
├── hooks/              # Custom React hooks
├── lib/                # Librerías y utilidades
├── types/              # Definiciones TypeScript
└── utils/              # Funciones auxiliares
```

### **Tecnologías Clave**
- **Vite**: Build tool optimizado
- **React Query**: Estado del servidor
- **Zustand**: Estado local ligero
- **React Hook Form**: Formularios
- **Date-fns**: Manejo de fechas
- **Lucide**: Iconos modernos

## 🔐 Seguridad y Best Practices

### **✅ Implementado**
- Row Level Security (RLS) en Supabase
- Variables de entorno para secrets
- CORS configurado correctamente
- Sanitización de inputs
- Autenticación JWT

### **🚧 Recomendaciones**
- Rotación periódica de tokens
- Monitoreo de logs de seguridad
- Backups automáticos
- Rate limiting en APIs

## 🎯 Roadmap Futuro

### **Fase 2 - Q4 2024**
- [ ] Integración calendario Google
- [ ] Notificaciones push
- [ ] Reportes avanzados
- [ ] API pública

### **Fase 3 - Q1 2025**
- [ ] Mobile app nativa
- [ ] Integraciones LMS
- [ ] Analytics avanzados
- [ ] Multi-tenant

## 🔄 Versión Codex

### **Características Especiales:**
- 🧠 **Versión de referencia** con código optimizado
- 🔍 **Documentación extendida** para desarrollo
- 🚀 **Performance mejorado** en componentes críticos
- 🎯 **Configuración especializada** para CENYCA

### **Diferencias con la versión estándar:**
- ✨ Optimizaciones específicas de rendimiento
- 🔧 Configuraciones avanzadas pre-establecidas
- 📋 Documentación técnica extendida
- 🎨 Refinamientos de UI/UX especializados

## 📞 Soporte y Contacto

### **Desarrollado por:**
**NovaI Solutions** 🚀
- 📧 Email: soluciones.novai@gmail.com
- 🌐 Web: [novaisolutions.com](https://novaisolutions.com)
- 📱 Especialistas en EdTech

### **Cliente:**
**CENYCA** 🎓
- 🏫 Centro Educativo de excelencia
- 📍 Sistema integral de gestión docente
- 🎯 Enfoque en calidad educativa

---

## ⚖️ Licencia

© 2024 CENYCA - Todos los derechos reservados.
Desarrollado por NovaI Solutions.

**Uso exclusivo institucional** - Sistema propietario especializado en gestión educativa.
**Versión Codex** - Configuración avanzada y optimizada.

---

### 🚨 **RECORDATORIO CRÍTICO DE SEGURIDAD**

**ANTES DE USAR EN PRODUCCIÓN:**
1. ✅ Configurar todas las variables de entorno
2. ✅ Verificar que no hay tokens hardcodeados
3. ✅ Revisar permisos de base de datos
4. ✅ Habilitar logging de seguridad
5. ✅ Realizar backup inicial

**NUNCA SUBAS AL REPOSITORIO:**
- 🚫 Archivos `.env`
- 🚫 Tokens o claves API
- 🚫 Credenciales de base de datos
- 🚫 Información sensible del cliente