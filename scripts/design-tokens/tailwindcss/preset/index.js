import StyleDictionary from 'style-dictionary';
import prettier from 'prettier';
import deep from 'deep-get-set';
import { kebabCase } from '../../utils/name/kebabCase/index.js';

/**
 * Custom formatter for Tailwind CSS config preset
 */
StyleDictionary.registerFormat({
  name: 'tailwindcss/preset',
  formatter: function ({ dictionary, file }) {
    const _tokens = {};
    const header = StyleDictionary.formatHelpers.fileHeader({ file });
    deep.p = true;

    dictionary.allTokens
      .filter((token) => token.path[0] !== 'core')
      .map(remapConfigKeys)
      .map(patchSpacingKeys)
      .map(patchStandardToDefault)
      .forEach((token) => {
        deep(
          _tokens,
          token.configKeys,
          `var(--${token.name.replace('.', '-')})`
        );
      });

    const tokensExtend = {
      ..._tokens,
    };
    delete tokensExtend.colors;
    delete tokensExtend.spacing;

    const rawSource = `
        ${header}
  
        const plugin = require('tailwindcss/plugin');
  
        /**
         * Flatten shadow keys similarly to
         * \`flattenColorPalette\` utility function used by core color plugins
         */
        const flattenShadows = (shadows) =>
          Object.assign(
            {},
            ...Object.entries(shadows ?? {}).flatMap(([shadow, values]) =>
              typeof values == 'object'
                ? Object.entries(flattenShadows(values)).map(([name, value]) => ({
                    [shadow + (name === 'DEFAULT' ? '' : '-' + name)]: value,
                  }))
                : [{ [shadow]: values }]
            )
          )
  
        module.exports =
          {
            theme: {
              colors:  ${JSON.stringify(_tokens.colors)},
              spacing:  ${JSON.stringify(_tokens.spacing)},
              extend: ${JSON.stringify(tokensExtend)}
            },
            plugins: [
              /**
               * Custom plugin to convert \`text-style\` design token to the \`font\` css shorthand property
               * as there is no mapping provided by the core plugins.
               */
              plugin(function ({ matchUtilities, theme }) {
                matchUtilities(
                  {
                    'text-style': (value) => ({
                      font: value,
                    }),
                  },
                  { values: theme('textStyle') }
                );
              }),
              /**
               * Custom plugin to convert \`shadow\` design token to the \`boxShadow\` css shorthand property
               * and to avoid functionality of core Tailwind CSS plugins (\`boxShadow\` and \`boxShadowColor\`).
               */
               plugin(function ({ matchUtilities, theme }) {
                matchUtilities(
                  {
                    shadow: (value) => ({
                      boxShadow: value,
                    }),
                  },
                  { values: flattenShadows(theme('shadow')) }
                );
              }),
            ],
            corePlugins: {
              boxShadow: false,
              boxShadowColor: false,
            },
          };
      `;

    return prettier.format(rawSource, {
      parser: 'babel',
      singleQuote: true,
    });
  },
});

/**
 * Configuration of mappings of the start of the original paths
 * to the generated Tailwind CSS config key names
 */
const mappings = [
  // { original: ['color', 'text-icon'], tailwindcss: ['colors', 'text-&-icon'] },
  { original: ['text-and-icon'], tailwindcss: ['colors', 'text-&-icon'] },
  { original: ['color'], tailwindcss: ['colors'] },
  { original: ['line-weight'], tailwindcss: ['borderWidth'] },
  { original: ['motion', 'duration'], tailwindcss: ['transitionDuration'] },
  { original: ['motion', 'easing'], tailwindcss: ['transitionTimingFunction'] },
  { original: ['radius'], tailwindcss: ['borderRadius'] },
  { original: ['typography', 'font-size'], tailwindcss: ['fontSize'] },
  { original: ['typography', 'font-family'], tailwindcss: ['fontFamily'] },
  { original: ['typography', 'font-weight'], tailwindcss: ['fontWeight'] },
  { original: ['typography', 'line-spacing'], tailwindcss: ['lineHeight'] },
  { original: ['size'], tailwindcss: ['spacing'] },
  {
    original: ['typography', 'letter-spacing'],
    tailwindcss: ['letterSpacing'],
  },
  { original: ['text-style'], tailwindcss: ['textStyle'] },
];

/**
 * Helper function to remap token path from original names
 * to config key names that are used by core Tailwind CSS plugins
 */
function remapConfigKeys(token) {
  token.configKeys = token.path.map(kebabCase);
  for (const { original, tailwindcss } of mappings) {
    if (token.configKeys.join().startsWith(original.join())) {
      token.configKeys.splice(0, original.length, ...tailwindcss);
    }
  }
  return token;
}

/**
 * Helper function to flatten spacing keys.
 * Additionally transforms `componsition/space-{n}` into `{n}`
 */
function patchSpacingKeys(token) {
  if (token.path[0] === 'spacing' || token.path[0] === 'size') {
    token.configKeys = token.path.includes('composition')
      ? [token.configKeys[0], parseInt(token.path.at(-1).split('-').at(-1), 10)]
      : [token.configKeys[0], token.configKeys.slice(1).join('-')];
  }
  return token;
}

/**
 * Helper function to patch `standard` keys to `DEFAULT`
 */
function patchStandardToDefault(token) {
  if (token.path.at(-1) === 'standard' && token.path[0] !== 'size') {
    token.configKeys[token.configKeys.length - 1] = 'DEFAULT';
  }
  if (token.path.at(-1) === " " && token.path[0] !== 'size') {
    token.configKeys[token.configKeys.length - 1] = 'DEFAULT';
  }
  return token;
}
