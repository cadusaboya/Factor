import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, ActivityIndicator, Dimensions, Linking } from 'react-native';
import { useNavigation, useFocusEffect, CommonActions } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { Icon } from '@rneui/themed';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const API_URL = 'https://api.factorpa.xyz';
  const { token, logout } = useAuth();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/accounts/user/cash/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout();
      Alert.alert('Servidor indisponível', 'Não foi possível carregar os dados, faça login novamente. Se o problema persistir, entre em contato com o suporte', 
      [
      {
          text: 'OK',
          onPress: () => {        
              // Navigate back to the login page or any other desired page
              navigation.dispatch(
                  CommonActions.reset({
                      index: 0,
                      routes: [
                      { name: 'Welcome' },
                      ],
                  })
                  );
          },
      },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const handleButtonPress = (menu) => {
    console.log(`Navigating to ${menu}`);
    navigation.navigate(menu);
  };

  const sendWhatsapp = () => {
    // Phone number in international format
    const phoneNumber = '+5591984147769';
  
    // Message you want to send
    const message = 'Olá, estou com um problema referente ao aplicativo Factor. Você pode me ajudar?    ';
  
    // Construct the WhatsApp URL
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  
    // Open the WhatsApp app
    Linking.openURL(whatsappUrl)
      .then(() => console.log('WhatsApp opened'))
      .catch((error) => console.error('Error opening WhatsApp:', error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <ThemedText style={styles.saldo}>Saldo disponível</ThemedText>
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <ThemedText style={styles.valor}>R$ {userData?.cash.toFixed(2)}</ThemedText>
        )}
      </View>

      <View style={styles.center}>
        <View style={styles.row}>
          <View style={styles.supPosition}>
            <Icon
                reverse
                name='cash-multiple'
                type= 'material-community'
                color='black'
                size={82}
                onPress={() => handleButtonPress('Antecipação')} />
            <Text style={styles.buttonText}>Antecipar</Text>
          </View>
          <View style={styles.supPosition}>
            <Icon
                reverse
                name='clipboard-text-clock-outline'
                type= 'material-community'
                color='black'
                size={82}
                onPress={() => handleButtonPress('Meus Pedidos')} />
            <Text style={styles.buttonText}>Meus Pedidos</Text>
          </View>
        </View>
        <View style={styles.row}>
        <View style={styles.supPosition}>
            <Icon
                reverse
                name='face-agent'
                type= 'material-community'
                color='black'
                size={82}
                onPress={() => handleButtonPress('Suporte')} />
            <Text style={styles.buttonText}>Suporte</Text>
          </View>
          <View style={styles.supPosition}>
            <Icon
                reverse
                name='hospital-building'
                type= 'material-community'
                color='black'
                size={82}
                onPress={() => handleButtonPress('Meus Hospitais')} />
            <Text style={styles.buttonText}>Meus Hospitais</Text>
          </View>
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
  overlay: {
    height: height * 0.15, // 20% of screen height
    marginBottom: height * 0.05, // 5% of screen height
    backgroundColor: '#1c1b1b',
    justifyContent: 'center',
  },
  saldo: {
    color: 'white',
    fontSize: width * 0.06, // 6% of screen width
    marginLeft: width * 0.05,
    fontWeight: 'bold',
    lineHeight: height * 0.04,
  },
  valor: {
    marginLeft: width * 0.15,
    color: 'white',
    fontSize: width * 0.06, // 6% of screen width
    fontWeight: 'bold',
    lineHeight: height * 0.04,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.05, // 5% of screen height
  },
  buttonText: {
    color: 'black',
    fontSize: width * 0.03, // 4% of screen width
    fontWeight: 'bold',
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.05, // 5% of screen height
  },
  supPosition: {
    justifyContent: 'center',
    alignItems: 'center',

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
});