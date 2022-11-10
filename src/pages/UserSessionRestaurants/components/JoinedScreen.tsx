import React from "react";
import { View, ColorValue, Button, StyleSheet } from "react-native";

interface JoinedScreenProps {
    handleJoin: () => void
}

export const JoinedScreen = ({handleJoin}: JoinedScreenProps ) => {
    return (
        <View style={styles.joinContainer}>
            <Button 
                title="Ready Up"
                onPress={handleJoin}
                color="blue"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    joinContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
})