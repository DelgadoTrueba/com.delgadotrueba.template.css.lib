import StyleDictionary from 'style-dictionary';
const { DEV } = process.env;

import './shared.js';

const configs = await Promise.all(
  process.env.CONFIG.split(',').map((name) => import(`./${name}.config.js`))
);

configs.forEach((configModule) => {
  const config = configModule.default;
  StyleDictionary.extend(config).buildAllPlatforms()
});

console.log({ DEV })


import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const directoryPath = path.join(__dirname, '../../dist/css');

const filesToDelete = [
  'core.css',
  'dt-design-tokens.common.css',
  'dt-design-tokens.common.json',
  'dt-design-tokens.dark.css',
  'dt-design-tokens.dark.json',
  'dt-design-tokens.fonts.json',
  'dt-design-tokens.light.css',
  'dt-design-tokens.light.json'
];

if (!DEV) {
  filesToDelete.forEach(file => {
    const filePath = path.join(directoryPath, file);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file ${file}:`, err);
      } else {
        console.log(`File deleted successfully: ${file}`);
      }
    });
  });
}
