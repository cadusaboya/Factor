import { useNavigation } from '@react-navigation/native';

const navigate = () => {
    const navigation = useNavigation();

    const handleNavigate = (menu) => {
        console.log(`Navigating to ${menu}`);
        navigation.navigate(menu);
      };

    return { handleNavigate };
    
};

export default navigate