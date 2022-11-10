import React from "react"
import { View, Text, StyleSheet } from "react-native"

export const ResultsScreen = () => {

    return (
        <View style={styles.resultsScreenContainer}>
            <Text>
                Here are your results!
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    resultsScreenContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
})