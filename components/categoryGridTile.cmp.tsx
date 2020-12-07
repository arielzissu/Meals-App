import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';

export type Props = {
    itemData:{
        item: {
            id: string,
            title: string,
            color: string,
        };
    }
    onSelect: () => any;
}

const CategoryGridTile = (props: Props) => {
    const { itemData, onSelect } = props;

    let TouchableCmp = TouchableOpacity as any;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.gridItem} >
            <TouchableCmp style={{flex: 1}} onPress={onSelect}>
                <View style={{ ...styles.container ,...{backgroundColor: itemData.item.color} }}>
                    <Text style={styles.title} numberOfLines={2}>{itemData.item.title}</Text>
                </View>
            </TouchableCmp>
        </View>
    )
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: (Platform.OS === 'android' && Platform.Version >= 21) ? 'hidden' : 'visible',
        elevation: 5,
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'right',
    },
})

export default CategoryGridTile;