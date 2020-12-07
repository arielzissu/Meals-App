import { MEAL, MealObj } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, ToggleFavoriteObj, SET_FILTERS } from '../actions/meals.action';

const initialState = {
    meals: MEAL,
    filteredMeals: MEAL,
    favoriteMeals: [],
}

export type StateObj = {
    meals: {
        meals: MealObj[],
        filteredMeals: MealObj[],
        favoriteMeals: MealObj[],
    }
}

const mealsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex((meal: MealObj)=> meal.id === action.mealId);
            if (existingIndex >= 0) {
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex, 1);
                return { ...state, favoriteMeals: updatedFavMeals };
            } else {
                const meal = state.meals.find((meal: any) => meal.id === action.mealId) as any;
                return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) }
            }
            case SET_FILTERS:
                const appliedFilters = action.filters;
                const updatedFilteredMeals = state.meals.filter((meal: any) => {
                    if (appliedFilters.glutenFree && !meal.isGlutenFree) {
                        return false;
                    }
                    if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
                        return false;
                    }
                    if (appliedFilters.vegetarian && !meal.isVegetarian) {
                        return false;
                    }
                    if (appliedFilters.vegan && !meal.isVegan) {
                        return false;
                    }
                    return true;
                });
                return { ...state, filteredMeals: updatedFilteredMeals}
            default:
                return state;
    }
}

export default mealsReducer;