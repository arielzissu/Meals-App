import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export type Props = {
    title: string;
}

const CustomHeaderButton = (props: Props) => {
    return <HeaderButton
                {...props} 
                title={props.title}
                IconComponent={Ionicons}
                iconSize={23}
                color={Platform.OS === 'android' ? 'white' : Colors.primaryColor} 
            />;
}

const styles = StyleSheet.create({

})

export default CustomHeaderButton;