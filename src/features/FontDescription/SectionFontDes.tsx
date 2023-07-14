import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FontData, SelectedFamily } from "types";
import { AppContext } from "contexts/AppContext";
import FilterDescriptionFont from "./components/FilterDescriptionFont";
import { getDataGoogleFont } from "api";
import { formatFontWeight } from "utils";

const SectionFontDes = () => {
    const { fontFamily } = useParams();
    const [font, setFont] = useState<FontData>();

    const appContext = useContext(AppContext);
    const { filterData, selectedFamily, updatedSelectedFamily } = appContext!;

    const [fontSelected, setFontSelected] = useState<SelectedFamily[]>(selectedFamily)

    const handleSelectedFont = (fontName: string, variant: string) => {
        setFontSelected(prevFonts => {
            if (Array.isArray(prevFonts)) {
                const existingFontIndex = prevFonts.findIndex(font => font.family === fontName);
                if (existingFontIndex !== -1) {
                    const existingFont = prevFonts[existingFontIndex];
                    const variantIndex = existingFont.variants.indexOf(variant);
                    if (variantIndex === -1) {
                        existingFont.variants.push(variant);
                        return [...prevFonts];
                    } else {
                        existingFont.variants.splice(variantIndex, 1);
                        if (existingFont.variants.length === 0) {
                            return prevFonts.filter((_, index) => index !== existingFontIndex);
                        } else {
                            return [...prevFonts];
                        }
                    }
                } else {
                    return [...prevFonts, { family: fontName, variants: [variant] }];
                }
            }
            return prevFonts;
        });
    };



    useEffect(() => {
        if (fontSelected && updatedSelectedFamily) {
            updatedSelectedFamily(fontSelected);
        }
    }, [fontSelected]);

    const getData = async () => {
        const res = await getDataGoogleFont({ query: fontFamily });
        if (res && res.items) {
            setFont(res.items[0]);
        }
    };

    useEffect(() => {
        getData();
    }, []);




    const fontStyles = Object.entries(font?.files || {}).map(([variant, url]) => {
        const fileExtension = url.split(".").pop();
        const format = fileExtension === "ttf" ? "truetype" : "opentype";
        const fontWeight = variant.match(/\d+/)?.[0] || "normal";
        const fontStyle = variant.includes("italic") ? "italic" : "normal";
        return `
      @font-face {
        font-family: '${font?.family}';
        src: url('${url}') format('${format}');
        font-weight: ${fontWeight};
        font-style: ${fontStyle};
      }
    `;
    });
    const fontFaces = fontStyles.join("");

    const fontSize = `${filterData.lengthPx}px`;

    return (
        <div className="p-3 lg:p-[50px] h-full">
            <style>{fontFaces}</style>
            <div className="flex space-x-2 items-center">
                <Link to="/" className="text-[#8ab4f8] text-[23px]">Google Font</Link>
                <img src="/images/chevron-right.svg" alt="" className="w-5 h-5 circle-minus-icon" />
                <div className="text-[36px]"> {fontFamily}</div>
            </div>
            <FilterDescriptionFont />
            <div className="mt-5">
                {font?.variants.map((item, index) => {
                    const fontWeight = item.match(/\d+/)?.[0] || "normal";

                    const fontStyle = {
                        fontWeight,
                        fontFamily: font?.family,
                        fontStyle: item.includes("italic") ? "italic" : "normal",
                        fontSize: fontSize,
                    };

                    return (
                        <div
                            className={`grid lg:flex lg:justify-between items-center p-[16px_20px_16px] border-b border-[#5f6368] 
              ${index === 0 ? "border-t" : ""}`}
                            key={item}
                        >
                            <div className="overflow-hidden flex-[10] max-h-[200px]">
                                <div className="text-[#9aa0a6] mb-5 text-sm">
                                    {formatFontWeight(item)}
                                </div>
                                <div style={fontStyle}>
                                    {filterData.text.value ? filterData.text.value : "Whereas recognition of the inherent dignity"}
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 justify-center mt-5 lg:mt-0">

                                {fontSelected.find(selectedFont => selectedFont.family === font.family && selectedFont.variants.includes(item)) ? (
                                    <>
                                        <div className="text-[#aecbfa] text-[14px] cursor-pointer " onClick={() => handleSelectedFont(font.family, item)}>
                                            Remove {formatFontWeight(item)}
                                        </div>
                                        <img
                                            src="/images/circle-minus.svg"
                                            alt="icon circle-minus"
                                            className="w-5 h-5 circle-minus-icon"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <div className="text-[#aecbfa] text-[14px] cursor-pointer" onClick={() => handleSelectedFont(font.family, item)}>
                                            Select {formatFontWeight(item)}
                                        </div>
                                        <img
                                            src="/images/circle-plus.svg"
                                            alt="icon circle-plus"
                                            className="w-5 h-5 circle-minus-icon"
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SectionFontDes;
