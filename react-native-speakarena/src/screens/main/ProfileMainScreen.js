import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Target, Clock3 } from 'lucide-react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import { palette } from '../../theme/design';

export default function ProfileMainScreen() {
  return (
    <CleanShell>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.sub}>Track your communication growth.</Text>

      <CleanCard style={{ marginTop: 14 }}>
        <Text style={styles.cardTitle}>Rishi</Text>
        <Text style={styles.cardSub}>Skill-first speaking practice</Text>
      </CleanCard>

      <View style={styles.grid}>
        <CleanCard style={{ flex: 1 }}>
          <View style={styles.row}><Target size={15} color={palette.accent} /><Text style={styles.metric}>89%</Text></View>
          <Text style={styles.metricLabel}>Clarity</Text>
        </CleanCard>
        <CleanCard style={{ flex: 1 }}>
          <View style={styles.row}><Clock3 size={15} color={palette.accent} /><Text style={styles.metric}>42m</Text></View>
          <Text style={styles.metricLabel}>This week</Text>
        </CleanCard>
      </View>
    </CleanShell>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.text, fontSize: 30, fontWeight: '800', letterSpacing: -0.3 },
  sub: { color: palette.subtext, marginTop: 2, fontSize: 14 },
  cardTitle: { color: palette.text, fontWeight: '700', fontSize: 17 },
  cardSub: { color: palette.subtext, marginTop: 4 },
  grid: { flexDirection: 'row', gap: 8, marginTop: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metric: { color: palette.text, fontWeight: '700', fontSize: 17 },
  metricLabel: { color: '#9AA3B6', marginTop: 4, fontSize: 12 },
});
