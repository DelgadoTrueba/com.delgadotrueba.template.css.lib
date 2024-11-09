import StyleDictionary from 'style-dictionary';

/**
 * Text styles for CSS using the `font` shorthand
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font
 *
 * it must include values for: <font-size>, <font-family>
 * it may optionally include values for: <font-style>, <font-variant>, <font-weight>, <font-stretch>, <line-height>
 *
 * - font-style, font-variant and font-weight must precede font-size
 * - font-variant may only specify the values defined in CSS 2.1, that is normal and small-caps
 * - font-stretch may only be a single keyword value.
 * - line-height must immediately follow font-size, preceded by "/", like this: "16px/3"
 * - font-family must be the last value specified.
 */
StyleDictionary.registerTransform({
    type: 'value',
    name: 'text-style/css',
    transitive: true,
    matcher: (token) => token.path[0] === 'text-style',
    transformer: function (token) {
        const x = token.value;
        return `${x['font-weight']} ${x['font-size']}/${x['line-spacing']} ${x['font-family']}`;
    },
});