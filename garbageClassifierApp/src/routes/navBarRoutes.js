import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TakePicture } from '../pages/TakePicture';
import { TrainModel } from '../pages/TrainModel';
import { LastActivities } from '../pages/LastActivities';


import { FontAwesome, MaterialIcons, AntDesign } from "@expo/vector-icons";
import colors from "../styles/colors";


const Tab = createBottomTabNavigator();


export default function NavBarRoutes() {

    return (
        <Tab.Navigator

            screenOptions={{
                tabBarActiveTintColor: colors.green_selected,
                tabBarInactiveTintColor: colors.green_unselected,
                tabBarLabelPosition: 'below-icon',
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold'
                },
                tabBarStyle: {

                    height: 88,

                }
            }}

        >

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
                component={LastActivities}
                options={{
                    tabBarIcon: ({ size, color }) => (

                        <FontAwesome name="history" size={size} color={color} />


                    )
                }}
            />


        </Tab.Navigator>
    )
}
