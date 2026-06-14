/**
 * Typography compliance checker
 * Enforces the 4px font grid rule: all font sizes must be multiples of 4px, minimum 12px.
 * Run via: npm run check:type
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
const SCAN_DIRS = ['src', 'tailwind.config.js'];
const VALID_EXTENSIONS = ['.astro', '.tsx', '.ts', '.css', '.js', '.mjs'];

// Valid px sizes on the 4px grid (12–96px range)
const VALID_PX = new Set([12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 88, 96]);

// Skip these patterns — they're valid by design
const SKIP_PATTERNS = [
  /clamp\(/,          // clamp() tokens are defined in tailwind.config.js and pre-audited
  /var\(--/,          // CSS variable references
  /font-size="[\d]+/, // SVG font-size attr — checked separately
];

const SKIP_FILES = [
  'package-lock.json',
];

let violations = [];
let filesScanned = 0;

function remToPx(rem) {
  return Math.round(parseFloat(rem) * 16);
}

function isValidSize(px) {
  return px >= 12 && VALID_PX.has(px);
}

function nearestValid(px) {
  if (px < 12) return 12;
  const candidates = [...VALID_PX].filter(v => v >= 12);
  return candidates.reduce((prev, curr) =>
    Math.abs(curr - px) < Math.abs(prev - px) ? curr : prev
  );
}

function scanLine(line, filePath, lineNum) {
  // Skip lines matching any skip pattern
  if (SKIP_PATTERNS.some(p => p.test(line))) return;
  // Skip comment lines
  if (line.trim().startsWith('//') || line.trim().startsWith('*') || line.trim().startsWith('<!--')) return;

  // Match: font-size: 1rem / fontSize: '1rem' / fontSize: "1rem"
  const remMatches = line.matchAll(/font-?[Ss]ize[:\s'"]+([0-9.]+)rem/g);
  for (const m of remMatches) {
    const px = remToPx(m[1]);
    if (!isValidSize(px)) {
      violations.push({
        file: filePath.replace(ROOT, ''),
        line: lineNum,
        value: `${m[1]}rem (${px}px)`,
        suggestion: `${nearestValid(px)}px / ${(nearestValid(px) / 16).toFixed(4).replace(/\.?0+$/, '')}rem`,
        context: line.trim(),
      });
    }
  }

  // Match: font-size: 16px / fontSize: '16px'
  const pxMatches = line.matchAll(/font-?[Ss]ize[:\s'"]+([0-9.]+)px/g);
  for (const m of pxMatches) {
    const px = Math.round(parseFloat(m[1]));
    if (!isValidSize(px)) {
      violations.push({
        file: filePath.replace(ROOT, ''),
        line: lineNum,
        value: `${m[1]}px`,
        suggestion: `${nearestValid(px)}px`,
        context: line.trim(),
      });
    }
  }
}

function scanFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  lines.forEach((line, i) => scanLine(line, filePath, i + 1));
  filesScanned++;
}

function walkDir(dir) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist' || SKIP_FILES.includes(entry)) continue;
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (VALID_EXTENSIONS.includes(extname(entry))) {
      scanFile(fullPath);
    }
  }
}

// Run the scan
for (const target of SCAN_DIRS) {
  const fullPath = join(ROOT, target);
  try {
    const stat = statSync(fullPath);
    if (stat.isDirectory()) walkDir(fullPath);
    else scanFile(fullPath);
  } catch {
    // target doesn't exist, skip
  }
}

// Report
console.log(`\nTypography check — scanned ${filesScanned} files\n`);

if (violations.length === 0) {
  console.log('✓ All font sizes comply with the 4px grid rule (min 12px)\n');
  process.exit(0);
} else {
  console.error(`✗ Found ${violations.length} font size violation${violations.length > 1 ? 's' : ''}:\n`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}`);
    console.error(`    Value:      ${v.value}`);
    console.error(`    Suggestion: ${v.suggestion}`);
    console.error(`    Context:    ${v.context}\n`);
  }
  process.exit(1);
}
