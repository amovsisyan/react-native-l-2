import { View, TextInput, StyleSheet, Alert } from 'react-native';
import {PrimaryButton} from "../components/PrimaryButton";
import {useState} from "react";

const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string)

export const StartGameScreen = ({ onSetPickedNumber }) => {
    const [gameNumber, setGameNumber] = useState(0);
    const onNumberChange = (number) => {
        setGameNumber(number)
    }

    const confirmNumber = () => {
        if (isNumeric(gameNumber) && +gameNumber > 0 && +gameNumber <= 99) {
            onSetPickedNumber(+gameNumber);
        } else {
            Alert.alert(
                "Invalid number",
                "Input must be an integer between 0 and 100",
                [
                    {text: 'OKKK', onPress: resetNumber}
                ]
            )
        }
    }

    const resetNumber = () => {
        setGameNumber('');
    }

    return <View style={styles.container}>
        <TextInput
            value={gameNumber}
            style={styles.input}
            maxLength={2} keyboardType="number-pad"
            onChangeText={onNumberChange}
        />
        <View style={styles.buttonsWrapper}>
            <PrimaryButton onPress={confirmNumber}>Confirm</PrimaryButton>
            <PrimaryButton onPress={resetNumber}>Reset</PrimaryButton>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginHorizontal: 24,
        borderRadius: 8,
        backgroundColor: '#456123',
        elevation: 18,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        alignItems: "center"
    },
    input: {
        height: 50,
        fontSize: 32,
        borderBottomColor: '#712352',
        borderBottomWidth: 1,
        marginVertical: 24,
        color: '#712352',
        fontWeight: "bold",
        width: 50,
        textAlign: 'center'
    },
    buttonsWrapper: {
        flexDirection: 'row',
        gap: 24
    }
});