import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { RootStackParamList } from '../../../App'
import { useAPICreateSession } from '../../http/CreateSession'
import { RestaurantSessionJoinErrorScreen } from './components/RestaurantSessionJoinErrorScreen'
import { RestaurantSessionJoinLoadingScreen } from './components/RestaurantSessionJoinLoadingScreen'

type RestaurantSessionJoinScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'CreateSession'>

export const RestaurantSessionJoinScreen = () => {
    const {isLoading, isFetching, isError, data} = useAPICreateSession()
    const navigation = useNavigation<RestaurantSessionJoinScreenNavigationProps>()

    useEffect(() => {
        if (!isLoading && !isFetching && !isError && data !== undefined) {
            console.log('Routing to: Session')
            console.log(data.token)
            navigation.navigate('Session', {sessionId: data.token})
        }
    }, [isLoading, isFetching, isError, data])
    

    if (isError) {
        return <RestaurantSessionJoinErrorScreen />
    } else {
        return <RestaurantSessionJoinLoadingScreen />    
    }
}
