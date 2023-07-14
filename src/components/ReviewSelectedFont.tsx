import { useContext, useEffect, useState } from "react"
import { SelectedFamily } from "types";
import { formatFontWeight } from "utils";
import { AppContext } from "contexts/AppContext";

interface ReviewSelectedFontProps {
    selectedFont: SelectedFamily
}

const ReviewSelectedFont: React.FC<ReviewSelectedFontProps> = ({ selectedFont }) => {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const appContext = useContext(AppContext);
    const { updatedSelectedFamily, selectedFamily } = appContext!;

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleRemoveFontName = (fontName: string, variant: string) => {
        const existingFontIndex = selectedFamily.findIndex(font => font.family === fontName);
        if (existingFontIndex !== -1) {
            const existingFont = selectedFamily[existingFontIndex];
            const variantIndex = existingFont.variants.indexOf(variant);
            if (variantIndex !== -1) {
                existingFont.variants.splice(variantIndex, 1);
                if (existingFont.variants.length === 0) {
                    updatedSelectedFamily(selectedFamily.filter((_, index) => index !== existingFontIndex));
                } else {
                    updatedSelectedFamily([...selectedFamily]);
                }
            }
        }
    };

    useEffect(() => {

    }, [selectedFamily])

    return (
        <>
            {selectedFont && (
                <div className="border border-[#5f6368] rounded-lg p-[6px_10px] lg:p-[12px_24px] hover:bg-[#38393c] cursor-pointer mt-2" >
                    <div className="flex items-center justify-between" onClick={handleOpen}>
                        <div className="text-[#8ab4f8] text-lg"> {selectedFont.family}</div>
                        <div>
                            {isOpen ? <img src="/images/chevron-down.svg" alt="icon chevron-down" className="w-5 h-5 chevron-down-icon" />
                                : <img src="/images/chevron-up.svg" alt="icon chevron-up" className="w-5 h-5 chevron-up-icon" />
                            }
                        </div>
                    </div>
                    {selectedFont.variants && selectedFont.variants.map((item, index) => (
                        <div key={index}
                            className={`transition-all duration-[100ms] ${isOpen ? "max-h-96 mt-3 " : "max-h-0 overflow-hidden"
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>{formatFontWeight(item)}</div>
                                <div onClick={() => handleRemoveFontName(selectedFont.family, item)}>
                                    <img
                                        src="/images/circle-minus.svg"
                                        alt="icon ccircle-minus"
                                        className="w-5 h-5 circle-minus-icon"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default ReviewSelectedFont