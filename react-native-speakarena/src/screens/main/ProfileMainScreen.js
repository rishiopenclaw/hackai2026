import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import { palette } from '../../theme/design';

export default function ProfileMainScreen() {
  return (
    <CleanShell>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.sub}>Skill-first speaking development.</Text>

      <CleanCard style={{ marginTop: 14 }}>
        <Text style={styles.cardTitle}>Rishi</Text>
        <Text style={styles.cardSub}>You’re strongest in clarity and structured responses.</Text>
      </CleanCard>

      <View style={styles.grid}>
        <CleanCard style={{ flex: 1 }}>
          <Text style={styles.metric}>89%</Text>
          <Text style={styles.metricLabel}>Clarity</Text>
        </CleanCard>
        <CleanCard style={{ flex: 1 }}>
          <Text style={styles.metric}>42m</Text>
          <Text style={styles.metricLabel}>This week</Text>
        </CleanCard>
      </View>
    </CleanShell>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.text, fontSize: 34, lineHeight: 38, fontWeight: '800', letterSpacing: -0.5 },
  sub: { color: palette.subtext, marginTop: 6, fontSize: 14, lineHeight: 20, maxWidth: 340 },
  cardTitle: { color: palette.text, fontWeight: '700', fontSize: 18 },
  cardSub: { color: palette.subtext, marginTop: 5, lineHeight: 19 },
  grid: { flexDirection: 'row', gap: 8, marginTop: 10 },
  metric: { color: palette.text, fontWeight: '800', fontSize: 24 },
  metricLabel: { color: '#9AA3B6', marginTop: 2, fontSize: 12 },
});
