#!/usr/bin/env node
// Crée une nouvelle story :
// - détecte l'ID suivant en scannant docs/stories/ et docs/stories/done/
// - copie _TEMPLATE.md et remplit les métadonnées
// - insère une ligne dans docs/STORIES.md (entre les markers BACKLOG_MVP/V2)
// - cross-platform (Node 18+ ESM)
//
// Deux modes :
//   1. Interactif (par défaut) : pose les questions une à une.
//      node scripts/new-story.mjs
//
//   2. CLI / non-interactif : passe les valeurs en flags.
//      node scripts/new-story.mjs \
//        --title "Setup Supabase Auth" \
//        --priority MVP \
//        --depends-on "—" \
//        --screens "S01,S02" \
//        --module "auth" \
//        --yes

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const STORIES_DIR = join(ROOT, 'docs', 'stories');
const DONE_DIR = join(STORIES_DIR, 'done');
const TEMPLATE = join(STORIES_DIR, '_TEMPLATE.md');
const INDEX = join(ROOT, 'docs', 'STORIES.md');

const VALID_PRIORITIES = ['MVP', 'V2', 'LATER'];

// ---------- helpers ----------

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);
}

function collectExistingIds() {
  const ids = new Set();
  const scan = (dir) => {
    if (!existsSync(dir)) return;
    for (const f of readdirSync(dir)) {
      const m = f.match(/^ST-(\d{3})-/);
      if (m) ids.add(parseInt(m[1], 10));
    }
  };
  scan(STORIES_DIR);
  scan(DONE_DIR);
  return ids;
}

function nextStoryId() {
  const ids = collectExistingIds();
  const max = ids.size ? Math.max(...ids) : 0;
  return `ST-${String(max + 1).padStart(3, '0')}`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--yes' || a === '-y') {
      args.yes = true;
    } else if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        args[key] = next;
        i++;
      } else {
        args[key] = true;
      }
    }
  }
  return args;
}

function printHelp() {
  console.log(`
Usage :
  node scripts/new-story.mjs                 # interactif
  node scripts/new-story.mjs --title "..." --priority MVP [--yes]

Options :
  --title <str>         titre de la story (obligatoire en non-interactif)
  --priority <str>      MVP | V2 | LATER (défaut : MVP)
  --depends-on <str>    dépendances (ex : "ST-001, ST-002" ou "—")
  --screens <str>       écrans concernés (ex : "S01,S02" ou "—")
  --module <str>        module fonctionnel (ex : "auth")
  --yes, -y             skip la confirmation finale
  --help, -h            affiche cette aide
`);
}

// ---------- main ----------

