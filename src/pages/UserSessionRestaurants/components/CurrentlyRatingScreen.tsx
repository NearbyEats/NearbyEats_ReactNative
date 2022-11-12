import React, { useRef, useState } from "react";
import { View, Button, StyleSheet, PanResponder, Animated, Image, useWindowDimensions, Text } from "react-native";
import { useData } from '../images/data'

interface CurrentlyRatingScreenProps {
    handleJoin?: () => void
}

export const CurrentlyRatingScreen = ({handleJoin}: CurrentlyRatingScreenProps ) => {
    const windowSize = useWindowDimensions()
    const position = useRef(new Animated.ValueXY()).current
    const rotate = useRef(position.x.interpolate({
        inputRange: [-windowSize.width/2, 0, windowSize.width/2],
        outputRange: ['-10deg', '0deg', '10deg'],
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
                        speed: 100,
                        useNativeDriver: true
                    }).start(() => {
                        setCurrentIndex(currentIndex => currentIndex + 1)
                        position.setValue({x: 0, y: 0})
                    })
                } else if (gestureState.dx < -windowSize.width/3) {
                    Animated.spring(position, {
                        toValue: { x: -windowSize.width-100, y: gestureState.dy },
                        speed: 100,
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
    const data = useData
    const [currentIndex, setCurrentIndex] = useState(0)

    return (
        <View style={styles.currentlyRatingContainer}>
            {
                data.map((data, index) => {
                    if (index < currentIndex) {
                        return null
                    } else {
                        return (
                            <Animated.View 
                                {...(index == currentIndex ? panResponder.panHandlers : []) }
                                style={
                                    [
                                        styles.animatedContainer, 
                                        {transform: index == currentIndex ? [{rotate: rotate}, ...position.getTranslateTransform()] : []}
                                    ]
                                }
                                key={index}
                            >
                                <Text>
                                        {data.description}
                                </Text>
                            </Animated.View>
                        )
                    }
                }).reverse()
            }
        </View>
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
    },
    animatedContainer: {
        display: 'flex',
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '95%',
        borderRadius: 16,
        backgroundColor: 'red'
    }
})