import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated, Text, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import ph_1 from '@/assets/images/placeholder_1.png';
import ph_2 from '@/assets/images/placeholder_2.png';
import ph_3 from '@/assets/images/placeholder_3.png';
import SupportButton from '@/components/SupportButton';

const { width, height } = Dimensions.get('window');

SplashScreen.preventAutoHideAsync();

export default function Welcome() {
    const navigation = useNavigation();
    const [textIndex, setTextIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity value is 1

    const texts = [
        'Receba imediatamente',
        'Tudo ao seu alcance',
        'Relatórios'
    ];

    const subtexts = [
        'Receba o pagamento pelo plantão no mesmo dia em que ele é realizado',
        'Acompanhe a sua agenda de plantões de maneira eficiente',
        'Obtenha relatórios detalhados sobre os seus plantões e ganhos'
    ];

    const images = [ph_1, ph_2, ph_3];

    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                // Preload images
                await Promise.all([
                    Asset.loadAsync([ph_1, ph_2, ph_3]),
                ]);
            } catch (e) {
                console.warn(e);
            } finally {
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();

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
                    <Text style={styles.saldo2}>{subtexts[textIndex]}</Text>
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
            <SupportButton />
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
        marginBottom: height * 0.05,
        height: height * 0.3, // 30% of screen height
        width: width * 0.5, // 50% of screen width
    },
    saldo: {
        color: 'black',
        marginTop: height * 0.08, // 8% from top
        fontSize: width * 0.06, // Font size based on screen width
        textAlign: 'center', // Center text horizontally
        fontWeight: 'bold',
        lineHeight: height * 0.04,
    },
    saldo2: {
        color: 'black',
        fontSize: width * 0.04, // Font size based on screen width
        textAlign: 'center', // Center text horizontally
        paddingHorizontal: width * 0.05,
        marginVertical: height * 0.02,
    },
    buttonContainer: {
        alignItems: 'center', // Center buttons horizontally
        marginTop: height * 0.05,
    },
    button: {
        width: width * 0.8, // Adjust button width to 80% of screen width
        height: height * 0.07, // 7% of screen height
        backgroundColor: '#1c1b1b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: height * 0.015, // 1.5% of screen height

        // Add these lines to add shading
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
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