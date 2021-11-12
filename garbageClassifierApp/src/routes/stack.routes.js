import React from "react";
import { createStackNavigator } from '@react-navigation/stack'
import { Welcome } from "../pages/Welcome";
import NavBarRoutes from "../routes/navBarRoutes";
import colors from "../styles/colors";


const StackRoutes = createStackNavigator()

function MyStack() {
    return (
        <StackRoutes.Navigator

            screenOptions={{
                headerShown: false,

                cardStyle: {
                    backgroundColor: colors.white
                }
            }}
        >
            <StackRoutes.Screen name="Welcome" component={Welcome} />
            <StackRoutes.Screen name="Content" component={NavBarRoutes} />

        </StackRoutes.Navigator>
    )
}

export default MyStack;