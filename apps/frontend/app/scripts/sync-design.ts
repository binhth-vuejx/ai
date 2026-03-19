#!/usr/bin/env node
/**
 * sync-design.ts
 * Compares design tokens from pencil-tokens.json with index.css
 * and optionally updates index.css to match the Pencil design system.
 *
 * Usage:
 *   npx tsx scripts/sync-design.ts          # check only (diff report)
 *   npx tsx scripts/sync-design.ts --apply  # apply changes to index.css
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const TOKENS_PATH = resolve(ROOT, 'design/pencil-tokens.json');
const CSS_PATH = resolve(ROOT, 'src/assets/index.css');

const apply = process.argv.includes('--apply');

// ─── Load tokens ─────────────────────────────────────────────────────────────

const tokens: {
  _meta: Record<string, string>;
  light: Record<string, string>;
  dark: Record<string, string>;
  components: Record<string, Record<string, any>>;
} = JSON.parse(readFileSync(TOKENS_PATH, 'utf-8'));

// Extract structural component tokens (excluding variants/colors that start with $)
const componentTokens: Record<string, string> = {};
for (const [comp, props] of Object.entries(tokens.components)) {
  for (const [key, val] of Object.entries(props)) {
    if (typeof val === 'string' && !val.startsWith('$')) {
      const kebabKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
      componentTokens[`--${comp}-${kebabKey}`] = val;
    }
  }
}

// Merge component structural tokens into light tokens, so they get injected to :root
Object.assign(tokens.light, componentTokens);

// ─── Parse current CSS ───────────────────────────────────────────────────────

const css = readFileSync(CSS_PATH, 'utf-8');

function extractBlock(css: string, selector: string): Record<string, string> {
  const re = new RegExp(`${selector}\\s*\\{([^}]+)\\}`, 's');
  const match = css.match(re);
  if (!match) return {};
  const lines = match[1].split('\n');
  const result: Record<string, string> = {};
  for (const line of lines) {
    const m = line.trim().match(/^(--[\w-]+)\s*:\s*(.+?);?$/);
    if (m) result[m[1]] = m[2].trim().replace(/;$/, '');
  }
  return result;
}

const currentLight = extractBlock(css, ':root');
const currentDark = extractBlock(css, '\\.dark');

// ─── Compare ─────────────────────────────────────────────────────────────────

interface Diff {
  token: string;
  mode: 'light' | 'dark';
  pencil: string;
  code: string;
}

const diffs: Diff[] = [];

function compare(pencilTokens: Record<string, string>, codeTokens: Record<string, string>, mode: 'light' | 'dark') {
  for (const [token, pencilValue] of Object.entries(pencilTokens)) {
    // Skip sidebar-background (it's an alias)
    if (token === '--sidebar-background') continue;

    const codeValue = codeTokens[token];
    if (!codeValue) {
      diffs.push({ token, mode, pencil: pencilValue, code: '(missing)' });
    } else if (normalizeColor(codeValue) !== normalizeColor(pencilValue)) {
      diffs.push({ token, mode, pencil: pencilValue, code: codeValue });
    }
  }
}

/** Normalize color values for comparison (lowercase, trim whitespace) */
function normalizeColor(val: string): string {
  return val.toLowerCase().replace(/\s+/g, '');
}

compare(tokens.light, currentLight, 'light');
compare(tokens.dark, currentDark, 'dark');

// ─── Report ───────────────────────────────────────────────────────────────────

const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
console.log(`\n🎨 Pencil Design Sync Report — ${timestamp}`);
console.log(`   Source: ${TOKENS_PATH}`);
console.log(`   Target: ${CSS_PATH}\n`);

if (diffs.length === 0) {
  console.log('✅ All tokens in sync! No differences found.\n');
  process.exit(0);
}

console.log(`⚠️  Found ${diffs.length} difference(s):\n`);
console.log(`${'Token'.padEnd(35)} ${'Mode'.padEnd(6)} ${'Pencil'.padEnd(30)} Code`);
console.log('─'.repeat(100));
for (const d of diffs) {
  const flag = d.code === '(missing)' ? '🆕' : '⚡';
  console.log(`${flag} ${d.token.padEnd(33)} ${d.mode.padEnd(6)} ${d.pencil.padEnd(30)} ${d.code}`);
}
console.log();

// ─── Apply ───────────────────────────────────────────────────────────────────

if (apply) {
  console.log('🔧 Applying changes to index.css...\n');

  let updatedCss = css;

  function applyToBlock(
    tokens: Record<string, string>,
    currentTokens: Record<string, string>,
    selector: string
  ): void {
    for (const [token, value] of Object.entries(tokens)) {
      if (token === '--sidebar-background') continue;
      const current = currentTokens[token];
      if (!current || normalizeColor(current) !== normalizeColor(value)) {
        if (current) {
          // Replace existing value
          const tokenRe = new RegExp(`(${escapeRe(token)}\\s*:\\s*)([^;]+)(;)`, 'g');
          const before = updatedCss;
          updatedCss = updatedCss.replace(tokenRe, `$1${value}$3`);
          if (before === updatedCss) {
            console.warn(`   ⚠️  Could not update ${token} in ${selector}`);
          } else {
            console.log(`   ✅ Updated ${token}: ${current} → ${value}`);
          }
        } else {
          // Token missing — log but don't auto-insert (too complex for safety)
          console.log(`   🆕 Missing ${token} = ${value} in ${selector} (add manually)`);
        }
      }
    }
  }

  function escapeRe(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  applyToBlock(tokens.light, currentLight, ':root');
  applyToBlock(tokens.dark, currentDark, '.dark');

  // Update last synced timestamp in comment
  updatedCss = updatedCss.replace(
    /Last synced: .+?(?=\s*\|)/,
    `Last synced: ${new Date().toISOString().slice(0, 10)}`
  );

  writeFileSync(CSS_PATH, updatedCss, 'utf-8');
  console.log(`\n✅ index.css updated.\n`);
} else {
  console.log(`💡 Run with --apply to automatically fix differences:\n`);
  console.log(`   npx tsx scripts/sync-design.ts --apply\n`);
}
