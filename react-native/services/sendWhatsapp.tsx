import { Linking } from 'react-native';

// Function to send a WhatsApp message to a specific phone number
export const sendWhatsapp = () => {
    const phoneNumber = '+5591984147769';
    const message = 'Olá, estou com um problema referente ao aplicativo Factor. Você pode me ajudar?';
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.openURL(whatsappUrl)
        .then(() => console.log('WhatsApp opened'))
        .catch((error) => console.error('Error opening WhatsApp:', error));
};