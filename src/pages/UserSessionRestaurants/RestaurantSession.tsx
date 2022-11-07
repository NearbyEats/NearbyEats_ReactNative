import { useMachine } from "@xstate/react";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SingleRestaurant } from "./components/SingleRestaurant";
import { RestaurantSessionMachine } from "./restaurantSessionMachine";

export const UserSessionRestaurants = () => {
    const [ state, send ] = useMachine(RestaurantSessionMachine)
    


    return <View style={styles.wrapper}>
        <View style={styles.restaurantWrapper}>
            <SingleRestaurant name={"Los Pollos Hermanos"} address={"23 Royal Road, Albuquerque, New Mexico"} />
        </View>
    </View>
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        borderRadius: 16,
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    restaurantWrapper: {
        width: '100%',
        height: '100%',
    },
})