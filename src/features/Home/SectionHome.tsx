import { useContext, useEffect } from "react";
import { FilterBar } from "./components/FilterBar"
import ListFont from "./components/ListFont"
import { AppContext } from "contexts/AppContext";

const SectionHome = () => {
    const appContext = useContext(AppContext);
    const { filterData, updateFilterData } = appContext!;

    useEffect(() => {
        // Update URL parameters
        const dataFilter = {
            search: filterData.search,
            type: filterData.text.type,
            value: filterData.text.value || '',
            lengthPx: filterData.lengthPx.toString(),
            category: filterData.categorie.join(','),
            subset: filterData.language.length > 0 ? filterData.language[0] : '',
            variableFont: filterData.variableFont ? filterData.variableFont.toString() : ''
        };

        const params = new URLSearchParams();

        Object.entries(dataFilter).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            }
        });

        const url = new URL(window.location.href);
        url.search = params.toString();
        window.history.replaceState({}, '', url.href);
    }, [filterData, updateFilterData]);



    return (
        <>
            <FilterBar />
            <ListFont />
        </>
    )
}

export default SectionHome