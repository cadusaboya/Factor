import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import BlankComponent from './BlankComponent';

const Header = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const navigateToHome = () => {
        navigation.goBack(''); // Navigate to the "Home" screen
    };

    // Conditionally render the "home" button only if the current screen is not the initialRouteName
    const renderHomeButton = () => {
        if (route.name !== 'Home' && route.name !== 'Welcome') {
            return <Appbar.Action icon="arrow-left" onPress={navigateToHome} />;
        }
        return <BlankComponent width={61.3} height={0} />;
    };

    return (
        <Appbar.Header>
            {renderHomeButton()}
            <Appbar.Content title="Factor" style={{ flex: 1, alignItems: 'center' }} />
            <Appbar.Action icon="account" onPress={() => navigation.navigate('Profile')} />
        </Appbar.Header>
    );
};

export default Header;