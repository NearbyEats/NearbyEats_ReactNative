import React from "react";
import { Button, ColorValue, StyleSheet, View } from "react-native";

export const Homepage = () => {


    return (
        <View style={styles.homepageContainer}>
            <View style={styles.homepageButtonsContainer}>
                <HomepageButton text={"Create Session"} color={'blue'} />
                <HomepageButton text={"Join Session"} color={'grey'} />
            </View>
        </View>
    )
}

interface HomepageButtonProps {
    text: string
    color: string
}

const HomepageButton = ({
    text, 
    color
}: HomepageButtonProps) => {
    return (
        <View style={styles.buttonContainer}>
            <Button 
                onPress={() => console.log(text)}
                title={text}
                color={color}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    homepageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    homepageButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 140,
        height: 40
    }
})