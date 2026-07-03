const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const mappings = [
  { regex: /bg-\[#05070a\]/g, replacement: 'bg-[#fdfbfb]' },
  { regex: /bg-\[#111417\]/g, replacement: 'bg-white' },
  { regex: /bg-\[#161320\]/g, replacement: 'bg-[#f0eaf5]' },
  { regex: /bg-\[#0a0a0f\]/g, replacement: 'bg-white' },
  { regex: /bg-[#1a1727]/g, replacement: 'bg-[#e2d5ed]' },
  { regex: /bg-[#241f35]/g, replacement: 'bg-[#e8ddef]' },
  { regex: /bg-[#1f1b2c]/g, replacement: 'bg-[#f0eaf5]' },
  { regex: /border-t-\[#1f1b2c\]/g, replacement: 'border-t-[#f0eaf5]' },
  { regex: /border-l-\[#241f35\]/g, replacement: 'border-l-[#e8ddef]' },
  { regex: /border-r-\[#241f35\]/g, replacement: 'border-r-[#e8ddef]' },
  { regex: /border-b-\[#1a1727\]/g, replacement: 'border-b-[#e2d5ed]' },
  { regex: /text-\[#f8f9fa\]/g, replacement: 'text-[#2d141c]' },
  { regex: /text-\[#e1e2e7\]/g, replacement: 'text-[#5e3e47]' },
  { regex: /text-white/g, replacement: 'text-[#2d141c]' },
  { regex: /text-\[#f8f9fa\]\/50/g, replacement: 'text-[#2d141c]/50' },
  { regex: /text-white\/50/g, replacement: 'text-[#2d141c]/50' },
  { regex: /border-white\/10/g, replacement: 'border-black/10' },
  { regex: /border-white\/5/g, replacement: 'border-black/5' },
  { regex: /border-white\/20/g, replacement: 'border-black/20' },
  { regex: /bg-white\/10/g, replacement: 'bg-black/5' },
  { regex: /bg-white\/20/g, replacement: 'bg-black/10' },
  { regex: /bg-black\/20/g, replacement: 'bg-white/40' },
  { regex: /bg-black\/40/g, replacement: 'bg-white/60' },
  { regex: /bg-black\/60/g, replacement: 'bg-white/80' },
  { regex: /bg-black\/80/g, replacement: 'bg-white/90' },
  { regex: /bg-black\/90/g, replacement: 'bg-white/95' },
  { regex: /bg-black\/95/g, replacement: 'bg-white/95' },
  { regex: /bg-black/g, replacement: 'bg-white' }, // catch-all for bg-black if any standalone
  { regex: /shadow-\[0_0_50px_rgba\(0,0,0,0\.8\)\]/g, replacement: 'shadow-2xl' },
  { regex: /shadow-\[0_0_30px_rgba\(0,0,0,0\.8\)\]/g, replacement: 'shadow-xl' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let original = content;
      for (const mapping of mappings) {
        content = content.replace(mapping.regex, mapping.replacement);
      }
      if (original !== content) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Migration complete!');
