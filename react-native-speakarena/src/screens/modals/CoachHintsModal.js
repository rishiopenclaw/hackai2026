import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import CoachHintCard from '../../components/CoachHintCard';
import { palette, type } from '../../theme/design';

export default function CoachHintsModal({ route }) {
  const feedback = route.params?.feedback;
  const dynamicHint = feedback?.top_weakness
    ? `Focus this round: ${feedback.top_weakness}`
    : 'Try a one-sentence opening, then move to evidence.';
  const drillHint = feedback?.one_line_feedback
    ? `Drill: ${feedback.one_line_feedback}`
    : 'Replace fillers with brief pauses between ideas.';

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Coach hints</Text>
      <CoachHintCard text={dynamicHint} />
      <CoachHintCard text={drillHint} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F7F8FF', padding: 20, gap: 10 },
  title: { color: palette.text, ...type.display },
});
