import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView
} from 'react-native';

import colors from "../styles/colors";


export function LastActivities() {
    return (
        <SafeAreaView><Text>OI</Text></SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'space-around',

    }
});