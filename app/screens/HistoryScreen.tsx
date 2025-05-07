import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface Transaction {
  id: string;
  type: 'Income' | 'Expense';
  amount: number;
  date: string;
  description: string;
}

export default function HistoryScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'Income',
      amount: 1200,
      date: '2025-05-01',
      description: 'Freelance payment',
    },
    {
      id: '2',
      type: 'Expense',
      amount: 300,
      date: '2025-05-02',
      description: 'Groceries',
    },
    {
      id: '3',
      type: 'Expense',
      amount: 150,
      date: '2025-05-03',
      description: 'Electric bill',
    },
  ]);

  const deleteTransaction = (id: string) => {
    Alert.alert('Delete', 'Are you sure you want to delete this transaction?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => {
          setTransactions((prev) => prev.filter((item) => item.id !== id));
        },
        style: 'destructive',
      },
    ]);
  };

  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionInfo}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.transactionAmount}>
        <Text
          style={[
            styles.amount,
            { color: item.type === 'Income' ? '#4CAF50' : '#F44336' },
          ]}
        >
          {item.type === 'Income' ? '+' : '-'}${item.amount.toFixed(2)}
        </Text>
        <TouchableOpacity onPress={() => deleteTransaction(item.id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction History</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  transactionItem: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionInfo: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  transactionAmount: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    color: '#F44336',
    fontSize: 12,
    marginTop: 4,
  },
});
