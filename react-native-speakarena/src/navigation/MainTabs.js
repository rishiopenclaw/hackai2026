import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Layers3, BarChart3, UserRound } from 'lucide-react-native';
import HomeMainScreen from '../screens/main/HomeMainScreen';
import PracticeStack from './PracticeStack';
import ProgressMainScreen from '../screens/main/ProgressMainScreen';
import ProfileMainScreen from '../screens/main/ProfileMainScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 68,
          paddingTop: 8,
          paddingBottom: 10,
          backgroundColor: '#FFFFFF',
          borderTopColor: 'rgba(66,74,140,0.12)',
        },
        tabBarActiveTintColor: '#6D5EF8',
        tabBarInactiveTintColor: '#8A90AE',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
        tabBarIcon: ({ color, size }) => {
          const map = { Home, Practice: Layers3, Progress: BarChart3, Profile: UserRound };
          const Icon = map[route.name] || Home;
          return <Icon size={size} color={color} strokeWidth={2.2} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeMainScreen} />
      <Tab.Screen name="Practice" component={PracticeStack} />
      <Tab.Screen name="Progress" component={ProgressMainScreen} />
      <Tab.Screen name="Profile" component={ProfileMainScreen} />
    </Tab.Navigator>
  );
}
