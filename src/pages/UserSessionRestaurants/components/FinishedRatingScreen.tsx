import React from 'react'
import { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


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
        <SafeAreaView style={styles.finishRatingScreenContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.primaryTextStyle}>
                    Sit tight, we've received your preferences!
                </Text>
                <ActivityIndicator 
                    size="large"
                    color="blue"
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    finishRatingScreenContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    textContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    primaryTextStyle: {
        fontSize: 26,
        marginBottom: 50,
    },
    bodyTextStyle: {
        fontSize: 20,
        color: '#6b6b6b'
    }
})