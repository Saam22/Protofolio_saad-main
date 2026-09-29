const path = require('path');
const fs = require('fs');

global.DOMMatrix = require('C:/Users/User 3/AppData/Local/Temp/opencode/pdftool/node_modules/dommatrix').DOMMatrix;
global.DOMPoint = require('C:/Users/User 3/AppData/Local/Temp/opencode/pdftool/node_modules/dommatrix').DOMPoint;
global.Path2D = class Path2D { constructor(p) { if (p && p.paths) this.paths = p.paths; else this.paths = []; } };

const pdfjsLib = require('C:/Users/User 3/AppData/Local/Temp/opencode/pdftool/node_modules/pdfjs-dist/legacy/build/pdf.mjs');

(async () => {
  const pdfPath = path.resolve('Saad_Hassan_FullStack_v2.pdf');
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;
  console.log('NUM PAGES:', doc.numPages);
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    let lastY = null;
    let line = '';
    console.log(`\n===== PAGE ${p} =====`);
    for (const item of content.items) {
      if (item.str === undefined) continue;
      if (lastY !== null && Math.abs(item.transform[5] - lastY) > 2) {
        console.log(line);
        line = '';
      }
      line += item.str + ' ';
      lastY = item.transform[5];
    }
    if (line.trim()) console.log(line);
    const viewport = page.getViewport({ scale: 1 });
    console.log(`[page size: ${viewport.width.toFixed(1)} x ${viewport.height.toFixed(1)} pts]`);
  }
})();