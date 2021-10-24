import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Welcome } from "../pages/Welcome";
import { Content } from "../pages/Content";

const StackRoutes = createNativeStackNavigator()

function MyStack() {
    return (
        <StackRoutes.Navigator>
            <StackRoutes.Screen name="Welcome" component={Welcome} />
            <StackRoutes.Screen name="Content" component={Content} />
        </StackRoutes.Navigator>
    )
}

export default MyStack;