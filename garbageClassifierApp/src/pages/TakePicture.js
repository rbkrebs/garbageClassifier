import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Modal, Button, SafeAreaView } from 'react-native';

import { CameraPage } from './Camera';
import colors from "../styles/colors";




export function TakePicture() {



    return (
        <SafeAreaView style={styles.container}>
            <CameraPage />
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
