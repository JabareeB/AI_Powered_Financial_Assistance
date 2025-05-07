import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GoalProgressProps {
  goal: number;
  balance: number;
}

export default function GoalProgress({ goal, balance }: GoalProgressProps) {
  const progress = goal > 0 ? Math.min(balance / goal, 1) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Goal Progress</Text>
      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
      </View>
      <Text style={styles.percent}>{(progress * 100).toFixed(1)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  label: { fontWeight: '600', fontSize: 16 },
  bar: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginTop: 8,
  },
  fill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  percent: {
    marginTop: 6,
    textAlign: 'right',
    fontSize: 14,
    color: '#333',
  },
});
