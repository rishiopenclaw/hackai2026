import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import ArenaScreen from './screens/ArenaScreen';
import DrillsScreen from './screens/DrillsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { colors } from './theme/colors';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.green,
            tabBarStyle: { height: 64, paddingBottom: 8 },
          }}
        >
          <Tab.Screen name="Path" component={HomeScreen} />
          <Tab.Screen name="Arena" component={ArenaScreen} />
          <Tab.Screen name="Drills" component={DrillsScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
