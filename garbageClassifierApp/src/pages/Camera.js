
import React, { useEffect, useState, useRef } from 'react';


import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    TouchableOpacity
} from 'react-native';
import { Camera } from 'expo-camera'
import { useIsFocused } from '@react-navigation/native';

import axios from 'axios';

import colors from "../styles/colors";


export function CameraPage(props) {

    const BASE_URL = 'http://192.168.1.17:3000';

    const camRef = useRef(null)
    const [type] = useState(Camera.Constants.Type.back)
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const isFocused = useIsFocused()



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
            const picture = new FormData()

            console.log(data)
            picture.append('uploadImage', {
                name: "imagem.jpg",
                uri: data.uri,
                type: 'image/jpg'

            });


            await axios.post(`${BASE_URL}/upload/teste`, picture, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                console.log(response.data);
            });



        }


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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',

        justifyContent: 'center',
        alignItems: 'center'

    }
});
