# html-genome.md — Static HTML DNA

This is the extra blueprint information specifically for static HTML, CSS, and JS projects. Ideal for fast single-page apps or tools that need to run completely offline.

## SKELETON
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UNGASIS HTML App</title>
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
</head>
<body class="sky-scroll">
  <main class="glass-container">
    <h1>Project DNA Title</h1>
  </main>
  <script src="js/app.js"></script>
</body>
</html>
```

## FOLDER STRUCTURE
```
css/
├── tokens.css       → Design tokens (colors, animations, fonts)
├── base.css         → CSS resets and body rules
├── layout.css       → Grid/Flexbox containers
└── components.css   → Glass cards, buttons, lists
js/
└── app.js           → Main application scripts
assets/
└── images/          → Local assets and icons
```

## RULES
- **Single File Ceiling:** If a single HTML file exceeds 115KB, it must be split into separate modular sub-files immediately.
- **No Direct Rewrite:** Do not let AI agents overwrite massive parts of `index.html` directly. Always use Node.js surgical edit scripts to replace small code blocks.
- **Dot-Nav Alignment:** Always configure floating dot navigation elements to have CSS `left: auto` to prevent stretching across the window.

## TOOLS FOLDER
- Create a `tools/` folder in the project root.
- Store script files (like `edit.js`) in `tools/` to modify the HTML code programmatically. This ensures safe edits and saves token cost.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
