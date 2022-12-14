import { useMachine } from "@xstate/react";
import React, { useEffect, useId, useState } from "react";
import { Text, View } from "react-native";
import { JOIN_SESSION, SERVER_URL } from "../../utils/Constants";
import { CurrentlyRatingScreen } from "./components/CurrentlyRatingScreen";
import { FinishedScreen } from "./components/FinishedRatingScreen";
import { JoinedScreen } from "./components/JoinedScreen";
import { ResultsScreen } from "./components/ResultsScreen";
import { WaitingScreen } from "./components/WaitingScreen";
import { RestaurantSessionMachine } from "./restaurantSessionMachine";
import { DataHubPayload, parseDataHubPayload } from "./utils/DataParser";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from "../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


type UserSessionRestaurantsNavigation = NativeStackNavigationProp<RootStackParamList, 'Session'>

export const UserSessionRestaurants = () => {
    const [state, send] = useMachine(RestaurantSessionMachine)
    const [datahubPayload, setDatahubPayload] = useState<DataHubPayload>()
    const route = useRoute<RouteProp<RootStackParamList, 'Session'>>()
    const navigation = useNavigation<UserSessionRestaurantsNavigation>()
    const websocket = new WebSocket('ws://' + SERVER_URL + JOIN_SESSION + route.params.sessionId + "/lungulescu's-lampooners")

    useEffect(() => {
        websocket.onopen = () => {
            console.log('Connected')
            send('JOIN')
            websocket.send(JSON.stringify({
                requestType: "joinSession",
                clientID: "lungulescu's-lampooners"
                }))
        }

        websocket.onmessage = (event) => {
            try {
                console.log(JSON.stringify(event, null, 2))
                const data = JSON.parse(event.data) 
                console.log('Event State: ' + data.State)
                if(data.MessageType == "stateEvent"){
                    console.log('stateEvent')
                    if (data.State == 'CurrRating') {
                        send('START_RATING')
                    }
        
                    if (data.State == 'Results') {
                        send('SEE_RESULTS')
                    }
                }else if(data.MessageType == "dataEvent"){
                    console.log('dataEvent')
                    setDatahubPayload(_ => parseDataHubPayload(event))
                }
            } catch (error) {
                console.log(error)
            }
        }

        return () => {
            console.log('Closing Session')
            websocket.close()
        }
    }, [])

    if (state.value === 'idle') {
        // Todo: convert to loading symbol
        return (
            <View> 
                <Text>
                    IDLE
                </Text>
            </View>
        )
    }

    if (state.value === 'joined') {
        return (
            <JoinedScreen 
                handleReadyUp={() => {
                    send('SET_READY')
                    websocket.send(JSON.stringify({
                        requestType : "startRating",
                        clientID : "lungulescu's-lampooners"
                      }))
                }}
                sessionId={route.params.sessionId}
            /> //consider passing a function
        )
    }

    if (state.value === 'ready') {
        return (
            <WaitingScreen 
                handleState={() => {
                    send('START_RATING')
                }}
                numOfUsersInSession={5}
                numOfUsersReady={3} 
            />
        )
    }

    if (state.value === 'currentlyRating') {
        return (
            <CurrentlyRatingScreen 
                handleFinishRating={() => {
                    send('FINISH_RATING')
                    websocket.send(JSON.stringify({
                        requestType : "finishRating",
                        clientID : "lungulescu's-lampooners"
                    }))
                }} 
                handleLikeRestaurant={(restaurantId: string) => {
                    websocket.send(JSON.stringify({
                        requestType: 'sendResult',
                        clientID: "lungulescu's-lampooners",
                        restaurantID: restaurantId
                    }))
                }}
                data={datahubPayload?.PlaceApiData.Results}
            />
        )
    }

    if (state.value === 'finishedRating') {
        return (
            <FinishedScreen />
        )
    }

    if (state.value === 'results') {
        return (
            <ResultsScreen 
                data={datahubPayload}
                handleClose={() => {
                    navigation.navigate('Homepage')
                }}
            />
        )
    }

    return <></> // Todo: error screen
}