import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Platform, View } from 'react-native';
import { CATEGORIES, CategoryObj, MealObj } from '../data/dummy-data';
import Colors from '../constants/Colors';
import { StateObj } from '../store/reducers/meals.reducer';
import MealList from '../components/mealList.cmp';
import DefaultTextCmp from '../components/defaultText.cmp';

export type Props = {
    navigation: any;
    route: any;
}

const CategoryMealsScreen = (props: Props) => {
    
    const catId = props.route.params.categoryId;
    const availableMeals = useSelector((state: StateObj) => state.meals.filteredMeals);
    const displayedMeals = availableMeals.filter((meal: MealObj) => meal.categoryIds.indexOf(catId) >= 0);

    if (displayedMeals.length === 0) {
        return (
            <View style={styles.contetnt}>
                <DefaultTextCmp>No meals found. Maybe check your filters?</DefaultTextCmp>
            </View>
        )
    }

    return (
        <MealList listData={displayedMeals} navigation={props.navigation}/>
    )
}

export const screenOption = ({ route }: any) => {
    const catId = route.params.categoryId;
    const selectedCategory = CATEGORIES.find((cat: any) => cat.id === catId) as CategoryObj;
    return {
        headerTitle: `${selectedCategory.title}`,
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ?  Colors.primaryColor : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    }
}


const styles = StyleSheet.create({
    contetnt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default CategoryMealsScreen;