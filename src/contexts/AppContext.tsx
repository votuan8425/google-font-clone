import React, { createContext, useState } from 'react';
import { FilterData, SelectedFamily } from 'types';
import { INIT_FILTER } from 'constant';

export interface AppContextProps {
    filterData: FilterData;
    updateFilterData: (newFilter: FilterData) => void;
    selectedFamily: SelectedFamily[]
    updatedSelectedFamily: (newSelected: SelectedFamily[]) => void
}

interface AppContextProviderProps {
    children: React.ReactNode;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [filterData, setFilterData] = useState<FilterData>(INIT_FILTER);

    const updateFilterData = (newFilter: FilterData) => {
        setFilterData((prevData) => ({
            ...prevData,
            ...newFilter
        }));
    };

    const [selectedFamily, setSelectFamily] = useState<SelectedFamily[]>([])

    const updatedSelectedFamily = (newSelected: SelectedFamily[]) => {
        setSelectFamily(newSelected);
    };

    return (
        <AppContext.Provider value={{ filterData, updateFilterData, selectedFamily, updatedSelectedFamily }}>
            {children}
        </AppContext.Provider>
    );
};
