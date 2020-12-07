import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import MealItemCmp from './mealItem.cmp';
import { MealObj } from '../data/dummy-data';
import { useSelector } from 'react-redux';
import { StateObj } from '../store/reducers/meals.reducer';

export type Props = {
    listData: any;
    navigation: any;
}

const MealList = (props: Props) => {
    const favoriteMeals = useSelector((state: StateObj) => state.meals.favoriteMeals);


    const renderMealItem = (itemData: any) => {
        const { id, title, duration, complexity, affordablility, imageUrl } = itemData.item;
        const isFavotite = favoriteMeals.some((meal: MealObj) => meal.id === id);
        return (
            <MealItemCmp 
                title={title} 
                duration={duration} 
                complexity={complexity} 
                affordablility={affordablility} 
                image={imageUrl} 
                onSelectMeal={() => {
                    props.navigation.navigate({ 
                        name: 'MealDetails',
                        params: {
                            mealId: itemData.item.id,
                            mealTitle: title,
                            isFav: isFavotite,
                        }
                    })
                }}
            />
        )
    }

    return (
        <View style={styles.list}>
            <FlatList 
                data={props.listData} 
                keyExtractor={(item: MealObj) => item.id} 
                renderItem={renderMealItem} 
                style={{width:'100%'}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 10,
    }
})

export default MealList;