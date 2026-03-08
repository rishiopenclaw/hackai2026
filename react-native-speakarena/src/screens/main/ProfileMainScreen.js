import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import { palette, type } from '../../theme/design';

export default function ProfileMainScreen() {
  return (
    <CleanShell>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.sub}>Your communication growth.</Text>

      <CleanCard style={{ marginTop: 14 }}>
        <Text style={styles.cardTitle}>Rishi</Text>
        <Text style={styles.cardSub}>Focused speaking practice, daily.</Text>
      </CleanCard>

      <View style={styles.grid}>
        <CleanCard style={{ flex: 1 }}>
          <Text style={styles.metric}>89%</Text>
          <Text style={styles.metricLabel}>Clarity</Text>
        </CleanCard>
        <CleanCard style={{ flex: 1 }}>
          <Text style={styles.metric}>42m</Text>
          <Text style={styles.metricLabel}>Week</Text>
        </CleanCard>
      </View>
    </CleanShell>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.text, ...type.display },
  sub: { color: palette.subtext, marginTop: 4, ...type.body },
  cardTitle: { color: palette.text, ...type.heading },
  cardSub: { color: palette.subtext, marginTop: 4, ...type.body },
  grid: { flexDirection: 'row', gap: 10, marginTop: 10 },
  metric: { color: palette.text, fontWeight: '800', fontSize: 24 },
  metricLabel: { color: palette.subtext, marginTop: 2, ...type.label },
});
