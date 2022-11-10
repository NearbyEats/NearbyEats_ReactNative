import React from 'react'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface FinishedScreenProps {
    numOfUsersInSession: number
    numOfUsersFinished: number
    handleState: () => void
}

export const FinishedScreen = ({
    numOfUsersInSession,
    numOfUsersFinished,
    handleState
}: FinishedScreenProps) => {

    useEffect(() => {
        if (numOfUsersFinished == numOfUsersInSession) {
            handleState()
        }
    }, [numOfUsersFinished, numOfUsersInSession])

    return (
        <View style={styles.finishRatingScreenContainer}>
            <Text>
                Waiting for everyone to finish...
            </Text>
            <Text>
                {numOfUsersFinished}/{numOfUsersInSession}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    finishRatingScreenContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
})