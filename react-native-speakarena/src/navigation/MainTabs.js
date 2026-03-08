import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeMainScreen from '../screens/main/HomeMainScreen';
import PracticeScreen from '../screens/main/PracticeScreen';
import ProfileMainScreen from '../screens/main/ProfileMainScreen';
import FloatingToolbar from '../components/FloatingToolbar';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <FloatingToolbar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeMainScreen} />
      <Tab.Screen name="Practice" component={PracticeScreen} />
      <Tab.Screen name="Profile" component={ProfileMainScreen} />
    </Tab.Navigator>
  );
}
