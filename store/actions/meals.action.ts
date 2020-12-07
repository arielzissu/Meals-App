export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';

export type ToggleFavoriteObj = {
    type: string;
    mealId: string;
}

export const toggleFavorite = (id: string) => {
    return { type: TOGGLE_FAVORITE, mealId: id };
}

export const setFilters = (filterSetting: any) => {
    return { type: SET_FILTERS, filters: filterSetting};
}