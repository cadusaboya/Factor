import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { Avatar } from '@rneui/themed';
import { Cell, Separator, TableView } from 'react-native-tableview-simple';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { ButtonSolid } from 'react-native-ui-buttons';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useAuth } from '@/hooks/useAuth';

const { width } = Dimensions.get('window');

export default function Profile() {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const API_URL = 'https://factor-cadusaboya.loca.lt';
    const { token, logout } = useAuth(); // Retrieve the token using the useAuth hook
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        // Fetch user data from the backend
        axios.get(`${API_URL}/user/profile/`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Assuming you have a token from authentication
            },
        })
        .then(response => {
            setUserData(response.data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            // Handle error, show alert, etc.
        });
    }, []);
  
    const handleLogout = () => {
        // Disable the button to prevent multiple clicks
        setIsButtonDisabled(true);
        
        // Clear the JWT token
        logout();

        // Show an alert
        Alert.alert(
            'Sucesso',
            'Redirecionando ao menu principal',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        setIsButtonDisabled(false);  // Re-enable the button
                        
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
            ]
        );
    };

    if (!userData) {
        // If user data is not yet available, display loading indicator or placeholder
        return <ActivityIndicator />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.nome}>
                <Avatar
                    size={width * 0.3}
                    rounded
                    title={userData.username.substring(0, 2).toUpperCase()} // Assuming the backend provides name initials
                    containerStyle={{ backgroundColor: 'coral' }}
                />
                <Text style={styles.nombre}>{userData.username}</Text>
            </View>

            <TableView appearance='light' style={styles.table}>
                <FlatList
                    data={[
                        { id: 1, title: 'Nome Completo:', detail: userData.fullname },
                        { id: 3, title: 'CPF:', detail: userData.cpf },
                        { id: 4, title: 'E-mail:', detail: userData.email },
                        { id: 5, title: 'Telefone:', detail: userData.telefone },
                    ]}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item, separators }) => (
                        <Cell
                            cellStyle="RightDetail"
                            title={item.title}
                            detail={item.detail}
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
                    borderRadius={width * 0.1} // Adjust button border radius
                    onPress={handleLogout}
                    disabled={isButtonDisabled}  // Disable the button based on stat
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
        marginTop: width * 0.1,
        borderRadius: width * 0.3,
    },

    nome: {
        marginTop: width * 0.1,
        alignItems: 'center',
    },

    nombre: {
        fontSize: width * 0.06,
        marginTop: width * 0.03,
    },

    but: {
        marginVertical: width * 0.25,
        marginHorizontal: width * 0.1,
    },
});