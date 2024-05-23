import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import WhiteBox from '@/components/whiteBox';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';

export default function Tab2Screen() {
  const [transactions, setTransactions] = useState([]);
  const API_URL = 'https://factor-cadusaboya.loca.lt';
  const { token } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Fetch transactions from the backend
        const response = await axios.get(`${API_URL}/transactions/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.head}>Histórico</Text>
        </View>

        <View style={styles.box}>
          <WhiteBox width={420} height={500}>
            <View style={styles.headerRow}>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Data</Text>
              </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Antecipado</Text>
              </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Recebido</Text>
              </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Status</Text>
              </View>
            </View>
            
            {transactions.map((transaction) => (
              <View key={transaction.id} style={styles.row}>
                <View style={[styles.cell, styles.date]}>
                  <Text>{transaction.date}</Text>
                </View>
                <View style={[styles.cell, styles.antecipado]}>
                  <Text>R$ {transaction.antecipado}</Text>
                </View>
                <View style={[styles.cell, styles.recebido]}>
                  <Text>R$ {transaction.recebido}</Text>
                </View>
                <View style={styles.cell}>
                  <Text>{transaction.status}</Text>
                </View>
              </View>
            ))}
          </WhiteBox>
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
    width: 200, // Adjust width and height as needed
    height: 60,
  },

  option: {
    flexDirection: 'row', // Align items horizontally
    height: 80,
    width: 290,
  },

  box: {
    marginVertical: 20,
  },

  but: {
    marginTop: 60,
    borderRadius: 1,
  },

  text: {
    fontSize: 32,
  },

  head: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 50,
  },

  textBox: {
    fontSize: 18,
    marginBottom: 10,
  },

  textMargin: {
    fontSize: 15,
    marginVertical: 10,
    marginLeft: 8,
  },

  checkbox: {
    marginVertical: 20,
    marginRight: 20,
  },

  divider: {
    height: 0.3,
    backgroundColor: 'black',
    marginBottom: 20,
  },

  table: {
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: 'white', // Change to whatever background color you want
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: 'black',
    width: 400,
    marginLeft: -8
  },
  headerCell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  
  cell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  date: {
    marginLeft: -5
  },

  antecipado: {
    marginLeft: 6
  },

  recebido: {
    marginLeft: 11
  },
});