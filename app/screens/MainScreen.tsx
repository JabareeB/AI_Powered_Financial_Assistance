// frontend-mobile/screens/MainScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MainScreen() {
  const navigation = useNavigation<any>();

  const navigateToTab = (tabName: string) => {
    navigation.jumpTo(tabName);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome Back</Text>
      <Text style={styles.subtext}>Your Financial Dashboard</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigateToTab('Summary')}>
          <Text style={styles.cardTitle}>📊 Summary</Text>
          <Text style={styles.cardDesc}>Check your income, expenses & balance.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigateToTab('Goals')}>
          <Text style={styles.cardTitle}>🎯 Goals</Text>
          <Text style={styles.cardDesc}>Track your savings goals.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigateToTab('History')}>
          <Text style={styles.cardTitle}>📅 History</Text>
          <Text style={styles.cardDesc}>View your past transactions.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigateToTab('Chat')}>
          <Text style={styles.cardTitle}>💬 Chat</Text>
          <Text style={styles.cardDesc}>Ask the AI financial assistant anything.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigateToTab('Explore')}>
          <Text style={styles.cardTitle}>🔍 Explore</Text>
          <Text style={styles.cardDesc}>Discover helpful financial resources.</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtext: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardDesc: {
    fontSize: 13,
    color: '#555',
    marginTop: 6,
  },
});
