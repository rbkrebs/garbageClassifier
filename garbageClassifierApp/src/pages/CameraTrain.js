
import React, { useEffect, useState, useRef } from 'react';


import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Modal,

} from 'react-native';
import { CameraPage } from './Camera';
import { useIsFocused } from '@react-navigation/native';

import axios from 'axios';

import colors from "../styles/colors";


export function CameraTrain() {

    //TODO criar variável state global para encerrar modal
    // caso -> após tirar a foto, se clicar em cancelar o app volta para a camera e não para a cameratrain



    const BASE_URL = 'http://192.168.1.17:3000';


    const [openModal, setOpenModal] = useState(false)

    const [pictureFormData, setPictureFormData] = useState(null)

    const [classification, setclassification] = useState(null)



    async function takePicture() {


        setOpenModal(true)


    }

    async function requestClassification() {


        await axios.post(`${BASE_URL}/upload/${classification}`, pictureFormData, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {

            console.log(response)

            // setResultClassification(response.data.classification);
            // setResultProbability(response.data.probability);
            // setShowResult(true);
        });

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, justifyContent: "center" }}>

                <Text style={{ fontSize: 22, textAlign: "center" }}>Selecine a classificação do resíduo:</Text>
            </View>


            <View style={{ flex: 2, justifyContent: "space-between", height: 200 }} >

                <TouchableOpacity style={styles.button} onPress={() => takePicture()}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Orgânico</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => requestClassification()}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Rejeito</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => requestClassification()}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Reciclável</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, justifyContent: "space-between" }} />
            <Modal
                animationType='slide'
                transparent={false}
                visible={openModal}
            >
                <CameraPage />
            </Modal>




        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',

        justifyContent: 'center',
        alignItems: 'center'

    },
    button: {
        margin: 10,
        padding: 20,
        backgroundColor: colors.green_selected,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        height: 100


    },
    showResult: {

        flex: 1,
        width: '100%',
        justifyContent: "space-around",
        alignItems: "center"

    },
    buttonResult: {

        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.green_selected,
        padding: 10,
        borderRadius: 10

    }
});
