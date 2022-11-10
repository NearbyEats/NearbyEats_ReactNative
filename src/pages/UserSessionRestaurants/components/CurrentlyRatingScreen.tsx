import React from "react";
import { View, ColorValue, Button, StyleSheet } from "react-native";

interface CurrentlyRatingScreenProps {
    handleJoin: () => void
}

export const CurrentlyRatingScreen = ({handleJoin}: CurrentlyRatingScreenProps ) => {
    return (
        <View style={styles.currentlyRatingContainer}>
            <Button 
                title="Finish Rating"
                onPress={handleJoin}
                color="blue"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    currentlyRatingContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
})