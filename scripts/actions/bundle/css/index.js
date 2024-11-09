
import fs from 'node:fs'
import StyleDictionary from 'style-dictionary';

const { OUTPUT_BASE_FILENAME } = process.env;

StyleDictionary.registerAction({
    name: 'bundle_css',
    do: async function (_, config) {
        const { buildPath } = config;

        const common = JSON.parse(
            fs.readFileSync(buildPath + OUTPUT_BASE_FILENAME + '.common.json')
        );
        const fonts = JSON.parse(
            fs.readFileSync(buildPath + OUTPUT_BASE_FILENAME + '.fonts.json')
        );
        const lightOnly = JSON.parse(
            fs.readFileSync(buildPath + OUTPUT_BASE_FILENAME + '.light.json')
        );
        const darkOnly = JSON.parse(
            fs.readFileSync(buildPath + OUTPUT_BASE_FILENAME + '.dark.json')
        );
        const data = `:root {
  ${printVariables(common)}

  ${printFonts(fonts)}

  ${printVariables(lightOnly)}
  }
  
  [data-theme="dark"] {
  ${printVariables(darkOnly)}
  }
  
  @media (prefers-color-scheme: dark) {
    :root {
  ${printVariables(darkOnly, '    ')}
    }

    [data-theme="light"] {
  ${printVariables(lightOnly, '    ')}
    }
}`;
        await fs.writeFileSync(buildPath + OUTPUT_BASE_FILENAME + '.all.css', data);
    },
    undo: async function () {
        //
    },
});

function printVariables(json, indentation = '  ') {
    return Object.keys(json)
        .map((key) => {
            const value = json[key];
            return `${indentation}--${key}: ${value};`;
        })
        .join('\n');
}


function printFonts(fonts){

const template = (font) => {
    return `@font-face {
font-family: ${font['font-family']};
src:  ${font.src};
font-weight:  ${font['font-weight']};
font-style:  ${font['font-style']};
}`
}

return (Object.values(fonts) || []).reduce((acc, font) => {
    const fontFace = template(font)
    return `${acc}${fontFace}\n`
}, '')


}