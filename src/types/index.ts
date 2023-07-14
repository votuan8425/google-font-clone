// export type FilterFont = {
//     search: string
//     text: "Sentence" | "Custom" | "Paragrapqh"
//     lengthPx: number
//     categorie: string
//     language: string
//     colorFont?: boolean
//     variableFont?: {
//         show: boolean
//         value: number
//     }
// }

export interface FilterData {
    search: string;
    text: {
        type: string
        value?: string
    };
    lengthPx: number;
    categorie: string[];
    language: string[];
    colorFont?: boolean;
    variableFont?: boolean
}

export interface FontData {
    family: string;
    variants: string[];
    subsets: string[];
    version: string;
    lastModified: string;
    files: {
        [variant: string]: string;
    };
    category: string;
    kind: string;
    menu: string;
}

export interface SelectedFamily {
    family: string
    variants: string[]
}