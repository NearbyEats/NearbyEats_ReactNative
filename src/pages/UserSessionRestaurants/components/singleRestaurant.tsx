import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { PLACE_API_KEY } from "../../../utils/Constants";
import { Photo } from "../utils/DataParser";

interface SingleRestaurantProps {
    name: string
    photo: Photo
    address: string
}

export const SingleRestaurant = ({
    name,
    photo,
    address,
}: SingleRestaurantProps) => {
    const photoURLFormatter = (photo: Photo) => {
        return 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=' + photo.width + '&photo_reference=' + photo.photo_reference + '&key=' + PLACE_API_KEY
    }

    return <View style={styles.container}>
        <Image 
            style={styles.imageContainer}
            source={{uri: photoURLFormatter(photo)}}
        />
        <View style={styles.textContainer}>
            <Text style={{fontSize: 24, marginBottom: 5}}>
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
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    textContainer: {
        flex: 1,
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 20,
    },
})