async function main() {
  const cliArgs = parseArgs(process.argv.slice(2));

  if (cliArgs.help || cliArgs.h) {
    printHelp();
    return;
  }

  if (!existsSync(TEMPLATE)) {
    console.error(`❌ Template manquant : ${TEMPLATE}`);
    process.exit(1);
  }
  if (!existsSync(INDEX)) {
    console.error(`❌ Index manquant : ${INDEX}`);
    process.exit(1);
  }

  const id = nextStoryId();

  // Mode non-interactif si --title est fourni
  const nonInteractive = Boolean(cliArgs.title);

  let title, priority, dependsOn, screens, module;

  if (nonInteractive) {
    title = cliArgs.title;
    priority = (cliArgs.priority || 'MVP').toUpperCase();
    dependsOn = cliArgs['depends-on'] || '—';
    screens = cliArgs.screens || '—';
    module = cliArgs.module || '—';
  } else {
    console.log('\n📝 Création d\'une nouvelle story\n');
    console.log(`ID auto-détecté : ${id}`);

    const rl = createInterface({ input, output });
    const ask = async (question, fallback = '') => {
      const suffix = fallback ? ` (${fallback})` : '';
      const answer = (await rl.question(`${question}${suffix} : `)).trim();
      return answer || fallback;
    };

    try {
      title = await ask('Titre court et actionnable');
      priority = (await ask('Priorité [MVP/V2/LATER]', 'MVP')).toUpperCase();
      dependsOn = await ask('Dépend de (ex: ST-001, ST-002)', '—');
      screens = await ask('Écrans concernés (ex: S01, S02)', '—');
      module = await ask('Module fonctionnel concerné', '—');

      if (!title) {
        console.error('❌ Titre obligatoire.');
        rl.close();
        process.exit(1);
      }

      console.log('\nRécapitulatif :');
      console.log(`  ID       : ${id}`);
      console.log(`  Titre    : ${title}`);
      console.log(`  Priorité : ${priority}`);
      console.log(`  Dépend de: ${dependsOn}`);
      console.log(`  Écrans   : ${screens}`);
      console.log(`  Module   : ${module}\n`);

      if (!cliArgs.yes) {
        const confirm = (await ask('Confirmer la création ? [O/n]', 'O')).toLowerCase();
        if (!['o', 'oui', 'y', 'yes'].includes(confirm)) {
          console.log('⛔ Annulé.');
          rl.close();
          return;
        }
      }
    } finally {
      rl.close();
    }
  }

  // Validations
  if (!title) {
    console.error('❌ --title obligatoire en mode non-interactif.');
    process.exit(1);
  }
  if (!VALID_PRIORITIES.includes(priority)) {
    console.error(`❌ Priorité invalide. Choix : ${VALID_PRIORITIES.join(', ')}`);
    process.exit(1);
  }

  const slug = slugify(title);
  if (!slug) {
    console.error('❌ Impossible de générer un slug à partir du titre.');
    process.exit(1);
  }

  const fileName = `${id}-${slug}.md`;
  const filePath = join(STORIES_DIR, fileName);
  const branch = `${id.toLowerCase()}-${slug}`;

  if (existsSync(filePath)) {
    console.error(`❌ ${fileName} existe déjà.`);
    process.exit(1);
  }

  // --- Générer le fichier de story ---
  let content = readFileSync(TEMPLATE, 'utf-8');

  content = content.replace(/^# ST-XXX — .+$/m, `# ${id} — ${title}`);
  content = content.replace(
    /<!-- Copier ce fichier en docs\/stories\/ST-XXX-slug-court\.md pour créer une nouvelle story\. -->\r?\n<!-- Ne JAMAIS éditer ce fichier _TEMPLATE\.md \(il sert de modèle\)\. -->\r?\n\r?\n/,
    ''
  );

  content = content.replace(/^\*\*Statut :\*\*\s+`\[todo\]`.*$/m, `**Statut :**     \`[todo]\``);
  content = content.replace(/^\*\*Priorité :\*\*\s+`\[MVP\]`.*$/m, `**Priorité :**   \`[${priority}]\``);
  content = content.replace(/^\*\*Dépend de :\*\*\s+—.*$/m, `**Dépend de :**  ${dependsOn}`);
  content = content.replace(/^\*\*Écrans :\*\*\s+—.*$/m, `**Écrans :**     ${screens}`);
  content = content.replace(/^\*\*Module :\*\*\s+—.*$/m, `**Module :**     ${module}`);
  content = content.replace(/^\*\*Branche :\*\*\s+`st-XXX-slug`.*$/m, `**Branche :**    \`${branch}\``);
  content = content.replace(/^- YYYY-MM-DD — `\[todo\]` — Story créée$/m, `- ${today()} — \`[todo]\` — Story créée`);

  writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Fichier créé : docs/stories/${fileName}`);

  // --- Insérer la ligne dans STORIES.md ---
  const indexContent = readFileSync(INDEX, 'utf-8');
  const inV2 = priority === 'V2' || priority === 'LATER';
  const startMarker = inV2 ? '<!-- BACKLOG_V2_START -->' : '<!-- BACKLOG_MVP_START -->';
  const endMarker = inV2 ? '<!-- BACKLOG_V2_END -->' : '<!-- BACKLOG_MVP_END -->';

  const startIdx = indexContent.indexOf(startMarker);
  const endIdx = indexContent.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    console.warn(`⚠️  Markers ${startMarker} / ${endMarker} non trouvés dans STORIES.md.`);
    console.warn('   Ajoute manuellement la ligne dans le backlog.');
  } else {
    const before = indexContent.slice(0, endIdx);
    const after = indexContent.slice(endIdx);
    const newRow = `| ${id} | \`[todo]\` | ${title.padEnd(34)} | ${dependsOn.padEnd(9)} | ${screens.padEnd(6)} |\n`;

    // Nettoyer les placeholders d'exemple si présents
    let trimmedBefore = before;
    const placeholderMvp = /\|\s*ST-001\s*\|\s*`\[todo\]`\s*\|\s*\[Titre court et actionnable\][^\n]*\n\|\s*ST-002\s*\|\s*`\[todo\]`\s*\|\s*\[Titre\][^\n]*\n/;
    const placeholderV2 = /\|\s*ST-020\s*\|\s*`\[draft\]`\s*\|\s*\[Titre\][^\n]*\n/;
    if (inV2) {
      trimmedBefore = before.replace(placeholderV2, '');
    } else {
      trimmedBefore = before.replace(placeholderMvp, '');
    }

    const updatedIndex = trimmedBefore + newRow + after;
    writeFileSync(INDEX, updatedIndex, 'utf-8');
    console.log(`✅ Ligne ajoutée dans docs/STORIES.md (section ${inV2 ? 'V2' : 'MVP'})`);
  }

  console.log('\n📋 Prochaines étapes :');
  console.log(`   1. Compléter docs/stories/${fileName} (contexte, tâches, critères, tests)`);
  console.log(`   2. Vérifier la Definition of Ready (commande /ready ou demander à l'agent)`);
  console.log(`   3. Créer la branche Git : git checkout -b ${branch}`);
}

main().catch((err) => {
  console.error('❌ Erreur :', err.message);
  process.exit(1);
});
