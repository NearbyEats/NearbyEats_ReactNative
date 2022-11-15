import React, { useEffect, useRef, useState } from "react";
import { View, Button, StyleSheet, PanResponder, Animated, Image, useWindowDimensions, Text, ScaledSize, SafeAreaView } from "react-native";
import { PLACE_API_KEY } from "../../../utils/Constants";
import { useData } from '../images/data'
import { Photo, PlacesSearchResult } from "../utils/DataParser";

interface CurrentlyRatingScreenProps {
    handleFinishRating: () => void
    data: PlacesSearchResult[] | undefined
}

export const CurrentlyRatingScreen = ({handleFinishRating, data}: CurrentlyRatingScreenProps ) => {
    const windowSize = useWindowDimensions()
    const position = useRef(new Animated.ValueXY()).current
    const rotate = useRef(position.x.interpolate({
        inputRange: [-windowSize.width/2, 0, windowSize.width/2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp'
    })).current
    const nextCardScale = useRef(position.x.interpolate({
        inputRange: [-windowSize.width/2, 0, windowSize.width/2],
        outputRange: [1,0.8,1],
        extrapolate: 'clamp'
    })).current
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                position.setValue({x: gestureState.dx, y: gestureState.dy})
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > windowSize.width/3) {
                    Animated.spring(position, {
                        toValue: { x: windowSize.width+50, y: gestureState.dy },
                        speed: 200,
                        useNativeDriver: true
                    }).start(() => {
                        setCurrentIndex(currentIndex => currentIndex + 1)
                        position.setValue({x: 0, y: 0})
                    })
                } else if (gestureState.dx < -windowSize.width/3) {
                    Animated.spring(position, {
                        toValue: { x: -windowSize.width-50, y: gestureState.dy },
                        speed: 200,
                        useNativeDriver: true
                    }).start(() => {
                        setCurrentIndex(currentIndex => currentIndex + 1)
                        position.setValue({x: 0, y: 0})
                    })
                } else {
                    Animated.spring(position, {
                        toValue: { x: 0, y: 0 },
                        friction: 4,
                        useNativeDriver: true,
                    }).start()
                }
            }
        })
    ).current
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if ( data != undefined && currentIndex >= data.length) {
            handleFinishRating()
        }
    }, [currentIndex])

    return (
        <SafeAreaView>
            <View style={styles.currentlyRatingContainer}>
                {
                    data?.map((data, index) => {
                        if (index < currentIndex) {
                            return null
                        } else {
                            return (
                                <Animated.View 
                                    {...(index == currentIndex ? panResponder.panHandlers : []) }
                                    style={
                                        [
                                            styles.animatedContainer, 
                                            {transform: index == currentIndex ? [{rotate: rotate}, ...position.getTranslateTransform()] : [{scale: nextCardScale}]},
                                        ]
                                    }
                                    key={index}
                                >
                                    {index == currentIndex ? <PreferenceIndicator position={position} windowSize={windowSize} /> : null}
                                    <SingleRestaurant 
                                        name={data.name}
                                        address={data.vicinity}
                                        photo={data.photos[0]}
                                    />
                                </Animated.View>
                            )
                        }
                    }).reverse()
                }
            </View>
        </SafeAreaView>
    )
}

interface SingleRestaurantProps {
    name: string
    photo: Photo
    address: string
}

const SingleRestaurant = ({
    name,
    photo,
    address,
}: SingleRestaurantProps) => {
    const data = useData

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

interface PreferenceIndicatorProps {
    position: Animated.ValueXY,
    windowSize: ScaledSize
}

const PreferenceIndicator = ({
    position,
    windowSize
}: PreferenceIndicatorProps) => {
    const likeOpacity = useRef(position.x.interpolate({
        inputRange: [-windowSize.width / 2, 0, windowSize.width / 2],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp'
    })).current

    const nopeOpacity = useRef(position.x.interpolate({
        inputRange: [-windowSize.width / 2, 0, windowSize.width / 2],
        outputRange: [1, 0, 0],
        extrapolate: 'clamp'
    })).current
    return (
        <>
            <Animated.View
                style={{
                    opacity: likeOpacity,
                    transform: [{ rotate: "-30deg" }],
                    position: "absolute",
                    top: 50,
                    left: 40,
                    zIndex: 1000
                }}
            >
                <Text
                    style={{
                        borderWidth: 1,
                        borderColor: "green",
                        color: "green",
                        fontSize: 32,
                        fontWeight: "800",
                        padding: 10
                    }}
                >
                    LIKE
                </Text>
            </Animated.View>
            <Animated.View
                style={{
                    opacity: nopeOpacity,
                    transform: [{ rotate: "30deg" }],
                    position: "absolute",
                    top: 50,
                    right: 40,
                    zIndex: 1000
                }}
            >
                <Text
                    style={{
                        borderWidth: 1,
                        borderColor: "red",
                        color: "red",
                        fontSize: 32,
                        fontWeight: "800",
                        padding: 10
                    }}
                >
                    NOPE
                </Text>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    currentlyRatingContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    animatedContainer: {
        display: 'flex',
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '95%',
        width: '95%',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        borderWidth: 2,
    },
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
