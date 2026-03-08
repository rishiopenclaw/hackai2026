import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PracticeScreen from '../screens/main/PracticeScreen';
import DebateArenaScreen from '../screens/modes/DebateArenaScreen';
import HotSeatInterviewScreen from '../screens/modes/HotSeatInterviewScreen';
import CrisisRoomScreen from '../screens/modes/CrisisRoomScreen';
import StoryBuilderScreen from '../screens/modes/StoryBuilderScreen';

const Stack = createNativeStackNavigator();

export default function PracticeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#09090C' },
      }}
    >
      <Stack.Screen name="PracticeHome" component={PracticeScreen} />
      <Stack.Screen name="DebateArena" component={DebateArenaScreen} />
      <Stack.Screen name="HotSeatInterview" component={HotSeatInterviewScreen} />
      <Stack.Screen name="CrisisRoom" component={CrisisRoomScreen} />
      <Stack.Screen name="StoryBuilder" component={StoryBuilderScreen} />
    </Stack.Navigator>
  );
}
