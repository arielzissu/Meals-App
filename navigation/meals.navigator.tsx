import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/Categories.screen';
import CategoryMealsScreen from '../screens/categoryMeals.screen';
import MealDetailsScreen from '../screens/mealDetail.screen';
import FavoriteScreen from '../screens/favorites.screen';
import FiltersScreen from '../screens/filters.screen';

import {screenOption as categoryOptions} from '../screens/Categories.screen';
import {screenOption as categoryMealsOptions} from '../screens/categoryMeals.screen';
import {screenOption as mealDetailsOptions} from '../screens/mealDetail.screen';
import {screenOption as favoritesOptions} from '../screens/favorites.screen';
import {screenOption as filtersOptions} from '../screens/filters.screen';

import Colors from '../constants/Colors';
import { Platform, Text } from 'react-native';

const Stack = createStackNavigator();
const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator() as any;
const Drawer = createDrawerNavigator();

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ?  Colors.primaryColor : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'A Screen',
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
}

function MealsNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultStackNavOptions}>
      <Stack.Screen name="Categories" component={CategoriesScreen} options={categoryOptions}/>
      <Stack.Screen name="CategoryMeals" component={CategoryMealsScreen} options={categoryMealsOptions}/>
      <Stack.Screen name="MealDetails" component={MealDetailsScreen} options={mealDetailsOptions}/>
    </Stack.Navigator>
  );
}

function FavsNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultStackNavOptions}>
      <Stack.Screen name="Favorite Screen" component={FavoriteScreen} options={favoritesOptions}/>
    </Stack.Navigator>
  );
}

function FiltersNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultStackNavOptions}>
      <Stack.Screen name="Favorite Screen" component={FiltersScreen} options={filtersOptions}/>
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Meals" component={MealsNavigator} options={{
          tabBarIcon: (tabInfo: any) => {
            return <Ionicons name="ios-restaurant" size={25} color={tabInfo.color}/>
          }, 
          tabBarLabel: (Platform.OS === 'android') ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals',
          tabBarColor: Colors.primaryColor,
        }}
      />
      <Tab.Screen name="Favorite" component={FavsNavigator} options={{
          tabBarIcon: (tabInfo: any) => {
            return <Ionicons name="ios-star" size={25} color={tabInfo.color}/>
          },
          tabBarLabel:(Platform.OS === 'android') ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorite</Text> : 'Favorite' ,
          tabBarColor: Colors.accentColor,
        }}
      />
    </Tab.Navigator>
  )
};

export default function MyDrawers() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home" 
        drawerContentOptions={{
          activeTintColor:Colors.accentColor, 
          labelStyle:{fontFamily:'open-sans-bold'}
        }}>
        <Drawer.Screen name="Meals" component={MyTabs} options={{
          drawerLabel:'Meals'
        }}/>
        <Drawer.Screen name="Filters" component={FiltersNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}