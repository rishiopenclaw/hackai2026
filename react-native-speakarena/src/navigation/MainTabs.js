import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Mic2, UserRound } from 'lucide-react-native';
import HomeMainScreen from '../screens/main/HomeMainScreen';
import PracticeScreen from '../screens/main/PracticeScreen';
import ProfileMainScreen from '../screens/main/ProfileMainScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0B0D13',
          borderTopColor: '#1E2230',
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontWeight: '600', fontSize: 12 },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#778093',
        tabBarIcon: ({ color, size }) => {
          const map = {
            Home: Home,
            Practice: Mic2,
            Profile: UserRound,
          };
          const Icon = map[route.name];
          return <Icon color={color} size={size} strokeWidth={2.2} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeMainScreen} />
      <Tab.Screen name="Practice" component={PracticeScreen} />
      <Tab.Screen name="Profile" component={ProfileMainScreen} />
    </Tab.Navigator>
  );
}
