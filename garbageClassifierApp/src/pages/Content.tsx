import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import NavBarRoutes from '../routes/navBarRoutes';

import colors from "../styles/colors";


export function Content() {
    return (
        <SafeAreaView >

            <NavBarRoutes />

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