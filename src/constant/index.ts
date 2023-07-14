import { FilterData } from "types"

export const INIT_CATEGORIES = ['Serif', 'Sans Serif', 'Display', 'Handwriting', 'Monospace']
export const INIT_LANGUAGE = ['All languages', 'Arabic', 'Bengali', 'Chinese (Hong Kong)', 'Chinese (Traditional)', 'Chiese (Simplified)', 'Cyrillic', 'Cyrillic Extended', 'Devanagari', 'Greek', 'Greek Extended', 'Gujarati', 'Gurmukhi', 'Hebrew', 'Japanese', 'Kannada', 'Khmer', 'Korean', 'Latin', 'Latin Extended', 'Malayalam', 'Myanmar', 'Oriya', 'Sinhala', 'Tamil', 'Telugu', 'Thai', 'Tibetan', 'Vietnamese']
export const OptionText = ['Custom', 'Sentence', 'Paragraph']
export const SORT_FONT = ["Trending", "Most popular", 'Newest', "Name"]
export const OptionPx = ['8', '12', '14', '20', '24', '32', '40', '64', '96', '120', '184', '280']
export const INIT_FILTER: FilterData = {
    search: '',
    text: {
        type: "Sentence",
        value: ""
    },
    lengthPx: 40,
    categorie: INIT_CATEGORIES,
    language: [],
    variableFont: false,
}