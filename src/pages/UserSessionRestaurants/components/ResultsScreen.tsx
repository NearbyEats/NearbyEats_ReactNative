import React from "react"
import { Text, StyleSheet, SafeAreaView, View, Button } from "react-native"
import { DataHubPayload } from "../utils/DataParser"
import { SingleRestaurant } from "./SingleRestaurant"

interface ResultsScreenProps {
    data: DataHubPayload | undefined
    handleClose: () => void
}

export const ResultsScreen = ({
    data,
    handleClose
}: ResultsScreenProps) => {
    return (
        <SafeAreaView style={styles.resultsScreenContainer}>
            <View style={styles.resultContainer}>
                <Text
                    style={{
                        borderWidth: 2,
                        borderColor: "#169d0a",
                        color: "#169d0a",
                        fontSize: 20,
                        fontWeight: "800",
                        padding: 10,
                    }}
                >
                    RESTAURANT CHOSEN!
                </Text>
            </View>
            <View style={styles.restaurantContainer}>
                <SingleRestaurant 
                    name={data?.ResultsData.SearchResult[0].name}
                    photo={data?.ResultsData.SearchResult[0].photos[0]} 
                    address={data?.ResultsData.SearchResult[0].vicinity}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    title="Close Session"
                    color="white"
                    onPress={handleClose}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    resultsScreenContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    restaurantContainer: {
        width: '95%',
        height: '95%',
        borderRadius: 16,
        borderWidth: 2,
    },
    buttonContainer: {
        width: 'auto',
        height: 'auto',
        padding: 10,
        borderRadius: 16,
        backgroundColor: '#2889b0',
        position: 'absolute',
        bottom: 100,
        zIndex: 5,
    },
    resultContainer: {
        position: 'absolute',
        top: 100,
        justifyContent: 'center',
        padding: 25,
        borderRadius: 35,
        backgroundColor: 'rgba(181, 181, 181, 0.8)',
        zIndex: 6,
        transform: [{ rotate: "-20deg" }],
    },
})