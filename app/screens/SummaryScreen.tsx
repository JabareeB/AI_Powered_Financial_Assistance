import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BudgetChart from '../components/BudgetChart';
import GoalProgress from '../components/GoalProgress';

interface Summary {
  id: string;
  date: string;
  income: number;
  expenses: number;
  balance: number;
  goal: number;
}

export default function SummaryScreen() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [goal, setGoal] = useState('');

  const incomeNum = parseFloat(income) || 0;
  const expenseNum = parseFloat(expenses) || 0;
  const goalNum = parseFloat(goal) || 0;
  const balance = incomeNum - expenseNum;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const budgetData = await AsyncStorage.getItem('budgetData');
      const goalData = await AsyncStorage.getItem('savingsGoal');

      if (budgetData) {
        const parsed = JSON.parse(budgetData);
        setIncome(parsed.income || '');
        setExpenses(parsed.expenses || '');
      }

      if (goalData) {
        setGoal(goalData);
      }
    } catch (err) {
      Alert.alert('Error', 'Could not load budget or goal.');
    }
  };

  const saveCurrentToHistory = async () => {
    try {
      const newEntry: Summary = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        income: incomeNum,
        expenses: expenseNum,
        balance: balance,
        goal: goalNum,
      };

      const existing = await AsyncStorage.getItem('weeklyHistory');
      const parsed: Summary[] = existing ? JSON.parse(existing) : [];

      const updated = [...parsed, newEntry];
      await AsyncStorage.setItem('weeklyHistory', JSON.stringify(updated));

      Alert.alert("Success", "Weekly summary saved!");
    } catch (err) {
      Alert.alert("Error", "Failed to save summary.");
    }
  };

  const getStatusMessage = () => {
    if (goalNum === 0) return "Set a savings goal to track progress.";
    if (balance >= goalNum) return "✅ You're on track!";
    if (balance > 0) return "⚠️ You're getting close to your goal.";
    return "❌ You're over budget.";
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weekly Financial Summary</Text>

      <BudgetChart income={incomeNum} expenses={expenseNum} />
      <GoalProgress goal={goalNum} balance={balance} />

      <View style={styles.card}>
        <Text style={styles.label}>Income: ${incomeNum.toFixed(2)}</Text>
        <Text style={styles.label}>Expenses: ${expenseNum.toFixed(2)}</Text>
        <Text style={styles.label}>Balance: ${balance.toFixed(2)}</Text>
        <Text style={styles.label}>Goal: ${goalNum.toFixed(2)}</Text>
        <Text style={styles.status}>{getStatusMessage()}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={saveCurrentToHistory}>
        <Text style={styles.buttonText}>Save Weekly Summary</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  status: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
