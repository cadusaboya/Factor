import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, Image, ActivityIndicator, Dimensions } from 'react-native';
import { Text } from '@rneui/themed';
import Checkbox from 'expo-checkbox';
import WhiteBox from '@/components/whiteBox';
import { ButtonSolid } from 'react-native-ui-buttons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import { fetchUserHospitals, createUserRequest } from '@/services/api/apiHospitals';
import { useCheckboxStates } from '@/hooks/useCheckboxStates';
import preloadImages from '@/services/preloadImages';
import { handleServerError } from '@/services/handleServerError';

const { width, height } = Dimensions.get('window');

const images = [
  require('@/assets/images/PD.png'),
  require('@/assets/images/HCST.png'),
  require('@/assets/images/HST.png')
];

export default function Hospitals() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');
  const { token, logout } = useAuth();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(true); 
  const { checkboxStates, toggleCheckbox } = useCheckboxStates([]);

  useEffect(() => {
    preloadImages(images);

    const fetchHospitals = async () => {
      try {
        const hospitalIds = await fetchUserHospitals(token);
        hospitalIds.forEach(id => { toggleCheckbox(id); });
      } catch (error) {
        handleServerError(logout, navigation);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const handleButtonPress = async () => {
    setIsButtonDisabled(true);

    const selectedHospitals = Object.keys(checkboxStates).filter(id => checkboxStates[id]);

    if (selectedHospitals.length === 0) {
      Alert.alert('Erro', 'Por favor, selecione ao menos um hospital');
      setIsButtonDisabled(false);
      return;
    }

    try {
      await createUserRequest(token, selectedHospitals, navigation);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.load_container}>
        <ActivityIndicator size="large" color="#b5b5b5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={[styles.head, { fontSize: width * 0.06 }]}>Hospitais credenciados</Text>
        </View>

        <View style={styles.box}>
          <WhiteBox width={width * 0.9} height={height * 0.6}>
            {[{ id: 1, image: images[1] }, { id: 2, image: images[0] }, { id: 3, image: images[2] }].map(({ id, image }) => (
              <React.Fragment key={id}>
                <View style={[styles.option, { height: height * 0.1 }]}>
                  <Checkbox
                    style={styles.checkbox}
                    value={checkboxStates[id]}
                    onValueChange={() => toggleCheckbox(id)}
                    color={checkboxStates[id] ? 'green' : undefined}
                  />
                  <Image source={image} style={[styles.image, { width: width * 0.5, height: height * 0.08 }]} resizeMode="contain" />
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
            disabled={isButtonDisabled}
            style={ styles.button }
            borderRadius={ width * 0.1 }
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
    height: height * 0.08,
  },
  option: {
    flexDirection: 'row', // Align items horizontally
    height: height * 0.1,
  },
  box: {
    marginVertical: height * 0.02,
  },
  but: {
    marginTop: height * 0.02,
    borderRadius: width * 0.01,
  },
  head: {
    textAlign: 'center',
    marginTop: height * 0.05,
    fontSize: width * 0.06,
  },
  checkbox: {
    marginVertical: height * 0.02,
    marginRight: width * 0.05,
  },
  divider: {
    height: 0.5,
    backgroundColor: 'black',
    marginBottom: height * 0.02,
  },
  button: {
    borderRadius: width * 0.1,
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
  load_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});