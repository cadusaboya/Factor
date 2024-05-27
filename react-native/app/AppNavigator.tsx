// AppNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './tabs/homescreen';
import History from './tabs/history';
import Antecipacao from './tabs/antecipacao';
import Hospitals from './tabs/hospitals';
import Profile from './tabs/profile';
import Header from '@/components/Header';
import Register from './tabs/register';
import Welcome from './tabs/welcome';
import Login from './tabs/login';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        header: () => <Header />, // Use your custom header for all screens
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Registro" component={Register} />
      <Stack.Screen name="Entrar" component={Login} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Antecipação" component={Antecipacao} />
      <Stack.Screen name="Meus Pedidos" component={History} />
      <Stack.Screen name="Meus Hospitais" component={Hospitals} />
      <Stack.Screen name="Profile" component={Profile} />
      
    </Stack.Navigator>
  );
};

export default AppNavigator;