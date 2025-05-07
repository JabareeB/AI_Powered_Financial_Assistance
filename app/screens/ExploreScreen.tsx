import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Budgeting Basics',
    description: 'Learn how to create a budget and stick to it.',
    url: 'https://www.investopedia.com/how-to-budget-5189853',
  },
  {
    id: '2',
    title: 'How to Save Money',
    description: 'Smart saving strategies for long-term goals.',
    url: 'https://www.nerdwallet.com/article/finance/how-to-save-money',
  },
  {
    id: '3',
    title: 'Improving Your Credit Score',
    description: 'Steps to build or improve your credit.',
    url: 'https://www.experian.com/blogs/news/2021/02/how-to-improve-your-credit-score/',
  },
  {
    id: '4',
    title: 'Investing 101',
    description: 'Beginner’s guide to investing your money.',
    url: 'https://www.schwab.com/learn/story/investing-101-getting-started',
  },
];

export default function ExploreScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(() =>
      alert('Unable to open the link. Please try again later.')
    );
  };

  const renderItem = ({ item }: { item: Resource }) => (
    <TouchableOpacity style={styles.card} onPress={() => openLink(item.url)}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDesc}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore Financial Resources</Text>
      <FlatList
        data={resources}
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
  card: {
    backgroundColor: '#f2f2f2',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDesc: {
    marginTop: 6,
    fontSize: 14,
    color: '#555',
  },
});
