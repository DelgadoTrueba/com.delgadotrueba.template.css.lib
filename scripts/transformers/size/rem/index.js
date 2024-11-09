import StyleDictionary from 'style-dictionary';

StyleDictionary.registerTransform({
    type: 'value',
    name: 'size/rem',
    matcher: (token) =>
        token.original.type === 'dimension' &&
        token.original.value.indexOf('px') > -1,
    transformer: function (token) {
        return `${parseFloat(token.original.value) / 16}rem`;
    },
});