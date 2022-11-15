import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import QRCode from 'react-qr-code'
import { RootStackParamList } from '../../../App'
import { useAPICreateSession } from '../../http/CreateSession'
import { RestaurantSessionJoinErrorScreen } from './components/RestaurantSessionJoinErrorScreen'
import { RestaurantSessionJoinLoadingScreen } from './components/RestaurantSessionJoinLoadingScreen'

type RestaurantSessionJoinScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'CreateSession'>

export const RestaurantSessionJoinScreen = () => {
    const {isLoading, isError, data} = useAPICreateSession()
    const navigation = useNavigation<RestaurantSessionJoinScreenNavigationProps>()

    if (isLoading) {
        console.log('isLoading')
        return <RestaurantSessionJoinLoadingScreen />
    } else if (isError) {
        console.log('isError')
        return <RestaurantSessionJoinErrorScreen />
    } else {
        return (
            <SafeAreaView style={styles.restaurantSessionJoinScreenContainer}>
                <View>
                    <Text style={{fontSize: 35, padding: 30, textAlign: 'center'}}>
                        Your session has been generated!
                    </Text>
                    <View style={styles.qrCode}>
                        <QRCode
                            value='test'
                            bgColor='#eee'
                        />
                    </View>
                </View>
                <View style={styles.buttonStyle}>
                    <Button 
                        title='Join Session'
                        color='white'
                        onPress={() => {
                            console.log('Navigating to Session')
                            navigation.navigate('Session', {sessionId: data.token})
                        }}
                    />
                </View>
            </SafeAreaView>
        )
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