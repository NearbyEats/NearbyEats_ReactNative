import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import QRCode from "react-qr-code";

interface JoinedScreenProps {
    handleReadyUp: () => void
    sessionId: string
}

export const JoinedScreen = ({handleReadyUp, sessionId}: JoinedScreenProps ) => {
    return (
        <View style={styles.joinContainer}>
            <View>
                <Text style={{fontSize: 35, padding: 30, textAlign: 'center'}}>
                    Your session has been generated!
                </Text>
                <View style={styles.qrCode}>
                    <QRCode
                        value={sessionId}
                        bgColor='#eee'
                    />
                </View>
            </View>
            <View style={styles.buttonStyle}>
                <Button 
                    title='Join Session'
                    color='white'
                    onPress={handleReadyUp}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    joinContainer: {
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