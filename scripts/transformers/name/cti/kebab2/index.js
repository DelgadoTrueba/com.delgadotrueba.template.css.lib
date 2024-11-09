import StyleDictionary from 'style-dictionary';
import { kebabCase } from "../../../../utils/name/kebabCase/index.js"

StyleDictionary.registerTransform({
    name: 'name/cti/kebab2',
    type: 'name',
    transformer: function (token, options) {
        const name = [options.prefix]
            .concat(token.path)
            .map((x) => x.replace('&', 'and'))
            .join(' ');
        const result = kebabCase(name);
        return result.replace('-x-', '-x');
    },
});
