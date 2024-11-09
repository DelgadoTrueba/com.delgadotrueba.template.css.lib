import StyleDictionary from 'style-dictionary';

StyleDictionary.registerTransform({
    type: 'value',
    name: 'theme-light',
    transitive: true,
    transformer: function (token) {
        if (token.value?.light != null) {
            return token.value.light;
        }
        return token.value;
    },
})