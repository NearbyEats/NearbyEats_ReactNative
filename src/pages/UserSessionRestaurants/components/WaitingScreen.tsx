import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface WaitingScreenProps {
    numOfUsersInSession: number
    numOfUsersReady: number
}

export const WaitingScreen = ({
    numOfUsersInSession,
    numOfUsersReady
}: WaitingScreenProps) => {
    return (
        <View style={styles.waitingScreenContainer}>
            <Text>
                Waiting for everyone to ready up...
            </Text>
            <Text>
                {numOfUsersReady}/{numOfUsersInSession}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    waitingScreenContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
})