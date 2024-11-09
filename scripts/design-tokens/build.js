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
  'dt-theme.common.css',
  'dt-theme.common.json',
  'dt-theme.dark.css',
  'dt-theme.dark.json',
  'dt-theme.fonts.json',
  'dt-theme.light.css',
  'dt-theme.light.json'
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
