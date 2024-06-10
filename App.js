import {StyleSheet, View, SafeAreaView} from 'react-native';
import {StartGameScreen} from "./screens/StartGameScreen";
import {useMemo, useState} from "react";
import {GameScreen} from "./screens/GameScreen";

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

    return (
        <SafeAreaView style={styles.container}>
            {page}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5eea1'
    }
});
