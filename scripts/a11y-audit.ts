/** Static accessibility inventory. Presence in source is not proof of WCAG conformance. */
import * as fs from 'fs';
import * as path from 'path';

function collect(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? collect(file) : /\.tsx?$/.test(file) ? [file] : [];
  });
}
const files = collect(path.resolve('src/components'));
const components = files.map(file => ({ name: path.relative(process.cwd(), file).replace(/\\/g, '/'), text: fs.readFileSync(file, 'utf8') }));
const inventory = [
  { checkId: 'A11Y-001-LANDMARKS', category: 'Landmarks', pattern: /<(header|main|nav|section|footer)\b/, wcagCriterion: '1.3.1', description: '來源中的語意標籤', details: '需於實際頁面確認地標名稱、順序與標題階層。' },
  { checkId: 'A11Y-002-INTERACTIVE-LABELS', category: 'Forms & Buttons', pattern: /aria-label=|aria-labelledby=|<label\b/, wcagCriterion: '4.1.2', description: '來源中的明確標籤', details: '標籤屬性存在不代表每個控制項都有可用名稱；需檢查渲染後的無障礙樹。' },
  { checkId: 'A11Y-003-FOCUS-INDICATORS', category: 'Keyboard & Focus', pattern: /focus-visible|focus:ring|focus:outline/, wcagCriterion: '2.4.7, 2.4.11', description: '來源中的焦點樣式線索', details: '全域 CSS 另提供焦點樣式；需實際鍵盤驗證可見焦點、順序及遮擋，不能由 class 推論通過。' },
  { checkId: 'A11Y-004-DUAL-ENCODING', category: 'Dual Encoding', pattern: /EvidenceBadge|aria-pressed|role="status"/, wcagCriterion: '1.4.1', description: '來源中的文字或狀態線索', details: '需逐頁確認所有資訊都能在不依賴顏色時理解。' },
  { checkId: 'A11Y-005-CONTRAST-RATIO', category: 'Contrast & Visual', pattern: /dark:|text-/, wcagCriterion: '1.4.3', description: '文字與主題樣式線索', details: '本程式未量測渲染後的前景、背景對比，未涵蓋所有配色與互動狀態。' },
  { checkId: 'A11Y-006-SCREEN-READERS', category: 'Screen Readers', pattern: /sr-only|aria-|role=/, wcagCriterion: '1.3.2, 4.1.2', description: 'ARIA 與輔助文字線索', details: 'ARIA 存在不代表報讀機可用；需真人使用報讀機確認閱讀順序與狀態通知。' },
];
const checks = inventory.map(({ pattern, ...item }) => ({ ...item, status: 'WARN', scannedCount: components.length, candidateCount: components.filter(c => pattern.test(c.text)).length }));
const report = {
  version: '2.0.0', referenceStandard: 'WCAG 2.2 Level AA', timestamp: new Date().toISOString(),
  scope: 'Static source inventory only. Not a WCAG conformance audit or certification.',
  requiresManualReview: true,
  summary: { totalChecks: checks.length, passed: 0, warnings: checks.length, failures: 0 },
  checks, scannedComponents: components.map(c => c.name),
};
const outputPath = path.resolve('public/data/a11y-audit.json');
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf8');
console.log(`Accessibility source inventory: ${components.length} components, ${checks.length} areas require browser/manual review. No WCAG compliance score is inferred.`);
console.log(`Output: ${path.relative(process.cwd(), outputPath)}`);
