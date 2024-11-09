import StyleDictionary from 'style-dictionary';

/**
 * Built-in `color/css` transform with different matcher function
 */
StyleDictionary.registerTransform({
    type: 'value',
    name: 'color/css',
    matcher: (token) => token.original.type === 'color',
    transformer: StyleDictionary.transform['color/css'].transformer,
});