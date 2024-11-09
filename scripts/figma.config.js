const { PREFIX, OUTPUT_PATH, OUTPUT_BASE_FILENAME } = process.env;
import { transform } from '@divriots/style-dictionary-to-figma';
import StyleDictionary from 'style-dictionary';

const figmaPresetTransformGroup = [
    ...StyleDictionary.transformGroup.js,
    'attribute/cti',        // Adds category, type, and item attributes
    'name/cti/kebab',       // Converts names to kebab-case
    'size/rem',             // Converts size values to rem units
    'color/css',            // Converts color values to CSS-compatible formats
    // Your custom transformer
    'modular-scale/px',
    'shadow/css',
    'color/alpha',
    'text-style/css',
    'cubic-bezier/css',
    'size/rem'
];

export default {
    include: ['src/tokens/core/**/*.json5'],
    source: [
        'src/tokens/semantic/**/*.json5'
    ],
    format: {
        figmaTokensPlugin: ({ dictionary }) => {
            const transformedTokens = transform(dictionary.tokens);
            return JSON.stringify(transformedTokens, null, 2);
        },
    },
    platforms: {
        json: {
            transforms: ['theme-light', ...figmaPresetTransformGroup],
            prefix: PREFIX,
            buildPath: OUTPUT_PATH + 'figma/',
            files: [
                {
                    destination: OUTPUT_BASE_FILENAME + '-figma.json',
                    format: 'figmaTokensPlugin',
                },
            ],
        },
    },
}
