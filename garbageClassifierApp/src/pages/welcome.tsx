import React from "react";
import { StyleSheet, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import nature from '../assets/nature.png';
import recycle from '../assets/garbage_classifier.png'
import { TouchableButton } from "../components/TouchableButton";



export function Welcome() {

    return (

        <SafeAreaView style={styles.container}>

            <Image style={styles.image} source={recycle} />
            <Image style={styles.image} source={nature} />
            <TouchableButton title="Entrar >" />

        </SafeAreaView>

    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300
    },




});