import React from 'react';
import { FlatList, View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { Avatar } from '@rneui/themed';
import { Cell, Separator, TableView } from 'react-native-tableview-simple';
import { useNavigation } from '@react-navigation/native';
import { ButtonSolid } from 'react-native-ui-buttons';

const data = [
  { id: 1, title: 'Usuário:', detail: 'cadusaboya' },
  { id: 2, title: 'Nome Completo:', detail: 'Carlos Eduardo Petrola Saboya'  },
  { id: 3, title: 'CPF:', detail: '01871437229'  },
  { id: 4, title: 'e-mail:', detail: 'carlosepsaboya@gmail.com' },
  { id: 5, title: 'Telefone:', detail: '(91) 98414-7769' },
];

export default function ProfileScreen() {
    const navigation = useNavigation();

    const handleCellPress = () => {
      navigation.navigate('EditProfile')
    };
  
    
    const handleButtonPress = () => {
        // Show an alert
        Alert.alert(
          'Sucesso',
          'Você será redirecionado a página de login ',
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate back to the main page
                navigation.navigate('Welcome'); // or navigation.navigate('Home') if 'Home' is the name of the main page
              },
            },
          ]
        );
      };

    return (
      <View style={styles.container}>
      <View style={styles.nome}>
          <Avatar
              size={128}
              rounded
              title="CS"
              containerStyle={{ backgroundColor: 'coral' }}
          />
          <Text style={styles.nombre}>{data[0].detail}</Text>
      </View>

      <TableView appearance='light' style={styles.table}>
          <FlatList
              data={data}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, separators }) => (
                  <Cell
                  cellStyle="RightDetail"
                  title={item.title}
                  detail={item.detail}
                  onPress={() => handleCellPress()}
                  onHighlightRow={separators.highlight}
                  onUnHighlightRow={separators.unhighlight}
                  />
              )}
              ItemSeparatorComponent={({ highlighted }) => (
                  <Separator isHidden={highlighted} />
              )}
          />
      </TableView>

      <View style={styles.but}>
          <ButtonSolid
              title={'Sair'}
              useColor={'rgb(200, 0, 0)'}
              borderRadius={100}
              onPress={handleButtonPress}
          />
      </View>
  </View>
    ); 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E7E7E7',
    },

    table: {
        marginTop: 40,
        borderRadius: 100,
      },

    nome: {
        marginTop: 40,
        alignItems: 'center',
    },

    nombre: {
        fontSize: 24,
        marginTop: 12,
    },

    but: {
        marginVertical: 100,
        marginHorizontal: 50,
      },
});  