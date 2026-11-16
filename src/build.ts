import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { renderPage } from './site.js';

const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);

mkdirSync(output, { recursive: true });
writeFileSync(new URL('index.html', output), renderPage(), 'utf8');
cpSync(new URL('styles.css', root), new URL('styles.css', output));
cpSync(new URL('assets/', root), new URL('assets/', output), { recursive: true });
