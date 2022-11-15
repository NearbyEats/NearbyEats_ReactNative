import React from "react"
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from "react-native"

export const RestaurantSessionJoinLoadingScreen = () => {

    return (
        <SafeAreaView style={styles.restaurantSessionJoinLoadingScreenContainer}>
            <Text style={{fontSize: 25}}>
                Generating your session!
            </Text>
            <ActivityIndicator size="large" color="#2889b0" style={styles.activityIndicator} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    restaurantSessionJoinLoadingScreenContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    activityIndicator: {
        marginTop: 30,
        justifyContent: 'center'
    }
})