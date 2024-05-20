import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';

export default function Tab3Screen() {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const scrollViewRef = useRef();

  useEffect(() => {
    // Scroll to the end on initial render
    scrollViewRef.current.scrollToEnd({ animated: false });

    const intervalId = setInterval(() => {
        addServerMessage("Já iremos lhe atender, um minuto...");
      }, 10000);
  
      return () => clearInterval(intervalId); // Cleanup function to clear interval
  }, []);

  // Function to handle sending the message to the server
  const sendMessage = () => {
    // Here you can send the 'message' state to your server
    // For simplicity, we'll just log the message here
    console.log("Sending message:", message);

    // Clear the message input after sending
    setMessage('');

    // Update received messages state (for testing purposes)
    setReceivedMessages(prevMessages => [...prevMessages, { text: message, sender: 'You' }]);

    // Scroll to bottom
    scrollViewRef.current.scrollToEnd({ animated: true });

    
  };

    // Function to add a message from the server
    const addServerMessage = (text) => {
        setReceivedMessages(prevMessages => [...prevMessages, { text, sender: 'Server' }]);
        scrollViewRef.current.scrollToEnd({ animated: true });
      };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        inverted>
        {receivedMessages.map((msg, index) => (
          <View key={index} style={[styles.message, msg.sender === 'You' ? styles.userMessage : styles.serverMessage]}>
            <Text style={styles.sender}>{msg.sender}</Text>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message here..."
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E7E7E7',
  },
  messagesContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    borderRadius: 10,
  },
  message: {
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'lightblue',
    marginLeft: 10,
  },
  serverMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'lightgreen',
    marginRight: 10,
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageText: {

  },
  inputContainer: {
    marginTop: 5,
    paddingBottom: 110,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});