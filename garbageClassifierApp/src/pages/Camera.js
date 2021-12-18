
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


export function CameraPage() {



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


            picture.append('classifyImage', {
                name: "imagem.jpg",
                uri: data.uri,
                type: 'image/jpg'

            });
            setPictureFormData(picture)

            setOpenModal(true)

        }

    }

    async function requestClassification() {



        await axios.post(`${BASE_URL}/classify`, pictureFormData, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {

            setResultClassification(response.data.classification);
            setResultProbability(response.data.probability);
            setShowResult(true);
        });

    }

    return (
        <SafeAreaView style={styles.container}>
            {

                isFocused && <>
                    <Camera
                        style={{ flex: 1, width: '100%', }}
                        type={type}
                        ref={camRef}
                    >
                        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                        </View>
                    </Camera>
                    <View

                        style={{
                            position: 'absolute',
                            bottom: 20,
                            colors: colors.white,
                            backgroundColor: colors.green_selected,
                            padding: 15,
                            borderRadius: 50

                        }}>
                        <TouchableOpacity
                            style={{

                                colors: colors.white,
                                backgroundColor: colors.green_medium,
                                padding: 35,
                                borderRadius: 50
                            }}
                            onPress={takePicture}
                        >
                        </TouchableOpacity>
                    </View>
                </>
            }
            {
                capturedPicture && <Modal

                    animationType='slide'
                    transparent={false}
                    visible={openModal}
                >
                    <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}                    >

                        {
                            showResult ?
                                <>
                                    <Image
                                        style={{ width: '100%', height: "70%", borderRadius: 20 }}
                                        source={{ uri: capturedPicture }}
                                    />
                                    <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "space-around", width: "100%" }}>
                                        <Text>Classificação: {resultClassification}</Text>
                                        <Text>Confiança: {resultProbability}</Text>
                                    </View>
                                    <View style={{
                                        height: 90,
                                    }}>
                                        <TouchableOpacity style={styles.buttonResult} onPress={() => { setOpenModal(false); setShowResult(false) }}>
                                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Voltar tela inicial</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                                :
                                <>
                                    <Image
                                        style={{ width: '100%', height: "90%", borderRadius: 20 }}
                                        source={{ uri: capturedPicture }}
                                    />
                                    <View style={{
                                        flex: 1,
                                        flexDirection: "row"
                                    }}>
                                        <TouchableOpacity style={styles.button} onPress={() => setOpenModal(false)}>
                                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cancelar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button} onPress={() => requestClassification()}>
                                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Enviar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                        }
                    </View>
                </Modal>
            }
        </SafeAreaView>
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
        borderRadius: 10


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
