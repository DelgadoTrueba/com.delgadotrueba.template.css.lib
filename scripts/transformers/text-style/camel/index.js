import StyleDictionary from 'style-dictionary';
import { camelCase } from "../../../utils/name/camelCase"

StyleDictionary.registerTransform({
    type: 'value',
    name: 'text-style/camel',
    transitive: true,
    matcher: (token) => token.path[0] === 'text-style',
    transformer: function (token) {
        const output = {};
        for (const prop in token.value) {
            output[camelCase(prop)] = token.value[prop];
        }
        return output;
    },
});