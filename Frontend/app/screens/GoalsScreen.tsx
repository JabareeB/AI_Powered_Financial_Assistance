import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
}

export default function GoalsScreen() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const addGoal = () => {
    if (!title || !targetAmount) {
      Alert.alert('Missing Info', 'Please fill out both fields.');
      return;
    }

    const newGoal: Goal = {
      id: Date.now().toString(),
      title,
      targetAmount: parseFloat(targetAmount),
      savedAmount: 0,
    };

    setGoals((prev) => [...prev, newGoal]);
    setTitle('');
    setTargetAmount('');
  };

  const renderGoal = ({ item }: { item: Goal }) => {
    const progress = item.targetAmount
      ? Math.min((item.savedAmount / item.targetAmount) * 100, 100)
      : 0;

    return (
      <View style={styles.goalCard}>
        <Text style={styles.goalTitle}>{item.title}</Text>
        <Text style={styles.goalText}>
          ${item.savedAmount.toFixed(2)} / ${item.targetAmount.toFixed(2)} ({progress.toFixed(1)}%)
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${progress}%` }]} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set a Savings Goal</Text>

      <TextInput
        style={styles.input}
        placeholder="Goal Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Target Amount"
        value={targetAmount}
        onChangeText={setTargetAmount}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.addButton} onPress={addGoal}>
        <Text style={styles.addButtonText}>Add Goal</Text>
      </TouchableOpacity>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={renderGoal}
        contentContainerStyle={styles.listContainer}
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
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  goalCard: {
    backgroundColor: '#f0f0f0',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalText: {
    fontSize: 14,
    marginTop: 6,
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#2196F3',
  },
  listContainer: {
    paddingBottom: 20,
  },
});
