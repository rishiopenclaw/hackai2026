import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import CoachHintCard from '../../components/CoachHintCard';
import { palette, type } from '../../theme/design';

export default function CoachHintsModal() {
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Coach hints</Text>
      <CoachHintCard text="Try a one-sentence opening, then move to evidence." />
      <CoachHintCard text="Replace fillers with brief pauses between ideas." />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F7F8FF', padding: 20, gap: 10 },
  title: { color: palette.text, ...type.display },
});
