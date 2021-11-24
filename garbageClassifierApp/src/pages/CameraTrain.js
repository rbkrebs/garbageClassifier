
import React, { useEffect, useState, useRef } from 'react';


import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Modal,
    Image
} from 'react-native';
import { Camera } from 'expo-camera'
import { useIsFocused } from '@react-navigation/native';

import axios from 'axios';

import colors from "../styles/colors";


export function CameraTrain() {



    const BASE_URL = 'http://192.168.1.17:3000';

    const camRef = useRef(null)
    const [type] = useState(Camera.Constants.Type.back)
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const isFocused = useIsFocused()
    const [capturedPicture, setCapturedPicture] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [pictureFormData, setPictureFormData] = useState(null)
    const [resultClassification, setResultClassification] = useState(null)
    const [resultProbability, setResultProbability] = useState(null)
    const [classification, setclassification] = useState(null)




    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);



    if (hasCameraPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasCameraPermission === false) {
        return <Text>Acesso Negado!</Text>;
    }


    async function takePicture() {

        if (camRef) {
            const data = await camRef.current.takePictureAsync();
            setCapturedPicture(data.uri)
            const picture = new FormData()


            picture.append('datasetImage', {
                name: "imagem.jpg",
                uri: data.uri,
                type: 'image/jpg'

            });
            setPictureFormData(picture)

            setOpenModal(true)

        }

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

                <TouchableOpacity style={styles.button} onPress={() => setOpenModal(false)}>
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
