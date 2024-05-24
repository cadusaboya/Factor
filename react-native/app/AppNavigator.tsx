// AppNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './tabs/index';
import Tab2Screen from './tabs/pedidos';
import Tab1Screen from './tabs/antecipacao';
import Tab3Screen from './tabs/mensagens';
import Tab4Screen from './tabs/hospitais';
import ProfileScreen from './tabs/ProfileScreen';
import Header from '@/components/Header';
import CreateAccount from './tabs/registro';
import BemVindo from './tabs/welcome';
import Login from './tabs/entrar';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        header: () => <Header />, // Use your custom header for all screens
      }}
    >
      <Stack.Screen name="Welcome" component={BemVindo} />
      <Stack.Screen name="Registro" component={CreateAccount} />
      <Stack.Screen name="Entrar" component={Login} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Antecipação" component={Tab1Screen} />
      <Stack.Screen name="Meus Pedidos" component={Tab2Screen} />
      <Stack.Screen name="Mensagens" component={Tab3Screen} />
      <Stack.Screen name="Meus Hospitais" component={Tab4Screen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      
    </Stack.Navigator>
  );
};

export default AppNavigator;