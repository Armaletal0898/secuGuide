<img width="1918" height="964" alt="imagen" src="https://github.com/user-attachments/assets/77a1b67e-f7d7-4a3e-96d2-0e327983c677" />

<img width="1916" height="470" alt="imagen" src="https://github.com/user-attachments/assets/b45223bf-a4f7-4a1d-9b00-84a9176a7f87" />










# Propuesta de Desarrollo de Software:secuGuide

Plataforma Web de Guía Educativa y
Diagnóstico Básico en Ciberseguridad y
Soporte Técnico.

## Nombre del aplicativo y plataforma de desarrollo
Nombre del Aplicativo: SecuGuide (o Guía de Ciberseguirdad y Soporte Básico).
Plataforma de desarrollo: Aplicación Web (Navegador):

+  **FRONTED:** html & css
+  **BACKEND:** javascript & python


<br>


## Justicación de la Plataforma

  +  **Accesibilidad universal**: Al ser una aplicación web, los usuarios no necesitan instalar software
adicional ni permisos de administrador en sus equipos para consultar la guía.

  +  **Multiplataforma**: Se puede acceder desde cualquier sistema operativo (Windows, Linux, macOS)
o dispositivo (PC de escritorio, laptop, tableta o teléfono móvil) mediante un navegador web
estándar.

  +  **Actualización centralizada**: Cualquier mejora en las guías, actualizaciones de seguridad o nuevos
módulos instructivos se actualizan de inmediato para todos los usuarios sin requerir descargas.



<br>

## Descripción general del sistema y definición del problema a resolver


En el entorno informático cotidiano, tanto en hogares como en organizaciones, los usuario normales
enfrentan con frecuencia incidentes comunes relacionados con la ciberseguridad **(correos
sospechosos, phishing, contraseñas débiles)** y problemas técnicos recurrentes **(fallas de red,
conectividad de impresoras)**.



<br>

## La falta de un punto de consulta rápido y compresible provoca dos grandes poblemas:

  +  **Riesgos de Seguridad**: Los usuarios actúan por intuición ante archivos o enlaces sospechosos,
comprometiendo la integridad de sus sistemas y datos.

  +  **Saturación del soporte técnico**: Se generan múltiples solicitudes por fallas sencillas que el
propio usuario podría resolver o dignosticar una guía paso a paso adecuada.


<br>

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



<br>

## Funcionalidades del sistema y alcance

### A. Alcance (Qué Incluye la aplicación):

**1. Módulo de Higiene Digital y Contraseñas:**
  +  Evaluación y recomendaciones para la creación de contraseñas seguras.
  +  Guía sobre el uso de autenticación de dos factores (2FA) y gestores de contraseñas.
  
**2. Módulo de Gestión de Archivos y Correos Sospechosos:**
  +  Simulador interactivo basico para identicar correos de phishing.
  +  Pasos de actuación inmediata ante la sospecha de un archivo malicioso **(desconexión de
red, no ejecución, reporte)**.

**3. Módulo de Diagnóstico Interactivo de Redes:**
  +  Asistente guiado por preguntas de selección simple para resolver problemas frecuentes de
conectividad **(ej. vericación de IP, reinicio de interfaz, revisión de cables / WI-FI)**.

**4. Módulo de Dignóstico Interactivo de Impresoras:**
  +  Guía paso a paso para resolver fallas comunes de impresión (colas de impresión atascadas,
estado fuera de línea, problemas de controlador básico).

**5. Panel de Consultas Rápidos (Glosario y Buenas Prácticas):**
  +  Sección de consejos rápidos e infografías interactivas sobre ciberseguridad básica.



<br>
  
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





# Despliegue de plataforma

### Construir la Imagen: Podman

```bash

podman build -f Dockerfile -t localhost/secu-guide-app:latest .

```



<br>

### Ejecutar el contenedor (con la bandera `-replace` para actualizarlo fácilmente):

```bash

podman run -d --replace -p 8000:8000 --name secu-guide-container localhost/secu-guide-app:latest

```




<br>
<br>

### Construir la Imagen: Docker

```bash

docker build -t secu-guide-app:latest .

```



<br>

### Ejecutar el contenedor (con la bandera `-replace` para actualizarlo fácilmente):

```bash

docker run -d --rm -p 8000:8000 --name secu-guide-container secu-guide-app:latest

```


> Nota: En Docker puedes usar `--rm` para que elimine automáticamente el contenedor antinguo al detenerlo, o usar `--name` y hacer un `docker stop` y `docker rm` previo si prefieres controlarlo de forma manual.
