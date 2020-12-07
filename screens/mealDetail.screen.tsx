import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Platform, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { MealObj } from '../data/dummy-data'
import Colors from '../constants/Colors';
import CustomHeaderButton from '../components/customHeaderButton.cmp';
import DefaultTextCmp from '../components/defaultText.cmp';
import { toggleFavorite } from '../store/actions/meals.action';
import { StateObj } from '../store/reducers/meals.reducer';
export type Props = {
    navigation: any;
    route: any;
}

const ListItem = (props: any) => {
    return (
        <View style={styles.listItem}>
            <DefaultTextCmp>{props.children}</DefaultTextCmp>
        </View>
    )
}

const MealDetailsScreen = (props: Props) => {
    const { mealId } = props.route.params;
    const availableMeals = useSelector((state: StateObj) => state.meals.meals);
    const currentMealIsFavorite = useSelector((state: StateObj) => state.meals.favoriteMeals.some((meal: MealObj) => meal.id === mealId));
    const selectedMeal = availableMeals.find((meal: MealObj) => meal.id === mealId) as MealObj;

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [ dispatch, mealId ])

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
    }, [ toggleFavoriteHandler ]);

    useEffect(() => {
        props.navigation.setParams({ isFav: currentMealIsFavorite });
    }, [ currentMealIsFavorite ]);

    return (
    <ScrollView>
        <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
        <View style={{ ...styles.details}}>
            <DefaultTextCmp>{selectedMeal.duration}m</DefaultTextCmp>
            <DefaultTextCmp>{selectedMeal.complexity.toUpperCase()}</DefaultTextCmp>
            <DefaultTextCmp>{selectedMeal.affordablility.toUpperCase()}</DefaultTextCmp>
        </View>
        <Text style={styles.title}>Ingredients</Text>
        {
            selectedMeal.ingredients.map((ingredient: any) => <ListItem key={ingredient}>{ingredient}</ListItem>)
        }
        <Text style={styles.title}>Steps</Text>
        {
            selectedMeal.steps.map((step: any) => <ListItem key={step}>{step}</ListItem>)
        }
    </ScrollView>
    )
}

export const screenOption = ({ route }: any) => {
    const { mealTitle, toggleFav, isFav } = route.params;

    return {
        headerTitle: mealTitle,
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ?  Colors.primaryColor : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
        headerRight:() => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Favorite" iconName={isFav? 'ios-star': 'ios-star-outline'} onPress={toggleFav} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center',
    },
    listItem: {
        margin: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    }
})

export default MealDetailsScreen;