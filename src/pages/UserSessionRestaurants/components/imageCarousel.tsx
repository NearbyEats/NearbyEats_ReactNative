import React from "react";
import { View } from "react-native";
import { useData } from "../images/data";
import Carousel from 'react-native-snap-carousel'
import { ImageItem } from "./imageItem";

export const ImageCarousel = () => {
    const data = useData 

    return (
        <View>
            <Carousel 
                layout="tinder"
                layoutCardOffset={0}
                data={data}
                renderItem={ImageItem}
                inactiveSlideShift={0}
                itemWidth={500}
                itemHeight={500}
                useScrollView={true}
            />
        </View>
    )
}