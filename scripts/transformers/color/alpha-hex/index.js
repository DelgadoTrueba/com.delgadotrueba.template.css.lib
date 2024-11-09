import StyleDictionary from 'style-dictionary';
import { getColorAlphaTransform } from "../index.js"
/**
 * Handle composite colors with `alpha`, return hex8
 */
StyleDictionary.registerTransform({
    type: 'value',
    name: 'color/alpha-hex',
    transitive: true,
    matcher: (token) =>
        token.original.type === 'color' || token.original.type === 'shadow',
    transformer: getColorAlphaTransform('toHex8String'),
});