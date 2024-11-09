import { isColorAlphaComposite, transformColorComposite } from "../../utils/color/index.js"

export const getColorAlphaTransform = (outputMethod = 'toHslString') => {
    return function (token) {
        // Handle `shadow` type
        if (token.original.type === 'shadow' && typeof token.value === 'object') {
            const output = cloneDeep(token.value); // don't want mutation accidents
            const hasCompositeValues = output.some((x) =>
                isColorAlphaComposite(x.color)
            );
            if (hasCompositeValues) {
                try {
                    return output.map((value) =>
                        isColorAlphaComposite(value.color)
                            ? {
                                ...value,
                                color: transformColorComposite(value.color)[outputMethod](),
                            }
                            : value
                    );
                } catch (err) {
                    return token.value;
                }
            }
            return token.value;
        }
        // Handle `color` type
        if (isColorAlphaComposite(token.value)) {
            try {
                return transformColorComposite(token.value)[outputMethod]();
            } catch (err) {
                return token.value;
            }
        }
        // Do nothing
        return token.value;
    };
}