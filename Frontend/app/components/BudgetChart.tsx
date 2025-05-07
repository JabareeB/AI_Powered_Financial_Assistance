import React from 'react';
import { View, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface BudgetChartProps {
  income: number;
  expenses: number;
}

export default function BudgetChart({ income, expenses }: BudgetChartProps) {
  const chartData = [
    {
      name: 'Income',
      amount: income,
      color: '#4CAF50',
      legendFontColor: '#000',
      legendFontSize: 14,
    },
    {
      name: 'Expenses',
      amount: expenses,
      color: '#F44336',
      legendFontColor: '#000',
      legendFontSize: 14,
    },
  ];

  return (
    <View>
      <PieChart
        data={chartData}
        width={screenWidth - 40}
        height={180}
        chartConfig={{
          color: () => '#000',
          labelColor: () => '#000',
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="20"
        absolute
      />
    </View>
  );
}
