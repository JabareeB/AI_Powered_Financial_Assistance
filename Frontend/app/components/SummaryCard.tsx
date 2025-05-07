// app/components/SummaryCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type SummaryCardProps = {
  label: string;
  amount: number;
  color: string;
};

const SummaryCard: React.FC<SummaryCardProps> = ({ label, amount, color }) => {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.amount}>${amount.toFixed(2)}</Text>
    </View>
  );
};

export default SummaryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 6,
  },
  label: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  amount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});
