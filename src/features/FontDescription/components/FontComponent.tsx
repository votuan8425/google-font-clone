import React from "react";
import { FilterData, FontData } from "types";

interface FontComponentProps {
    font: FontData;
    filterData: FilterData;
}

export const FontComponent: React.FC<FontComponentProps> = ({
    font,
    filterData,
}) => {
    const fontStyles = Object.entries(font.files).map(([variant, url]) => {
        if (variant === 'regular') {
            const fileExtension = url.split('.').pop();
            const format = fileExtension === 'ttf' ? 'truetype' : 'opentype';
            return `
            @font-face {
              font-family: '${font.family}';
              src: url('${url}') format('${format}');
              font-weight: ${variant};
              font-style: normal;
            }
          `;
        }
        return '';
    });


    const fontFaces = fontStyles.join("");

    return (
        <div
            style={{
                fontSize: filterData.lengthPx + "px",
                fontFamily: font.family,
            }}
        >
            <style>{fontFaces}</style>
            {filterData.text.type === "Sentence" && (
                <span
                    style={{
                        fontFamily: font.family,
                        fontWeight: "normal",
                        fontStyle: "normal",
                    }}
                >
                    Whereas disregard and contempt for human rights have resulted
                </span>
            )}
            {filterData.text.type === "Paragraph" && (
                <span
                    style={{
                        fontFamily: font.family,
                        fontWeight: "normal",
                        fontStyle: "normal",
                    }}
                >
                    No one shall be subjected to arbitrary arrest, detention or exile.
                    Everyone is entitled in full equality to a fair and public hearing by
                    an independent and impartial tribunal, in the determination of his
                    rights and obligations and of any criminal charge against him. No one
                    shall be subjected to arbitrary interference with his privacy, family,
                    home or correspondence, nor to attacks upon his honour and reputation.
                    Everyone has the right to the protection of the law against such
                    interference or attacks.
                </span>
            )}
            {filterData.text.type === "Custom" && (
                <span
                    style={{
                        fontFamily: font.family,
                        fontWeight: "normal",
                        fontStyle: "normal",
                    }}
                >
                    {filterData.text.value}
                </span>
            )}
        </div>
    );
};
