import React from "react";
import { NavigationContainer } from "@react-navigation/native";


import MyStack from "./stack.routes";

const Routes = () => (
    <NavigationContainer>
        <MyStack />
    </NavigationContainer>
)

export default Routes;