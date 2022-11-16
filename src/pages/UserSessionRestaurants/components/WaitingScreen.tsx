import React from 'react'
import { useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

interface WaitingScreenProps {
    numOfUsersInSession: number
    numOfUsersReady: number
    handleState: () => void
}

export const WaitingScreen = ({
    numOfUsersInSession,
    numOfUsersReady,
    handleState
}: WaitingScreenProps) => {

    useEffect(() => {
        if (numOfUsersReady == numOfUsersInSession) {
            handleState()
        }
    }, [numOfUsersReady, numOfUsersInSession])

    return (
        <SafeAreaView style={styles.waitingScreenContainer}>
            <Text>
                Waiting for everyone to ready up...
            </Text>
            <Text>
                {numOfUsersReady}/{numOfUsersInSession}
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    waitingScreenContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
})