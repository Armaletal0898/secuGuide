# secuGuide

## Propuesta de Desarrollo de Software:

Plataforma Web de Guía Educativa y
Diagnóstico Básico en Ciberseguridad y
Soporte Técnico.

## Nombre del aplicativo y plataforma de desarrollo
Nombre del Aplicativo: SecuGuide (o Guía de Ciberseguirdad y Soporte Básico).
Plataforma de desarrollo: Aplicación Web (Navegador) en HTML/CSS/JAVASCRIPT

## Justicación de la Plataforma

  +  **Accesibilidad universal**: Al ser una aplicación web, los usuarios no necesitan instalar software
adicional ni permisos de administrador en sus equipos para consultar la guía.

  +  **Multiplataforma**: Se puede acceder desde cualquier sistema operativo (Windows, Linux, macOS)
o dispositivo (PC de escritorio, laptop, tableta o teléfono móvil) mediante un navegador web
estándar.

  +  **Actualización centralizada**: Cualquier mejora en las guías, actualizaciones de seguridad o nuevos
módulos instructivos se reejan de inmediato para todos los usuarios sin requerir descargas.
Descripción general del sistema y denición del problema a resolver


## Denicion del problema

En el entorno informático cotidiano, tanto en hogares como en organizaciones, los usuario nales
enfrentan con frecuencia incidentes comunes relacionados con la ciberseguridad **(correos
sospechosos, phishing, contraseñas débiles)** y problemas técnicos recurrentes (fallas de red,
conectividad de impresoras).

## La falta de un punto de consulta rápido y compresible provoca dos grandes poblemas:

  +  **Riesgos de Seguridad**: Los usuarios actúan por intuición antes archivos o enlaces sospechosos,
comprometiendo la integridad de sus sistemas y datos.

  +  **Saturación del soporte técnico**: Se generan múltiples solicitudes por fallas sencillas que el
propio usuario podría resolver o dignosticar una guía paso a paso adecuada.


## Objetivo General

Desarrollar una aplicación web interactiva que oriente, eduque y guíe al usuario nal en la resolución de
problemas comunes de redes e impresoras, la gestión segura de contraseñas y el manejo adecuado de
archivo o mensajes sospechosos.

Objetivos especícos

  +  Proveer Módulo interactivo sobre concientización e higiene digital (gestión de contraseñas y
detección de amenazas).

  +  Diseñar un flujo de diagnóstico paso a paso para la resolución de fallas básicas en redes locales e
impresoras.

  +  Establecer un protocolo guiado sobre la conducta segura a seguir ante archivos o correos de
procedencias dudosa.


## Justicación

Este proyecto responde a la necesidad de fortalecer la cultura de seguridad de la información desde el
eslabón más vulnerable: el usuario. Al combinar educación interactiva con un asistente de diagnóstico
técnico básico, la herramienta no solo previene incidentes de seguridad, sino que fomenta el
autoaprendizaje y optimiza los tiempos de respuesta ante fallas informáticas comunes.


## Funcionalidades del sistema y alcance

### A. Alcance (Qué Incluye la aplicación):

1. Módulo de Higiene Digital y Contraseñas:
  +  Evaluación y recomendaciones para la creación de contraseñas seguras.
  +  Guía sobre el uso de autenticación de dos factores (2FA) y gestores de contraseñas.
  
2. Módulo de Gestión de Archivos y Correos Sospechosos:
  +  Lista de vericación (Checklist) interactiva para identicar correos de phishing y
extensiones de archivos de alto riesgo.
  +  Pasos de actuación inmediata ante la sospecha de un archivo malicioso **(desconexión de
red, no ejecución, reporte)**.

3. Módulo de Diagnóstico Interactivo de Redes:
  +  Asistente guiado por preguntas de selección simple para resolver problemas frecuentes de
conectividad **(ej. vericación de IP, reinicio de interfaz, revisión de cables / WI-FI)**.

4. Módulo de Dignóstico Interactivo de Impresoras:
  +  Guía paso a paso para resolver fallas comunes de impresión (colas de impresión atascadas,
estado fuera de línea, problemas de controlador básico).

5. Panel de Consultas Rápidos (Glosario y Buenas Prácticas):
  +  Sección de consejos rápidos e infografías interactivas sobre ciberseguridad básica.

  
## Límites (Qué no Incluye la aplicación)
  +  **No es un antivirus ni un scanner en tiempo real**: La aplicación no analiza el código binario de los
archivo subidos ni ejecuta análisis en el disco duro del usuario.

  +  **No realiza modicaciones automáticas en el sistema operativo**: La herramienta guía al usuario
para que realice las acciones, pero no ejecuta comandos remotos ni altera la conguración del
equipo de forma autónoma.

  +  **No incluye gestión de tickets de soporte complejos**: No reemplaza un sistema de Mesa de Ayuda
(Help Desk) ni gestiona escalamientos hacia personal técnico.

  +  **No incluye infraestructura de base de datos para usuarios complejos**: Se enfoca en la consulta e
interacción directa del cliente sin requerir registro con tarjeta de crédito o pasarelas de pago.
