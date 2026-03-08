import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PracticeScreen from '../screens/main/PracticeScreen';
import SessionPreflightScreen from '../screens/sessions/SessionPreflightScreen';
import SessionLiveScreen from '../screens/sessions/SessionLiveScreen';
import SessionReflectScreen from '../screens/sessions/SessionReflectScreen';
import SessionRetryScreen from '../screens/sessions/SessionRetryScreen';
import SessionCompleteScreen from '../screens/sessions/SessionCompleteScreen';
import PromptPickerModal from '../screens/modals/PromptPickerModal';
import SessionSettingsModal from '../screens/modals/SessionSettingsModal';
import CoachHintsModal from '../screens/modals/CoachHintsModal';

const Stack = createNativeStackNavigator();

export default function PracticeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#F7F8FF' },
      }}
    >
      <Stack.Screen name="PracticeHome" component={PracticeScreen} />
      <Stack.Screen name="SessionPreflight" component={SessionPreflightScreen} />
      <Stack.Screen name="SessionLive" component={SessionLiveScreen} />
      <Stack.Screen name="SessionReflect" component={SessionReflectScreen} />
      <Stack.Screen name="SessionRetry" component={SessionRetryScreen} />
      <Stack.Screen name="SessionComplete" component={SessionCompleteScreen} />
      <Stack.Screen name="PromptPicker" component={PromptPickerModal} options={{ presentation: 'modal' }} />
      <Stack.Screen name="SessionSettings" component={SessionSettingsModal} options={{ presentation: 'modal' }} />
      <Stack.Screen name="CoachHints" component={CoachHintsModal} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
}
