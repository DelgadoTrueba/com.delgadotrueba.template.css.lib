import StyleDictionary from 'style-dictionary';

import Color, { isColorAlphaComposite, transformColorComposite } from "../../../utils/color/index.js"

/**
 * Handle composite shadow tokens
 */
StyleDictionary.registerTransform({
    type: 'value',
    name: 'shadow/css',
    transitive: true,
    matcher: (token) => token.original.type === 'shadow',
    transformer: (token) => {
        if (typeof token.value === 'string') return token.value;
        const px = (x) => `${x}px`;
        const toCssValue = ({ x, y, blur, spread, color }) => {
            const colorValue = (
                isColorAlphaComposite(color)
                    ? transformColorComposite(color)
                    : Color(color)
            ).toHslString();
            return `${px(x)} ${px(y)} ${px(blur)} ${px(spread)} ${colorValue}`;
        };
        return Array.isArray(token.value)
            ? token.value.map(toCssValue).join(', ')
            : toCssValue(token.value);
    },
});