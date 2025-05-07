import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MainScreen from '../screens/MainScreen';
import ExploreScreen from '../screens/ExploreScreen';
import GoalsScreen from '../screens/GoalsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ChatScreen from '../screens/ChatScreen';
import SummaryScreen from '../screens/SummaryScreen';

// ✅ ✅ ✅ FIX: Full param list defined here
export type RootTabParamList = {
  Main: undefined;
  Explore: undefined;
  Goals: undefined;
  History: undefined;
  Chat: undefined;
  Summary: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          switch (route.name) {
            case 'Main': iconName = 'home-outline'; break;
            case 'Explore': iconName = 'search-outline'; break;
            case 'Goals': iconName = 'bar-chart-outline'; break;
            case 'History': iconName = 'time-outline'; break;
            case 'Chat': iconName = 'chatbubble-outline'; break;
            case 'Summary': iconName = 'document-text-outline'; break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Goals" component={GoalsScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Summary" component={SummaryScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
