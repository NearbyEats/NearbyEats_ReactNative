import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useData } from "../images/data";
import { ImageItem } from "./imageItem";
import Carousel from 'react-native-reanimated-carousel';


export const ImageCarousel = () => {
    const data = useData 
    const width = Dimensions.get('window').width;
    const [imageIndex, setImageIndex] = useState(0)

    return (
        <View style={{position: 'relative'}}>
            <View style={styles.itemNumberContainer}>
                <Text style={styles.itemNumberText}>
                    {imageIndex}/{data.length}
                </Text>
            </View>
            <Carousel 
                width={width}
                data={data}
                scrollAnimationDuration={500}
                onSnapToItem={(index) => {
                    console.log('current index:', index)
                    setImageIndex(index+1)
                }}
                renderItem={({index}) => {
                    return (
                        <ImageItem source={data[index].source} index={index} length={data.length} />
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    itemNumberContainer: {
        position: 'absolute',
        right: 30,
        top: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        width: 35,
        borderRadius: 35/2,
        backgroundColor: 'grey',
        opacity: 0.8,
        zIndex: 2,
    },
    itemNumberText: {
        color: 'white'
    }
})