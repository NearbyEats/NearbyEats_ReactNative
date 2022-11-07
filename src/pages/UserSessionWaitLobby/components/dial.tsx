import { Dimensions, StyleSheet, View } from "react-native"
import Animated, { log, useAnimatedProps, useDerivedValue, withTiming } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

interface DialProps {
    x: string,
    y: string,
    insideRadius: string,
    insideGrowRatio?: string,
    insideColour: string,
    barWidth: string,
    barColour: string,
    progress: Animated.SharedValue<number>,
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const Dial = ({
    x,
    y,
    insideRadius,
    insideGrowRatio,
    insideColour,
    barWidth,
    barColour,
    progress,
}: DialProps) => {

    const toDecimal = (percent: string): number => {
        return parseFloat(percent)/100
    }

    const cardinalX = toDecimal(x) * Dimensions.get("window").width
    const cardinalY = toDecimal(y) * Dimensions.get("window").height
    const cardinalRadius = cardinalX * toDecimal(insideRadius)
    const cardinalWidth = cardinalRadius * toDecimal(barWidth)
    const actualRadius = insideGrowRatio !== undefined ? cardinalRadius - (1-progress.value)*(cardinalRadius-(cardinalRadius * toDecimal(insideGrowRatio!))) : cardinalRadius
    const fullArcOffset = (actualRadius+cardinalWidth/2) * Math.PI * 2

    const newOffset = useDerivedValue(() => {
        return withTiming(progress.value*fullArcOffset, {
            duration: 500,
          })
    }, [progress.value])

    const newBOffset = useDerivedValue(() => {
        return fullArcOffset - newOffset.value
    }, [newOffset.value])

    const animatedBarProps = useAnimatedProps(() => {
        return {strokeDashoffset: newBOffset.value}
    });

    return (
        <View style={dialStyles.svgContainer}>
            <Svg height='100%' width='100%'>
                <AnimatedCircle
                    cx={cardinalX}
                    cy={cardinalY}
                    r={actualRadius}
                    fill={insideColour}  
                />
                <AnimatedCircle
                    cx={cardinalX}
                    cy={cardinalY}
                    r={actualRadius+cardinalWidth/2}
                    fill="none"
                    stroke="rgba(65, 75, 75, 1)"
                    strokeWidth={cardinalWidth}
                    strokeDasharray={(actualRadius+cardinalWidth/2) * Math.PI * 2}
                    strokeLinecap="round"
                />
                <AnimatedCircle
                    animatedProps={animatedBarProps}
                    cx={cardinalX}
                    cy={cardinalY}
                    r={actualRadius+cardinalWidth/2}
                    fill="none"
                    stroke={barColour}
                    strokeWidth={cardinalWidth}
                    strokeDasharray={fullArcOffset}
                    strokeLinecap="round" 
                />
            </Svg>
        </View>
    )
}

const dialStyles = StyleSheet.create({
    svgContainer: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});