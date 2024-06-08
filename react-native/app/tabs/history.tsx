// screens/History.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text, useWindowDimensions, ActivityIndicator } from 'react-native';
import WhiteBox from '@/components/whiteBox';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import { fetchTransactions } from '@/services/api/apiHistory';

export default function History() {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const { token, logout } = useAuth(); // Retrieve the token using the useAuth hook
  const { width, height } = useWindowDimensions(); // Get the window width
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        // Fetch transactions from the backend
        const data = await fetchTransactions(token, logout, navigation);
        setTransactions(data);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  if (loading) {
    return (
      <View style={styles.load_container}>
          <ActivityIndicator size="large" color="#b5b5b5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
        <View>
          <Text style={[styles.head, { fontSize: width * 0.06 }]}>Histórico</Text>
        </View>

        <View style={styles.box}>
          <View style={styles.headerRow}>
            <View style={[styles.headerCell, { flex: 2 }]}>
              <Text style={styles.headerText}>Data</Text>
            </View>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Antecipado</Text>
            </View>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Recebido</Text>
            </View>
            <View style={[styles.headerCell, { flex: 2 }]}>
              <Text style={styles.headerText}>Status</Text>
            </View>
          </View>

          
          <WhiteBox width={width * 0.9} height={height * 0.6} innerContainerPadding={0} borderRadius={0}>
            <ScrollView>
              {transactions.map((transaction, index) => (
                <View key={index} style={styles.row}>
                  <View style={styles.cell}>
                    <Text>{transaction.date}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>R$ {transaction.antecipado}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>R$ {transaction.recebido}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>{transaction.status}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </WhiteBox>
          
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
    alignItems: 'center',
  },

  load_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},

  box: {
    marginVertical: 20,
  },

  head: {
    textAlign: 'center',
    marginTop: 50,
  },

  headerRow: {
    flexDirection: 'row',
    backgroundColor: 'black',
    width: '90%',
  },

  headerCell: {
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
    borderBottomWidth: 0.2,
    borderBottomColor: 'black',
  },
  
  cell: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
});