import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, Trophy, GraduationCap, UserCircle2 } from 'lucide-react-native';
import HomeMainScreen from '../screens/main/HomeMainScreen';
import PracticeStack from './PracticeStack';
import ProfileMainScreen from '../screens/main/ProfileMainScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 76,
          paddingTop: 12,
          paddingBottom: 16,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderTopWidth: 0,
          position: 'absolute',
        },
        tabBarActiveTintColor: '#27A14C',
        tabBarInactiveTintColor: '#B0B0B0',
        tabBarIcon: ({ color }) => {
          const map = {
            Home: House,
            Club: Trophy,
            Learn: GraduationCap,
            Me: UserCircle2,
          };
          const Icon = map[route.name] || House;
          return <Icon size={24} color={color} strokeWidth={2.8} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeMainScreen} />
      <Tab.Screen name="Club" component={HomeMainScreen} />
      <Tab.Screen name="Learn" component={PracticeStack} />
      <Tab.Screen name="Me" component={ProfileMainScreen} />
    </Tab.Navigator>
  );
}
