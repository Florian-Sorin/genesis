#!/usr/bin/env node
// Archive les pré-maquettes de src/playground/ vers docs/assets/playground-archive/ :
// - scanne src/playground/*.{vue,jsx,tsx,html} (extensions UI configurables)
// - déplace chaque fichier vers docs/assets/playground-archive/, en préservant le nom
// - écrit/maintient un INDEX.md récapitulatif avec date d'archivage et lien WIREFRAMES.md correspondant
// - laisse src/playground/ vide (mais existant) après archivage ; à supprimer manuellement si besoin
// - options : --dry-run (n'effectue rien), --yes (skip la confirmation), --delete (supprime au lieu d'archiver)
//
// Usage :
//   node scripts/archive-mockups.mjs
//   node scripts/archive-mockups.mjs --dry-run
//   node scripts/archive-mockups.mjs --yes
//   node scripts/archive-mockups.mjs --delete           # supprime sans archiver
//   node scripts/archive-mockups.mjs --delete --yes

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, renameSync, unlinkSync, statSync } from 'node:fs';
import { join, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PLAYGROUND_DIR = join(ROOT, 'src', 'playground');
const ARCHIVE_DIR = join(ROOT, 'docs', 'assets', 'playground-archive');
const INDEX_FILE = join(ARCHIVE_DIR, 'INDEX.md');

const DRY_RUN = process.argv.includes('--dry-run');
const YES = process.argv.includes('--yes') || process.argv.includes('-y');
const DELETE_MODE = process.argv.includes('--delete');

const MOCKUP_EXTENSIONS = new Set(['.vue', '.jsx', '.tsx', '.html', '.svelte']);

function isMockupFile(filename) {
  return MOCKUP_EXTENSIONS.has(extname(filename).toLowerCase());
}

async function confirm(question) {
  if (YES) return true;
  const rl = createInterface({ input, output });
  const answer = (await rl.question(`${question} [O/n] : `)).trim().toLowerCase();
  rl.close();
  return answer === '' || answer === 'o' || answer === 'oui' || answer === 'y' || answer === 'yes';
}

function todayIso() {
  return new Date().toISOString().split('T')[0];
}

function ensureIndex() {
  if (existsSync(INDEX_FILE)) return;
  const header = `# Playground archive

<!-- Pré-maquettes archivées depuis src/playground/. -->
<!-- Mise à jour automatique par scripts/archive-mockups.mjs. -->
<!-- Garder ce fichier comme référence historique : permet de retrouver une variante explorée. -->

| Fichier | Archivé le | Écran (WIREFRAMES.md) |
|---------|-----------|------------------------|
`;
  writeFileSync(INDEX_FILE, header, 'utf-8');
}

function appendToIndex(archivedEntries) {
  ensureIndex();
  const current = readFileSync(INDEX_FILE, 'utf-8');
  const lines = archivedEntries.map(({ file, screen }) => `| \`${file}\` | ${todayIso()} | ${screen || '—'} |`).join('\n');
  const updated = current.trimEnd() + '\n' + lines + '\n';
  writeFileSync(INDEX_FILE, updated, 'utf-8');
}

// Tente d'extraire l'ID d'écran (S01, S02, ...) depuis le nom de fichier ou un commentaire en tête.
function extractScreenId(filePath, filename) {
  const fromName = filename.match(/^(s\d{2,3})/i);
  if (fromName) return fromName[1].toUpperCase();

  try {
    const content = readFileSync(filePath, 'utf-8').slice(0, 500);
    const fromComment = content.match(/\b(S\d{2,3})\b/);
    if (fromComment) return fromComment[1].toUpperCase();
  } catch {
    // ignore unreadable files
  }
  return null;
}

async function main() {
  if (!existsSync(PLAYGROUND_DIR)) {
    console.log('✨ Aucun dossier src/playground/ — rien à archiver.');
    return;
  }

  const entries = readdirSync(PLAYGROUND_DIR)
    .filter((f) => isMockupFile(f))
    .filter((f) => statSync(join(PLAYGROUND_DIR, f)).isFile());

  if (entries.length === 0) {
    console.log('✨ src/playground/ ne contient aucune maquette à archiver.');
    return;
  }

  const action = DELETE_MODE ? 'supprimer' : 'archiver vers docs/assets/playground-archive/';
  console.log(`\n📦 ${entries.length} maquette(s) à ${action} :\n`);
  for (const file of entries) {
    const screen = extractScreenId(join(PLAYGROUND_DIR, file), file);
    console.log(`  - ${file}${screen ? `  (écran ${screen})` : ''}`);
  }
  console.log('');

  if (DRY_RUN) {
    console.log('🔍 Mode --dry-run : aucun fichier déplacé.');
    return;
  }

  const ok = await confirm(`Confirmer ${DELETE_MODE ? 'la suppression' : "l'archivage"} ?`);
  if (!ok) {
    console.log('⛔ Annulé.');
    return;
  }

  if (!DELETE_MODE && !existsSync(ARCHIVE_DIR)) {
    mkdirSync(ARCHIVE_DIR, { recursive: true });
    console.log(`📁 Créé : docs/assets/playground-archive/`);
  }

  const archived = [];
  let processed = 0;

  for (const file of entries) {
    const src = join(PLAYGROUND_DIR, file);
    const screen = extractScreenId(src, file);

    if (DELETE_MODE) {
      unlinkSync(src);
      console.log(`  🗑️  ${file} supprimé`);
      processed++;
      continue;
    }

    const dest = join(ARCHIVE_DIR, file);
    if (existsSync(dest)) {
      const stamped = `${basename(file, extname(file))}.${todayIso()}${extname(file)}`;
      const stampedDest = join(ARCHIVE_DIR, stamped);
      renameSync(src, stampedDest);
      console.log(`  ✅ ${file} → docs/assets/playground-archive/${stamped} (conflit, suffixé par date)`);
      archived.push({ file: stamped, screen });
    } else {
      renameSync(src, dest);
      console.log(`  ✅ ${file} → docs/assets/playground-archive/`);
      archived.push({ file, screen });
    }
    processed++;
  }

  if (!DELETE_MODE && archived.length > 0) {
    appendToIndex(archived);
    console.log(`\n📝 docs/assets/playground-archive/INDEX.md mis à jour.`);
  }

  console.log(`\n✨ ${processed} maquette(s) ${DELETE_MODE ? 'supprimée(s)' : 'archivée(s)'}.`);
  console.log('💡 N\'oublie pas : git add . && git commit -m "chore: archive playground mockups"');
}

main().catch((err) => {
  console.error('❌ Erreur :', err.message);
  process.exit(1);
});
