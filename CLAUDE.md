# Informes USG · instrucciones para Claude

App de informes de ecografía del Dr. Daniel Villamizar. Todo en español.

## Regla de trabajo (obligatoria)

1. Antes de escribir código: resumir lo pedido, revisar que se entendió tal como el usuario lo escribió, plantear preguntas y mejoras, y **mostrar una maqueta**.
2. Generar el código **solo** cuando el usuario responda que sí a la pregunta de si ya quiere generarlo.
3. Subir al repositorio **solo** con su aprobación.

## Dónde está todo

- App publicada: https://informes.danielvillamizar.com (GitHub Pages desde `main`, `/ (root)`, HTTPS forzado).
- DNS en GoDaddy: CNAME `informes` → `gestamindapp.github.io`. No tocar la página principal danielvillamizar.com ni enlazar la app desde ella.
- **La versión de referencia es el `index.html` de este repositorio**, no el artefacto de claude.ai (que se quedó en la V15).
- Historia y decisiones de cada módulo: documentos `resumen_modulo_*.md` del proyecto de claude.ai "App Informes de Ultrasonido" (el de este repositorio es `resumen_modulo_publicacion.md`).

## Archivos

- `index.html`: la app completa (HTML, CSS y JS en un solo archivo; algunas líneas son muy largas porque llevan las letras incrustadas: leer por tramos).
- `sw.js`: funcionamiento sin internet y aviso de versión nueva.
- `manifest.webmanifest`, `icons/*-v2.png`: instalación como app.
- `lib/pdfmake.min.js` (0.2.10): generador de PDF local.
- `CNAME`, `robots.txt` (la app no debe aparecer en buscadores), `.nojekyll`, `README.md`.

## Cómo publicar una versión nueva

1. Traer antes los cambios remotos (`git pull --rebase`): GitHub hace sus propios commits del `CNAME`.
2. Hacer el cambio en `index.html`. Si es grande, publicarlo primero como artefacto de prueba en claude.ai para que el usuario lo revise.
3. Probar en navegador a tamaño computador, iPad e iPhone: los informes, el PDF, Limpiar y que no haya errores.
4. Subir el número de versión en **tres** lugares:
   - `APP.version` en `index.html`, y agregar una línea al inicio de `APP.novedades`.
   - La etiqueta `v…` del botón `#verBadge` en `index.html`.
   - `VERSION` en `sw.js` (sin esto, los equipos no reciben la actualización).
5. Si cambia un archivo que guarda `sw.js` (íconos, pdfmake), **cambiarle el nombre** y actualizar las referencias; si no, las copias guardadas siguen sirviendo el viejo.
6. Commit en español describiendo el cambio y push a `main`. GitHub publica en 1–2 minutos y en los equipos aparece "Hay una versión nueva".
7. Actualizar el historial de versiones en el resumen del proyecto.

## Cosas que no hay que romper

- Las hojas reales de la vista previa (`#sheet`) nunca se escalan: de ellas salen la paginación, el PDF y la impresión. La copia reducida para pantallas angostas es `#sheetView`.
- Los datos de las pacientes **no** se guardan en ningún lado. Solo se guardan en el navegador la configuración (`usg.center.v1`, `usg.page.v1`, `usg.look.v1`, `usg.lhguide.v1`, `usg.fert.v1`), que se pasa entre equipos con Configuración › Exportar / Importar.
- La esquina superior izquierda muestra siempre el ícono de la app; el logo del centro va solo en la hoja impresa y el PDF.
- Dentro de claude.ai no funcionan Imprimir, Compartir, la instalación ni el modo sin internet: eso se prueba en la dirección real.
