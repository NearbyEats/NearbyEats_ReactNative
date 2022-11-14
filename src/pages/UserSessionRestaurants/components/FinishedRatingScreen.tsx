import React from 'react'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native'


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
            <View style={styles.textContainer}>
                <Text style={styles.primaryTextStyle}>
                    Sit tight, we've received your preferences!
                </Text>
                <LottieView 
                    source={require('../../../assets/CookingAnimation.json')}
                    style={{
                        width: 150,
                        height: 150,
                    }}
                    autoPlay
                    loop
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.bodyTextStyle}>
                    Waiting for {numOfUsersInSession-numOfUsersFinished} people...
                </Text>
            </View>
        </View>
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
    },
    textContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    primaryTextStyle: {
        fontSize: 26
    },
    bodyTextStyle: {
        fontSize: 20,
        color: '#6b6b6b'
    }
})