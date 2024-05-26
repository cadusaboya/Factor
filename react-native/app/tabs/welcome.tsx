import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';

const { width, height } = Dimensions.get('window');

export default function BemVindo() {
    const navigation = useNavigation();

    const handleButtonPress = (menu) => {
        console.log(`Navigating to ${menu}`);
        navigation.navigate(menu); // Navigate to the desired screen
    };

    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <ThemedText style={styles.saldo}>Em breve, Factor</ThemedText>
                <ThemedText style={styles.saldo2}>Criada para facilitar a vida dos médicos</ThemedText>
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleButtonPress('Registro')}
                    >
                        <ThemedText style={styles.buttonText}>Criar Conta</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleButtonPress('Entrar')}
                    >
                        <ThemedText style={styles.buttonText}>Já sou usuário</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7E7E7',
    },
    saldo: {
        color: 'black',
        marginTop: height * 0.25, // 25% from top
        marginBottom: height * 0.03, // 5% from bottom
        fontSize: width * 0.06, // Font size based on screen width
        fontWeight: 'bold',
        textAlign: 'center', // Center text horizontally
        lineHeight: height * 0.04,
    },
    saldo2: {
        color: 'black',
        marginBottom: height * 0.25, // 25% from bottom
        fontSize: width * 0.05, // Font size based on screen width
        textAlign: 'center', // Center text horizontally
        lineHeight: height * 0.04,
    },
    buttonContainer: {
        alignItems: 'center', // Center buttons horizontally
    },
    button: {
        width: width * 0.8, // Adjust button width to 80% of screen width,
        height: height * 0.07, // 7% of screen height
        backgroundColor: '#1c1b1b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginVertical: height * 0.015, // 1.5% of screen height
    },
    buttonText: {
        color: 'white',
        fontSize: width * 0.04, // Font size based on screen width
        fontWeight: 'bold',
        lineHeight: height * 0.03,
    },
    center: {
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically
        flex: 1, // Take up full height of screen
    },
});