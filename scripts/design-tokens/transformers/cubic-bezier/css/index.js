import StyleDictionary from 'style-dictionary';

/**
 * Transform motion array value [0.4, 0, 0.6, 1] to string "cubic-bezier(0.4, 0, 0.6, 1)"
 */
StyleDictionary.registerTransform({
    type: 'value',
    name: 'cubic-bezier/css',
    matcher: (token) => token.original.type === 'cubic-bezier',
    transformer: function (token) {
        return `cubic-bezier(${String(token.original.value)})`;
    },
});
