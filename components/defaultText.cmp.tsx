import React from 'react';
import { StyleSheet, Text } from 'react-native';

export type Props = {
    children: any;
}

const DefaultTextCmp = (props: Props) => {
    return (
        <Text style={styles.text}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans',
    }
})

export default DefaultTextCmp;