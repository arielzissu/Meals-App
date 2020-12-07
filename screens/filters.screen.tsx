import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constants/Colors';
import CustomHeaderButton from '../components/customHeaderButton.cmp';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals.action';

export type Props = {
    navigation: any;
    route: any;
}

const FilterSwitch = (props: {label: string, isGlutenFree: boolean, onSetIsGlutenFree: (newValue: boolean) => void }) => {

    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{ false : '', true: Colors.primaryColor}}
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
                value={props.isGlutenFree} 
                onValueChange={(newValue) => props.onSetIsGlutenFree(newValue)}
            />
        </View>
    )
}

const FiltersScreen = (props: Props) => {

    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState<boolean>(false);
    const [isLactoseFree, setIsLactoseFree] = useState<boolean>(false);
    const [isVegan, setIsVegan] = useState<boolean>(false);
    const [isVegetarian, setIsVegetarian] = useState<boolean>(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            Vegetarian: isVegetarian,
        }

        dispatch(setFilters(appliedFilters));

    }, [ isGlutenFree, isLactoseFree, isVegan, isVegetarian ])

    useEffect(() => {
        navigation.setParams({ save: saveFilters });
    }, [saveFilters]);

    return (
    <View style={styles.screen}>
        <Text style={styles.title}>Available Filters / Restrictaions</Text>
        <FilterSwitch
         isGlutenFree={isGlutenFree}
          onSetIsGlutenFree={(newValue: boolean) => setIsGlutenFree(newValue)} 
          label={'Gluten-free'}
        />
        <FilterSwitch
         isGlutenFree={isLactoseFree}
          onSetIsGlutenFree={(newValue: boolean) => setIsLactoseFree(newValue)} 
          label={'Lactose-free'}
        />
        <FilterSwitch
         isGlutenFree={isVegan}
          onSetIsGlutenFree={(newValue: boolean) => setIsVegan(newValue)} 
          label={'Vegan'}
        />
        <FilterSwitch
         isGlutenFree={isVegetarian}
          onSetIsGlutenFree={(newValue: boolean) => setIsVegetarian(newValue)} 
          label={'Vegetarian'}
        />
    </View>
    )
}

export const screenOption = ({navigation, route}: any) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName="ios-menu" onPress={() => {
                navigation.toggleDrawer();
            }} />
        </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Save" iconName="ios-save" onPress={route?.params?.save} />
            </HeaderButtons>
        ),
    };
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15,
    },
})

export default FiltersScreen;