import { Dimensions, StyleSheet, View } from "react-native"
// import { Animated } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

interface DialProps {
    x: string,
    y: string,
    insideRadius: string,
    insideGrowRatio?: string,
    insideColour: string,
    barWidth: string,
    barColour: string,
    percent: string,
}

export const Dial = ({
    x,
    y,
    insideRadius,
    insideGrowRatio,
    insideColour,
    barWidth,
    barColour,
    percent,
}: DialProps) => {

    const toDecimal = (percent: string): number => {
        return parseFloat(percent)/100
    }

    const cardinalX = toDecimal(x) * Dimensions.get("window").width
    const cardinalY = toDecimal(y) * Dimensions.get("window").height
    const cardinalRadius = cardinalX * toDecimal(insideRadius)
    const cardinalWidth = cardinalRadius * toDecimal(barWidth)
    const fillPercent = toDecimal(percent)
    console.log(percent)
    console.log(fillPercent)
    const actualRadius = insideGrowRatio !== undefined ? cardinalRadius - (1-fillPercent)*(cardinalRadius-(cardinalRadius * toDecimal(insideGrowRatio!))) : cardinalRadius

    return (
        <View style={dialStyles.svgContainer}>
            <Svg height='100%' width='100%'>
                <Circle
                    cx={cardinalX}
                    cy={cardinalY}
                    r={actualRadius}
                    fill={insideColour}  
                />
                <Circle
                    cx={cardinalX}
                    cy={cardinalY}
                    r={cardinalRadius+cardinalWidth/2}
                    fill="none"
                    stroke="rgba(65, 75, 75, 1)"
                    strokeWidth={cardinalWidth}
                    strokeDasharray={(actualRadius+cardinalWidth/2) * Math.PI * 2}
                />
                <Circle
                    cx={cardinalX}
                    cy={cardinalY}
                    r={cardinalRadius+cardinalWidth/2}
                    fill="none"
                    stroke={barColour}
                    strokeWidth={cardinalWidth}
                    strokeDasharray={((actualRadius+cardinalWidth/2) * Math.PI * 2)}
                    strokeDashoffset={((actualRadius+cardinalWidth/2) * Math.PI * 2)*(1-fillPercent)}  
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