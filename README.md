# Informes USG

App para redactar informes de ecografía ginecológica y obstétrica, publicada en
https://informes.danielvillamizar.com

- Todo funciona en el navegador. No hay servidor ni base de datos: los datos de
  la paciente no se guardan ni salen del equipo.
- Los datos del centro, logo, firma y diseño se guardan solo en el navegador de
  cada equipo. Para pasarlos a otro equipo: Configuración › Exportar / Importar.
- Funciona sin internet después de la primera visita (`sw.js`).

## Publicar una versión nueva

1. Reemplazar `index.html` (y los archivos que cambien).
2. Subir el número en `sw.js` (`VERSION`) y en `index.html` (`APP.version` y la etiqueta `v…`).
3. Al abrir la app, aparece el aviso "Hay una versión nueva".

Versión actual: 1.0 · 16-oct-2026
