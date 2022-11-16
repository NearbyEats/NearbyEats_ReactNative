import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, PanResponder, Animated, Image, useWindowDimensions, Text, ScaledSize, SafeAreaView } from "react-native";
import { PlacesSearchResult } from "../utils/DataParser";
import { SingleRestaurant } from "./SingleRestaurant";

interface CurrentlyRatingScreenProps {
    handleFinishRating: () => void
    handleLikeRestaurant: (restaurantId: string) => void
    data: PlacesSearchResult[] | undefined
}

export const CurrentlyRatingScreen = ({handleFinishRating, handleLikeRestaurant, data}: CurrentlyRatingScreenProps ) => {
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
    const panResponderRef = useRef(
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
                        setLastSwipeResult(_ => true)
                        setCurrentIndex(currentIndex => {
                            return currentIndex + 1
                        })
                        position.setValue({x: 0, y: 0})
                    })
                } else if (gestureState.dx < -windowSize.width/3) {
                    Animated.spring(position, {
                        toValue: { x: -windowSize.width-50, y: gestureState.dy },
                        speed: 200,
                        useNativeDriver: true
                    }).start(() => {
                        setLastSwipeResult(_ => false)
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
    )
    const [currentIndex, setCurrentIndex] = useState(0)
    const [lastSwipeResult, setLastSwipeResult] = useState<boolean>(false)

    useEffect(() => {
        if (lastSwipeResult && data != undefined) {
            console.log('LIKED: ' + data[currentIndex-1].name)
            //handleLikeRestaurant(data[currentIndex-1].place_id)
        }

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
                                    {...(index == currentIndex ? panResponderRef.current.panHandlers : []) }
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
})
