import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { RootStackParamList } from '../../../App'
import { useAPICreateSession } from '../../http/CreateSession'
import { RestaurantSessionCreateErrorScreen } from './components/RestaurantSessionCreateErrorScreen'
import { RestaurantSessionCreateLoadingScreen } from './components/RestaurantSessionCreateLoadingScreen'

type RestaurantSessionCreateScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'CreateSession'>

export const RestaurantSessionCreateScreen = () => {
    const {isLoading, isFetching, isError, data} = useAPICreateSession()
    const navigation = useNavigation<RestaurantSessionCreateScreenNavigationProps>()

    useEffect(() => {
        if (!isLoading && !isFetching && !isError && data !== undefined) {
            console.log('Routing to: Session')
            console.log(data.token)
            navigation.navigate('Session', {sessionId: data.token})
        }
    }, [isLoading, isFetching, isError, data])
    

    if (isError) {
        return <RestaurantSessionCreateErrorScreen />
    } else {
        return <RestaurantSessionCreateLoadingScreen />    
    }
}
