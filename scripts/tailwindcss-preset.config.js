const { PREFIX, OUTPUT_PATH, OUTPUT_BASE_FILENAME } = process.env;
import StyleDictionary from 'style-dictionary';

const tailwindcssPresetTransformGroup = [
  ...StyleDictionary.transformGroup.js,
  'attribute/cti',
  'name/cti/kebab2',
];

export default {
  include: ['src/tokens/core/**/*.json5'],
  source: ['src/tokens/semantic/**/*.json5'],
  platforms: {
    tailwindcssPreset: {
      transforms: [...tailwindcssPresetTransformGroup],
      prefix: PREFIX,
      buildPath: OUTPUT_PATH + 'tailwindcss-preset/',
      files: [
        {
          destination: OUTPUT_BASE_FILENAME + '.config.js',
          format: 'tailwindcss/preset',
          options: {
            fileHeader: 'tailwindcss/preset-header',
          },
          filter: (token) =>
            !token.path.includes('private') &&
            token.original?.type !== 'textFace',
        },
      ],
    },
  },
};
