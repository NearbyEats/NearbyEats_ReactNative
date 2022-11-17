import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import QRCode from 'react-qr-code'
import { useQueryClient } from 'react-query'
import { RootStackParamList } from '../../../App'
import { useAPICreateSession } from '../../http/CreateSession'
import { RestaurantSessionJoinErrorScreen } from './components/RestaurantSessionJoinErrorScreen'
import { RestaurantSessionJoinLoadingScreen } from './components/RestaurantSessionJoinLoadingScreen'

type RestaurantSessionJoinScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'CreateSession'>

export const RestaurantSessionJoinScreen = () => {
    const {isLoading, isError, data} = useAPICreateSession()
    const navigation = useNavigation<RestaurantSessionJoinScreenNavigationProps>()

    useEffect(() => {
        if (!isLoading && !isError && data !== undefined) {
            console.log('Navigating to Session')
            console.log(data.token)
            navigation.navigate('Session', {sessionId: data.token})
        }
    }, [isLoading, isError, data])
    

    if (isError) {
        console.log('isError')
        return <RestaurantSessionJoinErrorScreen />
    } else {
        console.log('isLoading')
        return <RestaurantSessionJoinLoadingScreen />    
    }
}



const styles = StyleSheet.create({
    restaurantSessionJoinScreenContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    qrCode: {
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee'
    },
    buttonStyle: {
        padding: 10,
        width: 'auto',
        height: 'auto',
        backgroundColor: '#2889b0',
        borderRadius: 16,
    },
})