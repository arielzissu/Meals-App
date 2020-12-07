import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CATEGORIES, CategoryObj } from '../data/dummy-data';
import CategoryGridTile from '../components/categoryGridTile.cmp';
import CustomHeaderButton from '../components/customHeaderButton.cmp';

export type Props = {
    navigation: any;
}

const CategoriesScreen = (props: Props) => {

    const renderGridItem = (itemData: any) => {
        return (
            <CategoryGridTile itemData={itemData} onSelect={() => {
                props.navigation.navigate({ 
                    name: 'CategoryMeals',
                    params: {
                        categoryId: itemData.item.id
                    }
                })
            }}/>
        )
    }

    return (
        <FlatList keyExtractor={(item: CategoryObj) => item.id} data={CATEGORIES as CategoryObj[]} renderItem={renderGridItem} numColumns={2}/>
    )
}

export const screenOption = ({navigation}: any) => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName="ios-menu" onPress={() => {
                navigation.toggleDrawer();
            }} />
        </HeaderButtons>),
    };
}

const styles = StyleSheet.create({
    
})

export default CategoriesScreen;