import { useContext, useEffect, useState } from "react";
import { AppContext } from "contexts/AppContext";
import { getDataGoogleFont } from "api";
import { DropDown } from "components/DropDown";
import { SORT_FONT } from "constant";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontData } from "types";
import { formatCategorie, formatLanguage } from "utils";
import { Link } from "react-router-dom";
import { FontComponent } from "features/FontDescription/components/FontComponent";

const ListFont = () => {
    const appContext = useContext(AppContext);
    const { filterData } = appContext!;

    const [sort, setSort] = useState("Trending");
    const [fonts, setFonts] = useState<FontData[]>([]);
    const [visibleFonts, setVisibleFonts] = useState<FontData[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        const res = await getDataGoogleFont({ filter: filterData, type_sort: sort });
        if (res && res.items) {
            setFonts(res.items);
        }
    };

    const handleOptionSelectSort = (option: string) => {
        let format = ""
        if (option === "Most popular") {
            format = "popularity"
        }
        if (option === "Newest") {
            format = "date"
        }
        if (option === "Name") {
            format = "alpha"
        }
        if (option === "Trending") {
            format = "trending"
        }
        setSort(format);
    };

    useEffect(() => {
        getData();
    }, [filterData, sort]);

    useEffect(() => {
        setVisibleFonts(filterFonts(fonts).slice(0, page * 25));
    }, [fonts, filterData, page]);

    const filterFonts = (fontList: FontData[]): FontData[] => {
        let filteredFonts = [...fontList];
        if (filterData.search) {
            filteredFonts = filteredFonts.filter((font) => {
                return font.family
                    .toLowerCase()
                    .includes(filterData.search.toLowerCase());
            });
        }

        if (filterData.categorie) {
            filteredFonts = filteredFonts.filter((font) => {
                for (let filter of filterData.categorie) {
                    if (font.category === formatCategorie(filter)) {
                        return true;
                    }
                }
                return false;
            });
        }

        if (filterData.language[0] !== "All languages") {
            if (filterData.language.length > 0) {
                filteredFonts = filteredFonts.filter((font) => {
                    for (let sub of font.subsets) {
                        if (sub === formatLanguage(filterData.language[0])) {
                            return true;
                        }
                    }
                    return false;
                });
            }
        }
        return filteredFonts;
    };

    const loadMore = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setPage((prevPage) => prevPage + 1);
        setIsLoading(false);
    };

    useEffect(() => { }, [visibleFonts]);

    return (
        <div className="mt-8">
            <div className="flex justify-between mb-5">
                <div className="text-[12px]">
                    {filterFonts(fonts).length} of {fonts.length} families
                </div>
                <DropDown
                    listItem={SORT_FONT}
                    typeDropDown="text"
                    defaultValue="8"
                    onSelectOption={handleOptionSelectSort}
                    label={"Sort by: " + sort.toString()}
                />
            </div>
            <InfiniteScroll
                dataLength={visibleFonts.length}
                next={loadMore}
                hasMore={visibleFonts.length < fonts.length}
                loader=""
                endMessage={<p></p>}
            >
                <div className="flex flex-wrap gap-5">
                    {visibleFonts.map((font) => (
                        <Link to={`specimen/${font.family}`} key={font.family}>
                            <div

                                className="overflow-hidden border border-[#5f6368] rounded-md p-4 w-[200px] lg:w-[464px] h-[300px] hover:bg-[#303134] cursor-pointer"
                            >
                                <div className="flex justify-between mb-6">
                                    <div>
                                        <div className="text-[18px] mb-1">{font.family}</div>
                                        <div className="text-[14px]">Category: {font.category}</div>
                                        <div className="text-[14px]">
                                            Subsets: {font.subsets.join(" ,")}
                                        </div>
                                    </div>
                                    <div className="text-[12px]">{font.variants.length} styles</div>
                                </div>
                                <FontComponent font={font} filterData={filterData} />

                            </div>
                        </Link>
                    ))}
                </div>
            </InfiniteScroll>
            {isLoading && (
                <div className="flex justify-center mt-5">
                    <div className="spinner-container">
                        <div className="loading-spinner"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListFont;
