// One-off script: inline all CSS/JS/font/favicon assets from dist/ into a single standalone HTML file.
const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "..", "dist");
const outFile = path.join(distDir, "Newmont-Command-Center-v6.1-standalone.html");

let html = fs.readFileSync(path.join(distDir, "index.html"), "utf8");

function readAsset(urlPath) {
  // urlPath like /_next/static/chunks/foo.js
  const rel = urlPath.split("?")[0].replace(/^\//, "");
  return fs.readFileSync(path.join(distDir, rel));
}

function toDataUri(buf, mime) {
  return `data:${mime};base64,${buf.toString("base64")}`;
}

// --- Inline CSS, including its @font-face url(../media/...) references ---
html = html.replace(
  /<link rel="stylesheet" href="([^"]+)"[^>]*\/>/,
  (match, href) => {
    let css = readAsset(href).toString("utf8");
    const cssDir = path.dirname(path.join(distDir, href.replace(/^\//, "")));
    css = css.replace(/url\((\.\.\/media\/[^)]+)\)/g, (m, rel) => {
      const fontPath = path.join(cssDir, rel);
      const buf = fs.readFileSync(fontPath);
      return `url(${toDataUri(buf, "font/woff2")})`;
    });
    return `<style>${css}</style>`;
  }
);

// --- Remove font preload link (font is now inlined as data URI in CSS) ---
html = html.replace(/<link rel="preload" href="\/_next\/static\/media\/[^"]+" as="font"[^>]*\/>/, "");

// --- Remove preload-as-script link (the script will be inlined directly anyway) ---
html = html.replace(/<link rel="preload" as="script"[^>]*\/>/, "");

// --- Inline favicon as data URI ---
html = html.replace(/<link rel="icon" href="([^"]+)"([^>]*)\/>/, (match, href, rest) => {
  const buf = readAsset(href);
  return `<link rel="icon" href="${toDataUri(buf, "image/x-icon")}"${rest}/>`;
});

// --- Inline all <script src="/_next/static/chunks/*.js" ...> tags ---
html = html.replace(/<script src="(\/_next\/static\/chunks\/[^"]+)"([^>]*)><\/script>/g, (match, src, attrs) => {
  // Drop the noModule legacy-fallback bundle entirely — modern browsers never
  // execute it, and inlining it as a regular script corrupts the page.
  if (/noModule/i.test(attrs)) return "";

  const buf = readAsset(src);
  const idMatch = attrs.match(/\sid="[^"]*"/);
  const idAttr = idMatch ? idMatch[0] : "";
  // Use a data: URI for src (instead of inline text content) so that
  // turbopack's chunk runtime, which calls document.currentScript.getAttribute("src"),
  // gets a non-null value and doesn't throw.
  return `<script${idAttr} src="${toDataUri(buf, "text/javascript")}"></script>`;
});

fs.writeFileSync(outFile, html, "utf8");
console.log("Wrote", outFile, `(${(html.length / 1024 / 1024).toFixed(2)} MB)`);
