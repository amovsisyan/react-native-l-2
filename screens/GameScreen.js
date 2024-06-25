import {Alert, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {PrimaryButton} from "../components/PrimaryButton";

const generateRandomNumber = (max, min, exclude) => {
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    if (randomNumber === exclude) {
        return generateRandomNumber(max, min, exclude);
    } else {
        return randomNumber
    }
}

let currentMin = 1;
let currentMax = 100;

export const GameScreen = ({ pickedNumber }) => {
    const [guess, setGuess] = useState(generateRandomNumber(1, 100, pickedNumber))
    const [logs, setLogs] = useState([])

    useEffect(() => {
        if (guess === pickedNumber) {
            Alert.alert(
                "Win",
                `Congratulations You Win! Correct number is ${pickedNumber}`,
                [
                    {
                        text: 'Start Again',
                        onPress: () => {console.log(123123);}
                    }
                ]
            );
        }

    }, [guess, pickedNumber])

    const checkSuccess = (direction, oldGuess) => {
        const newRandom = generateRandomNumber(currentMin, currentMax, 0)
        setGuess(newRandom)

        if (newRandom !== pickedNumber) {
            setLogs([...logs, {direction, value: oldGuess}]);
        }
    }

    const warnLie = () => {
        Alert.alert("do not lie");
    }

    const isHigher = () => {
        if (pickedNumber > guess) {
            currentMin = guess + 1;
            checkSuccess('high', guess)
        } else {
            warnLie()
        }
    }

    const isLower = () => {
        if (pickedNumber < guess) {
            currentMax = guess - 1;
            checkSuccess('low', guess)
        } else {
            warnLie()
        }
    }

    return <View style={styles.container}>
        <Text style={styles.title}>Opponent's Guess</Text>
        <Text style={styles.guess}>{guess}</Text>
        <Text style={styles.guess}>Is it Higher or Lower ?</Text>
        <View style={styles.buttonsWrapper}>
            <PrimaryButton onPress={isHigher}>
                <Ionicons name="add-circle" size={24} color={"white"} />
            </PrimaryButton>
            <PrimaryButton onPress={isLower}>
                <Ionicons name="remove-circle" size={24} color={"white"} />
            </PrimaryButton>
        </View>
        {
            logs.length ? <View style={styles.logsWrapper}>
                {
                    logs.map((log, i) => <Text
                            key={log.value}
                            style={styles.logItem}
                        >
                            {i+1}- It Should be {log.direction}er than {log.value}.
                        </Text>
                    )
                }
            </View> : null
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#e234a4',
        textAlign: 'center'
    },
    guess: {
        marginTop: 24,
        fontSize: 24,
        fontWeight: "bold",
        color: '#640f44',
        textAlign: 'center'
    },
    buttonsWrapper: {
        flexDirection: 'row',
        gap: 24,
        justifyContent: 'center',
        marginTop: 36
    },
    logsWrapper: {
        marginTop: 24,
        padding: 12,
        borderRadius: 6,
        backgroundColor: "#bbcc55"
    },
    logItem: {
        color: "#0c99ee",
        fontSize: 18,
        fontWeight: "bold",
        lineHeight: 36
    }
})