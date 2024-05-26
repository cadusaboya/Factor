import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';

export default function HomeScreen() {
  const navigation = useNavigation();
  const API_URL = 'https://factor-cadusaboya.loca.lt';
  const { token } = useAuth(); // Retrieve the token using the useAuth hook

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/cash/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Fetch user data every time the screen gains focus
      fetchUserData();
    }, [])
  );

  const handleButtonPress = (menu) => {
    console.log(`Navigating to ${menu}`);
    navigation.navigate(menu); // Navigate to the desired screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <ThemedText style={styles.saldo}>Saldo disponível:</ThemedText>
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <ThemedText style={styles.valor}>R$ {userData?.cash}</ThemedText>
        )}
      </View>

      <View style={styles.center}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('Antecipação')}>
            <Text style={styles.buttonText}>Antecipação</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('Meus Pedidos')}>
            <Text style={styles.buttonText}>Meus Pedidos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('Mensagens')}>
            <Text style={styles.buttonText}>Mensagens</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('Meus Hospitais')}>
            <Text style={styles.buttonText}>Meus hospitais</Text>
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
  overlay: {
    height: 150,
    marginBottom: 50,
    backgroundColor: '#1c1b1b',
  },
  saldo: {
    color: 'white',
    marginTop: 50,
    marginHorizontal: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  valor: {
    marginHorizontal: 50,
    marginTop: 10,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  button: {
    width: 150,
    height: 150, // Adjust button height as needed
    backgroundColor: '#1c1b1b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginHorizontal: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  center: {
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    marginVertical: 100,
  },
});