import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, Image, useWindowDimensions } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import { Text } from '@rneui/themed';
import Checkbox from 'expo-checkbox';
import WhiteBox from '@/components/whiteBox';
import { ButtonSolid } from 'react-native-ui-buttons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import HPDImage from '@/assets/images/PD.png';
import CSTImage from '@/assets/images/HCST.png';
import STImage from '@/assets/images/HST.png';
import { useAuth } from '@/hooks/useAuth';
import { fetchUserHospitals, createUserRequest } from '@/services/api/apiHospitals';

export default function Hospitals() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const { token, logout } = useAuth(); // Retrieve the token using the useAuth hook

  const [checkboxStates, setCheckboxStates] = useState({
    1: false, // checkbox1
    2: false, // checkbox2
    3: false, // checkbox3
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {

    async function loadResourcesAndDataAsync() {
      try {
        // Preload images
        await Promise.all([
          Asset.loadAsync([HPDImage, CSTImage, STImage]),
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();

    const fetchHospitals = async () => {
      try {
        const hospitalIds = await fetchUserHospitals(token, logout, navigation);
        const newCheckboxStates = { ...checkboxStates };
        hospitalIds.forEach(id => {
          newCheckboxStates[id] = true;
        });
        setCheckboxStates(newCheckboxStates);
      } catch (error) {
        console.error('Error fetching user hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);

  const handleCheckboxChange = (key) => {
    setCheckboxStates(prevStates => ({
      ...prevStates,
      [key]: !prevStates[key], // Toggle the state of the checkbox at the specified key
    }));
  };

  const handleButtonPress = async () => {
    // Disable the button to prevent multiple clicks
    setIsButtonDisabled(true);

    // Get the hospitals selected by the user
    const selectedHospitals = Object.keys(checkboxStates).filter(key => checkboxStates[key]);
    console.log(selectedHospitals)

    // Check if at least one hospital is selected
    if (selectedHospitals.length === 0) {
      // Show an alert indicating that at least one hospital must be selected
      Alert.alert('Erro', 'Por favor, selecione ao menos um hospital');
      setIsButtonDisabled(false); // Re-enable the button
      return; // Exit the function early
    }

    try {
      await createUserRequest(token, selectedHospitals);
      // Show an alert indicating success
      Alert.alert(
        'Em análise',
        'Em breve seu saldo será atualizado',
        [
          {
            text: 'OK',
            onPress: () => {
              setIsButtonDisabled(false);
              navigation.goBack(); // or navigation.navigate('Home') if 'Home' is the name of the main page
            },
          },
        ]
      );
    } catch (error) {
      const errors = error.response.data;
      console.error('Error creating request:', errors);

      if (error.response.status === 502 || error.response.status === 504) {
        // Show an alert indicating failure
        Alert.alert('Erro', 'Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde.');
      } else {
        Alert.alert('Erro inesperado', 'Se o problema persistir, entre em contato com o suporte');
        console.error('Erro');
      }

      setIsButtonDisabled(false); // Re-enable the button
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={[styles.head, { fontSize: width * 0.06 }]}>Hospitais credenciados</Text>
        </View>

        <View style={styles.box}>
          <WhiteBox width={width * 0.9} height={height * 0.6}>
            {[{ key: 2, image: HPDImage }, { key: 1, image: CSTImage }, { key: 3, image: STImage }].map(({ key, image }) => (
              <React.Fragment key={key}>
                <View style={[styles.option, { width: width * 0.8 }]}>
                  <Checkbox
                    style={styles.checkbox}
                    value={checkboxStates[key]}
                    onValueChange={() => handleCheckboxChange(key)}
                    color={checkboxStates[key] ? 'green' : undefined}
                  />
                  <Image source={image} style={[styles.image, { width: width * 0.5 }]} resizeMode="contain" />
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
            disabled={isButtonDisabled}  // Disable the button based on state
            style={styles.button}
            borderRadius={width * 0.1}
            textStyle={styles.buttonText}
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
    height: 60,
  },
  option: {
    flexDirection: 'row', // Align items horizontally
    height: 80,
  },
  box: {
    marginVertical: 20,
  },
  but: {
    marginTop: 20,
    borderRadius: 1,
  },
  head: {
    textAlign: 'center',
    marginTop: 50,
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
  button: {
    borderRadius: 10,
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
    fontWeight: 'bold'
  },
});