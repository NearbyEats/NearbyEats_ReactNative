import { useMachine } from "@xstate/react";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAPICreateSession } from "../../http/CreateSession";
import { JOIN_SESSION, SERVER_URL } from "../../utils/Constants";
import { CurrentlyRatingScreen } from "./components/CurrentlyRatingScreen";
import { FinishedScreen } from "./components/FinishedRatingScreen";
import { JoinedScreen } from "./components/JoinedScreen";
import { ResultsScreen } from "./components/ResultsScreen";
import { WaitingScreen } from "./components/WaitingScreen";
import { RestaurantSessionMachine } from "./restaurantSessionMachine";
import { DataHubPayload, parseDataHubPayload } from "./utils/DataParser";

interface UserSessionRestaurantsProps {
    
}

export const UserSessionRestaurants = ({}: UserSessionRestaurantsProps) => {
    const [state, send] = useMachine(RestaurantSessionMachine)
    const {isLoading, isError, data} = useAPICreateSession()
    const [datahubPayload, setDatahubPayload] = useState<DataHubPayload>()
    const websocket = new WebSocket('ws://' + SERVER_URL + JOIN_SESSION + data?.token + "/lungulescu's-lampooners")

    useEffect(() => {
        if (!isLoading && !isError) {
            websocket.onopen = () => {
                console.log('connected')
                send('JOIN')
                websocket.send(JSON.stringify({
                    requestType: "joinSession",
                    clientID: "lungulescu's-lampooners"
                  }))
            }
    
            websocket.onmessage = (event) => {
                console.log('EVENT: ' + JSON.stringify(event))
                const data = JSON.parse(event.data) 
                console.log('Event State: ' + data.State)
                if (data.State == 'CurrRating') {
                    send('START_RATING')
                    setDatahubPayload(() => parseDataHubPayload(event))
                }
            }

            return () => {
                websocket.close()
            }
        }
    }, [data])

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
                handleJoin={() => {
                    send('SET_READY')
                    websocket.send(JSON.stringify({
                        requestType : "startRating",
                        clientID : "lungulescu's-lampooners"
                      }))
                }}
                websocket={websocket}
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
            <CurrentlyRatingScreen handleJoin={() => {
                send('FINISH_RATING')
                websocket.send(JSON.stringify({
                    requestType : "finishRating",
                    clientID : "lungulescu's-lampooners"
                  }))
            }} 
                data={datahubPayload?.PlaceApiData.Results}
            /> //consider passing a function
        )
    }

    if (state.value === 'finishedRating') {
        return (
            <FinishedScreen
                numOfUsersInSession={5}
                numOfUsersFinished={3}
                handleState={() => {
                    send('SEE_RESULTS')
                }}
            />
        )
    }

    if (state.value === 'results') {
        return (
            <ResultsScreen />
        )
    }

    return <></> // Todo: error screen
}