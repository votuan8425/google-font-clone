import { FilterData } from "types";

interface GetDataGoogleFontProps {
  filter?: FilterData;
  type_sort?: string;
  query?: string;
}

export const getDataGoogleFont = async ({
  filter,
  type_sort,
  query,
}: GetDataGoogleFontProps) => {
  try {
    const apiKey =
      process.env.REACT_APP_FONT_DEV_API;
    let url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`;

    if (filter?.variableFont) {
      url += `&capability=VF`;
    }

    if (type_sort) {
      url += `&sort=${type_sort.toLowerCase()}`;
    }

    if (query) {
      url += `&family=${query}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
