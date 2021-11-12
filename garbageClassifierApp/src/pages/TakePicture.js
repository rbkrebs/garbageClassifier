import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Modal, Button, SafeAreaView } from 'react-native';

import { CameraPage } from './Camera';
import colors from "../styles/colors";




export function TakePicture() {

    const [modalVisible, setModalVisible] = React.useState(false)

    const [formVisible, setFormVisible] = React.useState(false)

    const onCodeScanned = (type, data) => {
        console.log(data)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modal}>
                    <CameraPage onTakenPicture={onCodeScanned} />
                    <Button title="Cancelar" onPress={() => { setModalVisible(false); setFormVisible(false) }} />
                </View>
            </Modal>
            <Modal
                visible={formVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setFormVisible(false)}
            >
                <View style={styles.modal}>
                    <Button title="Cancelar" onPress={() => { setModalVisible(false); setFormVisible(false) }} />
                </View>
            </Modal>
            <Button title="Classificar" onPress={() => { setModalVisible(true); setFormVisible(false) }} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'space-around',


    },
    modal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "lightgrey"
    }
});
