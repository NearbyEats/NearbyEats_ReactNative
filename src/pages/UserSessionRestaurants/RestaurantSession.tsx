import { useMachine } from "@xstate/react";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { JOIN_SESSION, SERVER_URL } from "../../utils/Constants";
import { CurrentlyRatingScreen } from "./components/CurrentlyRatingScreen";
import { FinishedScreen } from "./components/FinishedRatingScreen";
import { JoinedScreen } from "./components/JoinedScreen";
import { ResultsScreen } from "./components/ResultsScreen";
import { WaitingScreen } from "./components/WaitingScreen";
import { RestaurantSessionMachine } from "./restaurantSessionMachine";

interface UserSessionRestaurantsProps {
    sessionId: string
}

export const UserSessionRestaurants = ({sessionId}: UserSessionRestaurantsProps) => {
    const [state, send] = useMachine(RestaurantSessionMachine)
    const websocket = new WebSocket('ws://' + SERVER_URL + JOIN_SESSION + sessionId)

    useEffect(() => {
        websocket.onopen = () => {
            console.log('connected')
            send('JOIN')
        }

        websocket.onmessage = (event) => {
            console.log(event)
        }

        return () => {
            websocket.close()
        }
    }, [])

    if (state.value === 'idle') {
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
            <JoinedScreen handleJoin={() => {
                send('SET_READY')
            }} /> //consider passing a function
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