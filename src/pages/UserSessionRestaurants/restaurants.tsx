import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SingleRestaurant } from "./components/singleRestaurant";

function test() {

}

const test2 = () => {

}

export const UserSessionRestaurants = () => {
    //TODO
    // const getRestaurants = useAPIGetRestaurants()
    const [counter, setCounter] = useState<number>(0)
    
    useEffect(() => {
      console.log(counter)
    }, [counter])
    

    return <View style={styles.wrapper}>
        <View style={styles.restaurantWrapper}>
            {/* <Text style={{fontSize: 20}}>
                {counter}
            </Text>
            <Button 
                onPress={() => {
                    setCounter((counter) => counter + 1)
                }}
                title="press here"
            /> */}
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