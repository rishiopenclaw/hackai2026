import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeMainScreen from '../screens/main/HomeMainScreen';
import PracticeScreen from '../screens/main/PracticeScreen';
import ProfileMainScreen from '../screens/main/ProfileMainScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0B0C11', borderTopColor: '#1E2230' },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#778093',
        tabBarIcon: ({ color, size }) => {
          const map = { Home: 'home-outline', Practice: 'mic-outline', Profile: 'person-outline' };
          return <Ionicons name={map[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeMainScreen} />
      <Tab.Screen name="Practice" component={PracticeScreen} />
      <Tab.Screen name="Profile" component={ProfileMainScreen} />
    </Tab.Navigator>
  );
}
