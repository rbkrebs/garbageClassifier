import React from "react";
import {
    StyleSheet,
    SafeAreaView,
    Image,
    Dimensions
} from "react-native";

import nature from '../assets/nature.png';
import recycle from '../assets/garbage_classifier.png'
import { TouchableButton } from "../components/TouchableButton";
import colors from "../styles/colors";





export function Welcome() {

    return (

        <SafeAreaView style={styles.container}>
            <Image
                style={styles.image}
                source={recycle}
                resizeMode="contain"

            />
            <Image
                style={styles.image}
                source={nature}
                resizeMode="contain"

            />
            <TouchableButton
                title="Entrar"
            />
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
    image: {

        height: Dimensions.get('window').width * 0.7
    },
});