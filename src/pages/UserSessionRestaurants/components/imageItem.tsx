import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

interface ImageItemProps {
    source: string
    index: number 
    length: number
}


export const ImageItem = ({
    source,
    index,
    length
}: ImageItemProps) => {
    return (
        <View style={styles.imageItemContainer}>
            <Image 
                source={{ uri: source }}
                style={styles.image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imageItemContainer: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 10
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
        zIndex: 1,
    }
})