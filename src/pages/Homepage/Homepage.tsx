import React from "react";
import { Button, ColorValue, StyleSheet, View } from "react-native";

export const Homepage = () => {


    return (
        <View style={styles.homepageContainer}>
            <View style={styles.homepageButtonsContainer}>
                <HomepageButton text={"Create Session"} backgroundColor={'grey'} color={'white'} />
                <HomepageButton text={"Join Session"} backgroundColor={'darkblue'} color={'white'} />
            </View>
        </View>
    )
}

interface HomepageButtonProps {
    text: string
    color: string
    backgroundColor: string
}

const HomepageButton = ({
    text, 
    color,
    backgroundColor
}: HomepageButtonProps) => {
    return (
        <View style={[styles.buttonContainer, {backgroundColor: backgroundColor}]}>
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
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    homepageButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 140,
        height: 40,
        borderRadius: 16,
    }
})