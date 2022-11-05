import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

interface ImageItemProps {
    source: string
    description?: string
    title?: string
}

interface Payload {
    item: ImageItemProps,
    index: number
}

export const ImageItem = ({item, index}: any) => {
    return (
        <View style={styles.imageItemContainer}>
            <Text>
                hereee
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    imageItemContainer: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    }
})