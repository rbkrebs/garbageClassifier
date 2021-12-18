import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView
} from 'react-native';

import { CameraTrain } from './CameraTrain';

import colors from "../styles/colors";


export function TrainModel() {
    return (
        <SafeAreaView style={styles.container}>
            <CameraTrain />
        </SafeAreaView>
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