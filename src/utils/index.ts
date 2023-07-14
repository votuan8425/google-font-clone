import { SelectedFamily } from "types";

export const formatCategorie = (text: string): string => {
    if (text === "Sans Serif") {
        return "sans-serif";
    }
    return text.toLowerCase();
};

export const formatLanguage = (text: string): string => {
    if (text === "Chinese (Hong Kong)") {
        return "chinese-hongkong";
    }
    if (text === "Chinese (Traditional)") {
        return "chinese-traditional";
    }
    if (text === "Chiese (Simplified)") {
        return "chinese-simplified";
    }
    if (text === "Greek Extended") {
        return "greek-ext";
    }
    if (text === "Latin Extended") {
        return "latin-ext";
    }
    if (text === "Cyrillic Extended") {
        return "cyrillic-ext";
    }

    return text.toLowerCase();
};

export const formatFontWeight = (weight: string) => {
    const formattedWeights: { [key: string]: string } = {
        '100': 'Thin 100',
        '100italic': 'Thin 100 Italic',
        '200': 'ExtraLight 200',
        '200italic': 'ExtraLight 200 Italic',
        '300': 'Light 300',
        '300italic': 'Light 300 Italic',
        'regular': 'Regular 400',
        'italic': 'Regular 400 Italic',
        '500': 'Medium 500',
        '500italic': 'Medium 500 Italic',
        '600': 'Semibold 600',
        '600italic': 'Semibold 600 Italic',
        '700': 'Bold 700',
        '700italic': 'Bold 700 Italic',
        '800': 'ExtraBold 800',
        '800italic': 'ExtraBold 800 Italic',
        '900': 'Black 900',
        '900italic': 'Black 900 Italic',
    };

    return formattedWeights[weight] || weight;
};


export const generateFontLink = (fonts: SelectedFamily[]) => {
    const fontLinks = fonts.map((font) => {
        const sortedVariants = [...font.variants].sort((a, b) => {
            const fontWeightA = parseInt(a.match(/\d+/)?.[0] || "400");
            const fontWeightB = parseInt(b.match(/\d+/)?.[0] || "400");
            const fontStyleA = a.includes("italic") ? 1 : 0;
            const fontStyleB = b.includes("italic") ? 1 : 0;
            if (fontStyleA !== fontStyleB) {
                return fontStyleA - fontStyleB;
            } else {
                return fontWeightA - fontWeightB;
            }
        });

        let fontLink = `family=${font.family.replace(/\s+/g, "+")}`;
        if (sortedVariants.length > 0) {
            if (sortedVariants.some((variant) => variant.endsWith("italic"))) {
                fontLink += ":ital";
            }
            const fontWeights = sortedVariants.map((variant) => {
                if (variant === "regular") {
                    return "0,400";
                } else if (variant === "italic") {
                    return "1,400";
                } else {
                    const fontWeight = variant.match(/\d+/)?.[0] || "400";
                    const fontStyle = variant.includes("italic") ? "1" : "0";
                    return `${fontStyle},${fontWeight}`;
                }
            });
            if (sortedVariants.some((variant) => variant !== "regular" && !variant.endsWith("italic"))) {
                fontLink += `,wght@${fontWeights.join(";")}`;
            }
        }

        return fontLink;
    });

    return `
        <link href="https://fonts.googleapis.com/css2?${fontLinks.join(
        "&"
    )}&display=swap" rel="stylesheet">
      `;
};

export const generateFontImport = (fonts: SelectedFamily[]) => {
    let fontLinks = fonts.map((font) => {
        const sortedVariants = [...font.variants].sort((a, b) => {
            const fontWeightA = parseInt(a.match(/\d+/)?.[0] || "400");
            const fontWeightB = parseInt(b.match(/\d+/)?.[0] || "400");
            const fontStyleA = a.includes("italic") ? 1 : 0;
            const fontStyleB = b.includes("italic") ? 1 : 0;
            if (fontStyleA !== fontStyleB) {
                return fontStyleA - fontStyleB;
            } else {
                return fontWeightA - fontWeightB;
            }
        });

        let fontLink = `${font.family.replace(/\s+/g, "+")}`;
        if (sortedVariants.length > 0) {
            if (sortedVariants.some((variant) => variant.endsWith("italic"))) {
                fontLink += ":ital";
            }
            const fontWeights = sortedVariants.map((variant) => {
                if (variant === "regular") {
                    return "0,400";
                } else if (variant === "italic") {
                    return "1,400";
                } else {
                    const fontWeight = variant.match(/\d+/)?.[0] || "400";
                    const fontStyle = variant.includes("italic") ? "1" : "0";
                    return `${fontStyle},${fontWeight}`;
                }
            });
            if (sortedVariants.some((variant) => variant !== "regular" && !variant.endsWith("italic"))) {
                fontLink += `,wght@${fontWeights.join(";")}`;
            }
        }

        return fontLink;
    });

    return `
          @import url('https://fonts.googleapis.com/css2?family=${fontLinks.join(
        "&family="
    )}&display=swap');
      `;
};
