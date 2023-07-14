import { useContext, useEffect, useState } from "react";
import { OptionPx } from "constant"
import { DropDown } from "components/DropDown"
import { AppContext } from "contexts/AppContext";
import { FilterData } from "types";

const FilterDescriptionFont = () => {
    const appContext = useContext(AppContext);
    const { filterData, updateFilterData } = appContext!;

    const [filter, setFilter] = useState<FilterData>(filterData);

    const handleOptionSelectPx = (option: string) => {
        const newData = { ...filter, lengthPx: Number(option) };
        setFilter(newData);
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        const newData = { ...filter, lengthPx: value };
        setFilter(newData);
    };

    useEffect(() => {
        updateFilterData(filter);
    }, [filter]);

    useEffect(() => {
    }, [filterData])

    return (
        <div className='mt-6'>
            <div className='text-[18px] lg:text-[32px] mb-5'>Styles</div>
            <div className="grid lg:flex items-center space-x-5 lg:space-x-[50px]">
                <div className="border-solid border border-[#D8D8D8] rounded-full h-7 lg:h-[50px] flex items-center flex-[2] lg:mb-0 mb-5">
                    <input
                        className="h-[50px] bg-transparent px-2 lg:px-7 outline-none w-full text-[13px] lg:text-base"
                        placeholder="Type here to preview text"
                        value={filter.text.value}
                        onChange={(e) => setFilter({
                            ...filter,
                            text: {
                                type: "Custom",
                                value: e.target.value
                            }
                        })}
                    />
                </div>
                <div className="flex-1 flex">
                    <div className="flex items-center">
                        <DropDown
                            listItem={OptionPx}
                            typeDropDown="text"
                            defaultValue="20"
                            onSelectOption={handleOptionSelectPx}
                            label={filter.lengthPx.toString() + "px"}
                        />
                        <input
                            type="range"
                            className="slider-bar ml-3"
                            min={OptionPx[0]}
                            max={OptionPx[OptionPx.length - 1]}
                            value={filter.lengthPx}
                            onChange={handleSliderChange}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FilterDescriptionFont