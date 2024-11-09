import StyleDictionary from 'style-dictionary';
import {getModularScaleTransform} from "../../modular-scale/index.js"
/**
 * Calculate composite spacing values based on a ratio, and substeps
 */
StyleDictionary.registerTransform({
    type: 'value',
    name: 'modular-scale/px',
    transitive: true,
    matcher: (token) => token.original.type === 'modular-scale',
    transformer: getModularScaleTransform('px'),
});