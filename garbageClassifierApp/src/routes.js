import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TakePicture } from './pages/TakePicture';
import { Welcome } from './pages/Welcome';
import { TrainModel } from './pages/TrainModel';


import { FontAwesome, MaterialIcons, AntDesign } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();


export default function Routes() {

    return (
        <Tab.Navigator

            screenOptions={{
                style: {
                    backgroundColor: '#121212',
                    borderTopColor: 'transparent',
                    height: 80,


                },
                tabStyle: {
                    paddingBottom: 15,
                },
                labelStyle: {
                    fontSize: 20,

                }

            }}>
            <Tab.Screen
                name="Tirar foto"
                component={TakePicture}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <AntDesign name="camerao" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Treinar modelo"
                component={TrainModel}
                options={{
                    tabBarIcon: ({ size, color }) => (

                        <MaterialIcons name="model-training" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name="Histórico"
                component={Welcome}
                options={{
                    tabBarIcon: ({ size, color }) => (

                        <FontAwesome name="history" size={size} color={color} />


                    )
                }}
            />


        </Tab.Navigator>
    )
}
