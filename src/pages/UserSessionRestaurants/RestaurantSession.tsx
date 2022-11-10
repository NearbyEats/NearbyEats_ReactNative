import { useMachine } from "@xstate/react";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { JOIN_SESSION, SERVER_URL } from "../../utils/Constants";
import { JoinedScreen } from "./components/JoinedScreen";
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
            <View style={styles.wrapper}>
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
            <WaitingScreen numOfUsersInSession={5} numOfUsersReady={3} />
        )
    }
    
    return <View style={styles.wrapper}>
        <View style={styles.restaurantWrapper}>
            <Text>
                Filler
            </Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        borderRadius: 16,
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    restaurantWrapper: {
        width: '100%',
        height: '100%',
    },
})
