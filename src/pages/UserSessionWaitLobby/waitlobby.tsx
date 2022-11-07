import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View } from 'react-native'
import { useSharedValue } from "react-native-reanimated";
import { Dial } from "./components/dial";

export const UserSessionWaitLobby = () => {
    const [counter, setCounter] = useState<number>(0)
    const sharedProgress = useSharedValue(0)

    useEffect(() => {
        console.log("--- NEW USEFFECT")
        console.log("counter", counter)
        sharedProgress.value = counter/5
    }, [counter])

    return <View style={waitLobbyStyles.lobbyContainer}>
        <View style={waitLobbyStyles.qrCodeandDialContainer}>
            <Dial x='50%'
                y='50%'
                insideRadius='35%'
                insideColour='rgba(0, 0, 255, 1)'
                barWidth='15%'
                barColour='rgba(255, 0, 0, 1)'
                progress={sharedProgress}
                insideGrowRatio='50%'
            />
        </View>
        <View style={waitLobbyStyles.readyButtonContainer}>
            <Button
                onPress={() => {
                    setCounter((counter) => counter >= 5 ? counter = 5 : counter += 1)
                }}
                title={String(counter)}
            />
        </View>
    </View>

}

const waitLobbyStyles = StyleSheet.create({
    qrCodeandDialContainer: {
        display: 'flex',
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    readyButtonContainer: {
        display: 'flex',
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lobbyContainer: {
        padding: 10,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
});