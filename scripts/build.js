import StyleDictionary from 'style-dictionary';

import './shared.js';

const configs = await Promise.all(
  process.env.CONFIG.split(',').map((name) => import(`./${name}.config.js`))
);

configs.forEach((configModule) => {
  const config = configModule.default;
  StyleDictionary.extend(config).buildAllPlatforms()
});
