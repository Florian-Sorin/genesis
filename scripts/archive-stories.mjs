#!/usr/bin/env node
// Archive les stories marquées [done] :
// - scanne docs/stories/*.md
// - pour chaque fichier dont le statut est [done], le déplace vers docs/stories/done/
// - laisse l'index STORIES.md intact (la table "Stories terminées" reste à plat)
// - options : --dry-run (n'effectue rien), --yes (skip la confirmation)
//
// Usage :
//   node scripts/archive-stories.mjs
//   node scripts/archive-stories.mjs --dry-run
//   node scripts/archive-stories.mjs --yes

import { readFileSync, readdirSync, existsSync, mkdirSync, renameSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const STORIES_DIR = join(ROOT, 'docs', 'stories');
const DONE_DIR = join(STORIES_DIR, 'done');

const DRY_RUN = process.argv.includes('--dry-run');
const YES = process.argv.includes('--yes') || process.argv.includes('-y');

function isDoneStory(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  // Statut sur la première occurrence uniquement (l'historique peut contenir [done] aussi)
  const m = content.match(/^\*\*Statut :\*\*\s+`\[([^\]]+)\]`/m);
  return m && m[1] === 'done';
}

async function confirm(question) {
  if (YES) return true;
  const rl = createInterface({ input, output });
  const answer = (await rl.question(`${question} [O/n] : `)).trim().toLowerCase();
  rl.close();
  return answer === '' || answer === 'o' || answer === 'oui' || answer === 'y' || answer === 'yes';
}

async function main() {
  if (!existsSync(STORIES_DIR)) {
    console.error(`❌ ${STORIES_DIR} introuvable.`);
    process.exit(1);
  }

  const entries = readdirSync(STORIES_DIR)
    .filter((f) => /^ST-\d{3}-.+\.md$/.test(f))
    .filter((f) => {
      const full = join(STORIES_DIR, f);
      return statSync(full).isFile();
    });

  if (entries.length === 0) {
    console.log('✨ Aucune story à analyser.');
    return;
  }

  const toArchive = [];
  for (const file of entries) {
    if (isDoneStory(join(STORIES_DIR, file))) {
      toArchive.push(file);
    }
  }

  if (toArchive.length === 0) {
    console.log('✨ Aucune story `[done]` à archiver.');
    return;
  }

  console.log(`\n📦 ${toArchive.length} story(ies) à archiver vers docs/stories/done/ :\n`);
  for (const file of toArchive) {
    console.log(`  - ${file}`);
  }
  console.log('');

  if (DRY_RUN) {
    console.log('🔍 Mode --dry-run : aucun fichier déplacé.');
    return;
  }

  const ok = await confirm('Confirmer le déplacement ?');
  if (!ok) {
    console.log('⛔ Annulé.');
    return;
  }

  if (!existsSync(DONE_DIR)) {
    mkdirSync(DONE_DIR, { recursive: true });
    console.log(`📁 Créé : docs/stories/done/`);
  }

  let moved = 0;
  for (const file of toArchive) {
    const src = join(STORIES_DIR, file);
    const dest = join(DONE_DIR, file);
    if (existsSync(dest)) {
      console.warn(`  ⚠️  ${file} existe déjà dans done/, on saute.`);
      continue;
    }
    renameSync(src, dest);
    console.log(`  ✅ ${file} → docs/stories/done/`);
    moved++;
  }

  console.log(`\n✨ ${moved} story(ies) archivée(s).`);
  console.log('💡 N\'oublie pas : git add docs/stories/ && git commit -m "chore: archive done stories"');
}

main().catch((err) => {
  console.error('❌ Erreur :', err.message);
  process.exit(1);
});
