import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ph_1 from '@/assets/images/placeholder_1.png';
import ph_2 from '@/assets/images/placeholder_2.png';
import ph_3 from '@/assets/images/placeholder_3.png';

const { width, height } = Dimensions.get('window');

export default function Welcome() {
    const navigation = useNavigation();
    const [textIndex, setTextIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity value is 1

    const texts = [
        'Factor',
        'Para facilitar a vida dos médicos',
        'Em Breve'
    ];

    const images = [ph_1, ph_2, ph_3];

    useEffect(() => {
        // Initial delay before starting the fade-out sequence
        const initialDelay = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0, // Fade out
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }, 4000); // Wait for 4 seconds before starting the fade-out

        const interval = setInterval(() => {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1, // Fade in
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.delay(3000), // Wait for 3 seconds
                Animated.timing(fadeAnim, {
                    toValue: 0, // Fade out
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start();

            setTextIndex(prevIndex => (prevIndex + 1) % texts.length);
        }, 5000);

        return () => {
            clearTimeout(initialDelay);
            clearInterval(interval);
        };
    }, [fadeAnim, texts.length]);

    const handleButtonPress = (menu) => {
        console.log(`Navigating to ${menu}`);
        navigation.navigate(menu); // Navigate to the desired screen
    };

    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Animated.View style={[styles.center_animation, { opacity: fadeAnim }]}>
                    <Text style={styles.saldo}>{texts[textIndex]}</Text>
                    <Image source={images[textIndex]} style={[styles.image]} resizeMode="contain" />
                </Animated.View>
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleButtonPress('Registro')}
                    >
                        <Text style={styles.buttonText}>Criar Conta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleButtonPress('Entrar')}
                    >
                        <Text style={styles.buttonText}>Já sou usuário</Text>
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
    image: {
        marginTop: height * 0.01,
        marginBottom: height * 0.1,
    },
    saldo: {
        color: 'black',
        marginTop: height * 0.08, // 15% from top
        fontSize: width * 0.06, // Font size based on screen width
        textAlign: 'center', // Center text horizontally
        lineHeight: height * 0.04,
    },
    buttonContainer: {
        alignItems: 'center', // Center buttons horizontally
    },
    button: {
        width: width * 0.8, // Adjust button width to 80% of screen width
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
    center_animation: {
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically
    },
});