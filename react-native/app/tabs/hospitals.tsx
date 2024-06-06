import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, Image, useWindowDimensions } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import { Text } from '@rneui/themed';
import Checkbox from 'expo-checkbox';
import WhiteBox from '@/components/whiteBox';
import { ButtonSolid } from 'react-native-ui-buttons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import HPDImage from '@/assets/images/PD.png';
import CSTImage from '@/assets/images/HCST.png';
import STImage from '@/assets/images/HST.png';
import { useAuth } from '@/hooks/useAuth';

SplashScreen.preventAutoHideAsync();

export default function Hospitals() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const API_URL = 'https://api.factorpa.xyz';
  const { token } = useAuth();

  const [checkboxStates, setCheckboxStates] = useState({
    1: false,
    2: false,
    3: false,
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        await Promise.all([
          Asset.loadAsync([HPDImage, CSTImage, STImage]),
        ]);

        const response = await axios.get(`${API_URL}/accounts/user/hospitals/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const hospitalIds = response.data;
        const newCheckboxStates = { ...checkboxStates };
        hospitalIds.forEach(id => {
          newCheckboxStates[id] = true;
        });
        setCheckboxStates(newCheckboxStates);
      } catch (error) {
        console.error('Error fetching user hospitals:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao processar as informações. Por favor, tente novamente mais tarde.');
      } finally {
        SplashScreen.hideAsync();
      }
    };

    loadResourcesAndDataAsync();
  }, [token]);

  const handleCheckboxChange = (key) => {
    setCheckboxStates(prevStates => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };

  const handleButtonPress = async () => {
    setIsButtonDisabled(true);

    const selectedHospitals = Object.keys(checkboxStates).filter(key => checkboxStates[key]);

    if (selectedHospitals.length === 0) {
      Alert.alert('Erro', 'Por favor, selecione ao menos um hospital');
      setIsButtonDisabled(false);
      return;
    }

    try {
      await axios.post(`${API_URL}/accounts/user/requests/`, {
        hospitals: selectedHospitals,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      Alert.alert(
        'Em análise',
        'Em breve seu saldo será atualizado',
        [
          {
            text: 'OK',
            onPress: () => {
              setIsButtonDisabled(false);
              navigation.goBack();
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error creating request:', error);

      if (error.response?.status === 404) {
        Alert.alert('Erro', 'Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde.');
      } else {
        Alert.alert('Erro inesperado', 'Se o problema persistir, entre em contato com o suporte');
      }

      setIsButtonDisabled(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={[styles.head, { fontSize: width * 0.06 }]}>Hospitais credenciados</Text>

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

        <View style={styles.buttonContainer}>
          <ButtonSolid
            title="Atualizar"
            useColor="rgb(0, 0, 0)"
            onPress={handleButtonPress}
            disabled={isButtonDisabled}
            style={styles.button}
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 60,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
  box: {
    marginVertical: 20,
  },
  head: {
    textAlign: 'center',
    marginTop: 50,
  },
  checkbox: {
    marginRight: 20,
  },
  divider: {
    height: 0.3,
    backgroundColor: 'black',
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
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
    fontWeight: 'bold',
  },
});