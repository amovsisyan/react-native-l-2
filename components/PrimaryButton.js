import {View, Text, Pressable, StyleSheet} from "react-native";

export const PrimaryButton = ({ children, onPress }) => {
    return <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({ pressed }) => pressed ? [styles.button, styles.pressed] : styles.button}
                onPress={onPress}
                android_ripple={{color: '#3a0324'}}
            >
                <Text style={styles.text}>{children}</Text>
            </Pressable>
    </View>
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 24,
        overflow: "hidden",
        elevation: 18,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        alignItems: "center"
    },
    button: {
        backgroundColor: '#712352',
        paddingVertical: 8,
        paddingHorizontal: 18,
    },
    text: {
        color: '#fff',
        fontWeight: "bold",
    },
    pressed: {
        opacity: 0.75
    }
});