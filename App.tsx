import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import MealsNavigator from './navigation/meals.navigator';
import mealsReducer from './store/reducers/meals.reducer';

const rootReducer = combineReducers({
  meals: mealsReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {

  const [fontLoaded, setfontLoaded] = useState<boolean>(false);

  if(!fontLoaded) {
    return <AppLoading 
              startAsync={fetchFonts as any}
              onFinish={() => setfontLoaded(true)} 
              onError={(err) => console.warn(err)}
            />
  } else {
      return (
        <Provider store={store}>
          <MealsNavigator />
        </Provider>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
