import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Text, Divider } from '@rneui/themed';
import Checkbox from 'expo-checkbox';
import WhiteBox from '@/components/whiteBox';
import { ButtonSolid } from 'react-native-ui-buttons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import Axios for making HTTP requests
import HPDImage from '@/assets/images/PD.png';
import CSTImage from '@/assets/images/HCST.png';
import STImage from '@/assets/images/HST.png';
import { useAuth } from '@/hooks/useAuth';

export default function Tab4Screen() {
  const navigation = useNavigation();
  const API_URL = 'https://factor-cadusaboya.loca.lt';
  const { token } = useAuth(); // Retrieve the token using the useAuth hook

  const [checkboxStates, setCheckboxStates] = useState({
    1: false, // checkbox1
    2: false, // checkbox2
    3: false, // checkbox3
  });

  useEffect(() => {
    // Fetch the hospitals the logged-in user works on
    axios.get(`${API_URL}/user/hospitals/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => {
      // Update the checkbox states based on the user's hospitals
      const hospitalIds = response.data;
      const newCheckboxStates = { ...checkboxStates };
      hospitalIds.forEach(id => {
        newCheckboxStates[id] = true;
      });
      setCheckboxStates(newCheckboxStates);
    })
    .catch(error => {
      console.error('Error fetching user hospitals:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao processar as informações. Por favor, tente novamente mais tarde.');
    });
  }, []);

  const handleCheckboxChange = (key) => {
    setCheckboxStates(prevStates => ({
      ...prevStates,
      [key]: !prevStates[key], // Toggle the state of the checkbox at the specified key
    }));
  };

  const handleButtonPress = () => {
    // Get the hospitals selected by the user
    const selectedHospitals = Object.keys(checkboxStates).filter(key => checkboxStates[key]);

    // Send a POST request to create a user request
    axios.post(`${API_URL}/submit_request/`, {
      hospitals: selectedHospitals,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      // Show an alert indicating success
      Alert.alert(
        'Em análise',
        'Em breve seu saldo será atualizado',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back to the main page
              navigation.goBack(); // or navigation.navigate('Home') if 'Home' is the name of the main page
            },
          },
        ]
      );
    })
    .catch(error => {
      console.error('Error submitting user request:', error);
      // Show an alert indicating failure
      Alert.alert('Erro', 'Ocorreu um erro ao enviar a solicitação. Por favor, tente novamente mais tarde.');
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.head}>Hospitais credenciados </Text>
        </View>

        <View style={styles.box}>
          <WhiteBox width={350} height={500}>
            {[{ key: 2, image: HPDImage }, { key: 1, image: CSTImage }, { key: 3, image: STImage }].map(({ key, image }) => (
              <React.Fragment key={key}>
                <View style={styles.option}>
                  <Checkbox
                    style={styles.checkbox}
                    value={checkboxStates[key]}
                    onValueChange={() => handleCheckboxChange(key)}
                    color={checkboxStates[key] ? 'green' : undefined}
                  />
                  <Image source={image} style={styles.image} resizeMode="contain" />
                </View>
                
                <View style={styles.divider} />
              </React.Fragment>
            ))}
          </WhiteBox>
        </View>

        <View style={styles.but}>
          <ButtonSolid
            title={'Atualizar'}
            useColor={'rgb(0, 0, 0)'}
            onPress={handleButtonPress}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
    alignItems: 'center',
  },
  
  image: {
    width: 200, // Adjust width and height as needed
    height: 60,
  },
  
  option: {
    flexDirection: 'row', // Align items horizontally
    height: 80,
    width: 290,
  },
  
  box: {
    marginVertical: 20,
  },
  
  but: {
    marginTop: 60,
    borderRadius: 1,
  },
  
  head: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 50,
  },
  
  textBox: {
    fontSize: 18,
    marginBottom: 10,
  },
  
  textMargin: {
    fontSize: 15,
    marginVertical: 10,
    marginLeft: 8,
  },
  
  checkbox: {
    marginVertical: 20,
    marginRight: 20,
  },
  
  divider: {
    height: 0.3,
    backgroundColor: 'black',
    marginBottom: 20,
  },
});