import {useCallback, useEffect, useMemo, useState} from "react";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {StartGameScreen} from "./screens/StartGameScreen";
import {GameScreen} from "./screens/GameScreen";
import {useFonts} from "expo-font";

export default function App() {
    const [pickedNumber, setPickedNumber] = useState(0);

    const onSetPickedNumber = (number) => {
        setPickedNumber(number)
    }

    const page = useMemo(() => {
        if (pickedNumber) {
            return <GameScreen pickedNumber={pickedNumber}/>
        }

        return <StartGameScreen onSetPickedNumber={onSetPickedNumber}/>;
    }, [pickedNumber])

    const [loaded] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    })

    const onLayoutRootView = useCallback(async () => {
        if (loaded) {
            await SplashScreen.hideAsync();
        }
    }, [loaded]);


    if (!loaded) {
        return null;
    }

    return (
        <View
            style={{ flex: 1 }}
            onLayout={onLayoutRootView}>
            <SafeAreaView style={styles.container}>
                {page}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5eea1'
    }
});
