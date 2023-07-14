import React, { useContext, useEffect, useState } from "react";
import { FilterData } from "types";
import { INIT_CATEGORIES, INIT_FILTER, INIT_LANGUAGE, OptionPx, OptionText } from "constant";
import { DropDown } from "components/DropDown";
import { AppContext } from "contexts/AppContext";


export const FilterBar = () => {
  const appContext = useContext(AppContext);
  const { filterData, updateFilterData } = appContext!;

  const [filter, setFilter] = useState<FilterData>(filterData);

  const handleOptionSelectText = (option: string) => {
    const newData = {
      ...filter,
      text: {
        type: option,
      },
    };
    setFilter(newData);
  };

  const handleOptionSelectPx = (option: string) => {
    const newData = { ...filter, lengthPx: Number(option) };
    setFilter(newData);
  };

  const handleOptionSelectCategorie = (option: string[]) => {
    const newData = { ...filter, categorie: option };
    setFilter(newData);
  };

  const handleOptionSelectLanguage = (option: string) => {
    const newData = { ...filter, language: [option] };
    setFilter(newData);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...filter, variableFont: e.target.checked };
    setFilter(newData);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const newData = { ...filter, lengthPx: value };
    setFilter(newData);
  };

  const handleReSetFilter = () => {
    updateFilterData(INIT_FILTER)
    setFilter(INIT_FILTER)
  }

  useEffect(() => {
    updateFilterData(filter);
  }, [filter]);

  useEffect(() => {
  }, [updateFilterData, filterData]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const search = params.get("search");
    const type = params.get("type");
    const value = params.get("value");
    const lengthPx = params.get("lengthPx");
    const categories = params.get("category")?.split(",") || [];
    const language = params.get("subset") ? [params.get("subset")!] : [];
    const variableFont = params.get("variableFont") === "true";

    const newFilterData = {
      search: search || filterData.search,
      text: {
        type: type || filterData.text.type,
        value: value || filterData.text.value,
      },
      lengthPx: lengthPx ? parseInt(lengthPx, 10) : filterData.lengthPx,
      categorie: categories.length > 0 ? categories : filterData.categorie,
      language: language.length > 0 ? language : filterData.language,
      variableFont: variableFont || filterData.variableFont,
    };
    setFilter(newFilterData)
    updateFilterData(newFilterData);
  }, []);

  return (
    <div>
      <div className="border-solid border border-[#D8D8D8] rounded-md lg:rounded-full lg:h-[50px] grid lg:flex items-center px-5 lg:px-0">
        <div className="p-[12px] flex space-x-3 items-center flex-1">
          <img
            src="/images/search.svg"
            alt="icon search"
            className="w-5 h-5 search-icon"
          />
          <input
            placeholder="Search fonts"
            className="outline-none text-lg bg-transparent w-full"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
        </div>
        <div className="lg:flex-1 flex items-center mb-3 lg:mb-0">
          <DropDown
            listItem={OptionText}
            typeDropDown="text"
            onSelectOption={handleOptionSelectText}
            label={filter.text.type}
          />
          <input
            placeholder="Type something"
            className="outline-none text-lg bg-transparent ml-3"
            value={filter.text.value}
            onChange={(e) =>
              setFilter({
                ...filter,
                text: {
                  type: "Custom",
                  value: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="lg:flex-1 flex items-center mb-3 lg:mb-0">
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
        <div className="flex-none pr-3">
          <img
            onClick={handleReSetFilter}
            src="/images/reload.svg"
            alt="icon reload"
            className="w-5 h-5 reload-icon cursor-pointer"
          />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-5 items-center">
        <div className="border border-[#D8D8D8] p-[3px_7px] lg:p-[7px_12px] rounded-full ">
          <DropDown
            listItem={INIT_CATEGORIES}
            typeDropDown="checkbox"
            defaultValue={filter.categorie}
            label="Categories"
            value={filter.categorie}
            onSelectOptions={handleOptionSelectCategorie}
          />
        </div>
        <div className="border border-[#D8D8D8] p-[3px_7px] lg:p-[7px_12px] rounded-full ">
          <DropDown
            listItem={INIT_LANGUAGE}
            label="Language"
            typeDropDown="text"
            onSelectOption={handleOptionSelectLanguage}
            value={filter.language}
          />
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={filter.variableFont}
            onChange={handleCheckboxChange}
          />
          <span className="ml-2 text-[#E8EAED]">Show only variable fonts</span>
          <img
            src="/images/help-circle.svg"
            alt="icon help-circle"
            className="w-7 h-7 help-circle-icon cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
