import React, { useEffect, useState } from "react";

interface DropDownProps {
    listItem?: string[];
    typeDropDown: "text" | "checkbox" | "nothing";
    defaultValue?: string | string[];
    onSelectOption?: (option: string) => void;
    onSelectOptions?: (options: string[]) => void;
    label?: string;
    value?: string | string[];
}

export const DropDown: React.FC<DropDownProps> = React.memo(
    ({
        listItem,
        typeDropDown,
        defaultValue,
        onSelectOption,
        onSelectOptions,
        label,
        value,
    }) => {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedOptions, setSelectedOptions] = useState(defaultValue || []);

        const handleOptionSelect = (option: string) => {
            setSelectedOptions(option);
            setIsOpen(false);
            if (onSelectOption) {
                onSelectOption(option);
            }
        };

        const handleCheckboxChange = (option: string | string[]) => {
            if (!Array.isArray(selectedOptions)) {
                return;
            }

            let updatedOptions: string[];

            if (Array.isArray(option)) {
                updatedOptions = selectedOptions.filter(
                    (item) => !option.includes(item)
                );
            } else {
                updatedOptions = selectedOptions.includes(option)
                    ? selectedOptions.filter((item) => item !== option)
                    : [...selectedOptions, option];
            }

            setSelectedOptions(updatedOptions);
            if (onSelectOptions) {
                onSelectOptions(updatedOptions);
            }
        };

        useEffect(() => { }, [selectedOptions]);

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(".dropdown-container")) {
                setIsOpen(false);
            }
        };

        useEffect(() => {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);


        return (
            <div className="relative flex items-center">
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-md cursor-pointer flex items-center text-[12px] lg:text-[16px] dropdown-container"
                >
                    <>
                        {typeDropDown === "checkbox" && <>{label ? label : value}</>}
                        {typeDropDown === "text" && Array.isArray(value) && (
                            <>{value.length > 0 ? value : label}</>
                        )}
                        {typeDropDown === "text" && !Array.isArray(value) && (
                            <>{value ? value : label}</>
                        )}
                    </>
                    <div className="w-5 h-5">
                        {isOpen ? (
                            <img
                                src="/images/chevron-down.svg"
                                alt="icon chevron-down"
                                className="w-5 h-5 chevron-down-icon ml-1"
                            />
                        ) : (
                            <img
                                src="/images/chevron-up.svg"
                                alt="icon chevron-up"
                                className="w-5 h-5 chevron-up-icon ml-1"
                            />
                        )}
                    </div>
                </div>
                {isOpen && (
                    <>
                        {typeDropDown === "text" && (
                            <div className="absolute border z-30 cursor-pointer bg-[#3c4043] border-transparent -left-3 rounded-md mt-7 shadow-md top-0 max-h-[120px] overflow-y-auto">
                                {listItem?.map((item, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => handleOptionSelect(item)}
                                        className="px-4 py-2 cursor-pointer hover:bg-[#4f5c6e] whitespace-nowrap"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}

                        {typeDropDown === "checkbox" && (
                            <div className="absolute bg-[#3c4043] z-30  border-transparent rounded-md mt-7 -left-3 shadow-md top-0 max-h-[120px] overflow-y-auto p-[5px]">
                                {listItem?.map((item, idx) => (
                                    <div key={idx} className="flex items-center mb-1">
                                        <input
                                            type="checkbox"
                                            checked={value?.includes(item)}
                                            onChange={() => handleCheckboxChange(item)}
                                            className="h-5 w-5 hover:bg-[#4f5c6e] "
                                        />
                                        <span className="ml-2 text-[#E8EAED]">{item}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        );
    }
);
