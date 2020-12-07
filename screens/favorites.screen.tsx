import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MealList from '../components/mealList.cmp';
import CustomHeaderButton from '../components/customHeaderButton.cmp';
import DefaultTextCmp from '../components/defaultText.cmp';

export type Props = {
    navigation: any;
}

const FavoriteScreen = (props: Props) => {
    const favMeals = useSelector((state: any) => state.meals.favoriteMeals);
    if (favMeals.length === 0 || !favMeals) {
        return (
            <View style={styles.content}>
                <DefaultTextCmp>No favorite meals found. Start adding some!</DefaultTextCmp>
            </View>
        )
    }
    return (
        <MealList listData={favMeals} navigation={props.navigation}/>
    )
}

export const screenOption = ({navigation}: any) => {
    return {
        headerTitle: 'Your Favorites',
        headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName="ios-menu" onPress={() => {
                navigation.toggleDrawer();
            }} />
        </HeaderButtons>),
    };
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default FavoriteScreen;