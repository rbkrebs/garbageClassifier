
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from "../styles/colors";

interface ButtonProps {
    title: string

}

export function TouchableButton({ title }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.button}
            activeOpacity={0.5}>
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.green_medium,
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 20,
        color: colors.white,
        fontSize: 20

    },
    buttonText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: '900'

    }
});

