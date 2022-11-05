import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useData } from "../images/data";
import { ImageCarousel } from "./imageCarousel";

interface SingleRestaurantProps {
    name?: string,
    rating?: number,
    address?: string,
}

export const SingleRestaurant = ({
    name,
    rating,
    address,
}: SingleRestaurantProps) => {
    const data = useData

    return <View style={styles.container}>
        <View style={styles.imageContainer}>
            <ImageCarousel />
        </View>
        <View style={styles.textContainer}>
            <Text style={{fontSize: 20}}>
                {name}
            </Text>
            <Text style={{fontSize: 14}}>
                {address}
            </Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    imageContainer: {
        flex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
    },
    textContainer: {
        flex: 1,
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
})