import Color from 'tinycolor2';


export const isColorAlphaComposite = (value) => {
    return value.hasOwnProperty('color') && typeof value.alpha === 'number';
}

/**
 * @param {{ color: string, alpha: number }} value
 * @returns tinycolor2 instance
 */
export const transformColorComposite = (value) => {
    const output = Color(value.color);
    if (!output.isValid()) throw new TypeError('Color value is not valid');
    output.setAlpha(value.alpha);
    return output;
}

export default Color