import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type HomepageNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Homepage'>

export const Homepage = () => {
    const navigation = useNavigation<HomepageNavigationProps>()

    return (
        <View style={styles.homepageContainer}>
            <View style={styles.homepageButtonsContainer}>
                <HomepageButton 
                    text={"Create Session"} 
                    backgroundColor={'grey'} 
                    color={'white'}
                    onPress={() => {
                        console.log('Routing to: CreateSession')
                        navigation.navigate('CreateSession')
                    }}
                />
                <HomepageButton 
                    text={"Join Session"} 
                    backgroundColor={'darkblue'} 
                    color={'white'} 
                    onPress={() => {
                        console.log('JoinSession')
                    }}
                />
            </View>
        </View>
    )
}

interface HomepageButtonProps {
    text: string
    color: string
    backgroundColor: string
    onPress: () => void
}

const HomepageButton = ({
    text, 
    color,
    backgroundColor,
    onPress,
}: HomepageButtonProps) => {    
    return (
        <SafeAreaView>
            <View style={[styles.buttonContainer, {backgroundColor: backgroundColor}]}>
                <Button 
                    onPress={onPress}
                    title={text}
                    color={color}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    homepageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    homepageButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 140,
        height: 40,
        borderRadius: 16,
    }
})