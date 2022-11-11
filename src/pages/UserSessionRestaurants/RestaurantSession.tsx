import { useMachine } from "@xstate/react";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAPICreateSession } from "../../http/CreateSession";
import { JOIN_SESSION, SERVER_URL } from "../../utils/Constants";
import { CurrentlyRatingScreen } from "./components/CurrentlyRatingScreen";
import { FinishedScreen } from "./components/FinishedRatingScreen";
import { JoinedScreen } from "./components/JoinedScreen";
import { ResultsScreen } from "./components/ResultsScreen";
import { WaitingScreen } from "./components/WaitingScreen";
import { RestaurantSessionMachine } from "./restaurantSessionMachine";
import { parseDataHubPayload } from "./utils/DataParser";

interface UserSessionRestaurantsProps {
    sessionId: string
}

export const UserSessionRestaurants = ({sessionId}: UserSessionRestaurantsProps) => {
    const [state, send] = useMachine(RestaurantSessionMachine)
    const {isLoading, isError, data} = useAPICreateSession()
    console.log('DATA:' + JSON.stringify(data))
    const websocket = new WebSocket('ws://' + SERVER_URL + JOIN_SESSION + data?.token + "/lungulescu's-lampooners")

    useEffect(() => {
        if (!isLoading && !isError) {
            console.log('App started') 
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
                //console.log("Data recieved: " + data + data.Results[0])
                console.log('Event State: ' + data.State)
                console.log('Machine State: ' + state.value)
                if (data.State === 'CurrRating' && state.value === 'ready') {
                    console.log('SET_READY')
                    send('SET_READY')
                } else if (data.State === 'CurrRating' && state.value === 'currentlyRating') {
                    console.log('PARSING DATA ----')
                    const output = parseDataHubPayload(event)
                    console.log("PlaceApiDate: " + JSON.stringify(output.PlaceApiData))
                }
            }
    
            return () => {
                websocket.close()
            }
        }
    }, [isLoading, isError, state.value])

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
                    console.log('SET_READY')
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
            }} /> //consider passing a function
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