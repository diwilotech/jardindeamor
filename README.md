# Fundación Jardín de Amor — Sitio estático

Instrucciones rápidas para preparar y desplegar este sitio en Cloudflare Pages, y cómo añadir dibujos y textos desde tu PDF de ejemplo.

Pasos para desplegar en Cloudflare Pages

1. Inicializa un repositorio Git en esta carpeta (si no existe):

```bash
git init
git add .
git commit -m "Sitio estático: preparar para Cloudflare Pages"
```

2. Sube el repositorio a GitHub/GitLab/Bitbucket y conecta el repositorio en Cloudflare Pages.

3. En Cloudflare Pages, configura la rama (por ejemplo `main`) y publica desde la carpeta raíz. Este sitio es HTML/CSS/JS puro, no necesita build.

Archivos útiles

- `index.html`, `quienes-somos.html`, `equipo.html` — páginas principales del sitio.
- `assets/css/styles.css` — estilos centralizados (extraídos de los HTML embebidos).
- Imágenes ya disponibles en la carpeta raíz (por ejemplo `logotipo Jardin de Amor_Mesa de trabajo 1 copia 2.png` y `upscalemedia-transformed...png`).

Cómo añadir los dibujos y el PDF de ejemplo

1. Coloca tus dibujos (PNG/JPG/SVG) en `assets/images/` (crea la carpeta si no existe). Usa nombres simples sin espacios, por ejemplo `dibujo-1.png`.

2. Reemplaza las imágenes en los HTML editando el atributo `src`. Ejemplo:

```html
<img src="assets/images/dibujo-1.png" alt="Dibujo 1" class="img-fluid">
```

3. Para extraer texto del PDF de ejemplo y usarlo en la web:
   - Abre el PDF en tu equipo y copia los textos (o usa una herramienta de extracción como `pdftotext`).
   - Pega el texto en la sección correspondiente de los archivos HTML (por ejemplo en `quienes-somos.html`).

4. Cuando nos pases el PDF y los dibujos, puedo:
   - Extraer y formatear automáticamente los textos en las páginas.
   - Copiar las imágenes a `assets/images/` y actualizarlas en los HTML.

Consejos para Cloudflare Pages

- Asegura que la rama publicada tenga los archivos en la raíz o configura el directorio de publicación si usas otra estructura.
- Si quieres URLs limpias (sin `.html`), habilita la opción de "Pretty URLs" en Cloudflare Pages.
