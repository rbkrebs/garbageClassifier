import React from "react";
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    SafeAreaView
} from "react-native";

import nature from '../assets/nature.png';
import recycle from '../assets/garbage_classifier.png'
import { TouchableButton } from "../components/TouchableButton";
import colors from "../styles/colors";
import { useNavigation } from "@react-navigation/core";

export function Welcome() {

    const navigation = useNavigation()


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
                onPress={() => navigation.navigate('Content')}
            />
        </SafeAreaView>
    )

}

// TODO 
/* - arrumar o parametro navigate */
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