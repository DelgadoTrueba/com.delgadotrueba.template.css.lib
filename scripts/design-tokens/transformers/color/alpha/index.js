import StyleDictionary from 'style-dictionary';
import { getColorAlphaTransform } from "../index.js"

/**
 * Handle composite colors with `alpha`, also for "shadow" type
 * e.g. { value: { color: "{core.color.black}", alpha: 0.5 }
 */
StyleDictionary.registerTransform({
  type: 'value',
  name: 'color/alpha',
  transitive: true,
  matcher: (token) =>
    token.original.type === 'color' || token.original.type === 'shadow',
  transformer: getColorAlphaTransform(),
});