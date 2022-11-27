import React from "react"
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from "react-native"
import Icon from 'react-native-vector-icons/Feather'

export const RestaurantSessionCreateErrorScreen = () => {

    return (
        <SafeAreaView style={styles.restaurantSessionCreateErrorScreenContainer}>
            <Text style={{fontSize: 35, fontWeight:'bold'}}>
                Uh oh!
            </Text>
            <Icon name="alert-triangle" size={130} color="red" style={{margin: 20}} />
            <Text style={{fontSize: 25, textAlign:'center'}}>
                Something went wrong while generating your session...
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    restaurantSessionCreateErrorScreenContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
})