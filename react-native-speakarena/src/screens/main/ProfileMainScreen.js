import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Target, Clock3, TrendingUp } from 'lucide-react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import { palette } from '../../theme/design';

export default function ProfileMainScreen() {
  return (
    <CleanShell>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.sub}>Your communication signal.</Text>

      <CleanCard style={{ marginTop: 14 }}>
        <Text style={styles.name}>Rishi</Text>
        <Text style={styles.caption}>Focused speaking practice • daily refinement</Text>
      </CleanCard>

      <View style={styles.grid}>
        <CleanCard style={{ flex: 1 }}>
          <View style={styles.row}><Target size={15} color={palette.accent} /><Text style={styles.metric}>89%</Text></View>
          <Text style={styles.metricLabel}>Clarity</Text>
        </CleanCard>
        <CleanCard style={{ flex: 1 }}>
          <View style={styles.row}><Clock3 size={15} color={palette.accent} /><Text style={styles.metric}>42m</Text></View>
          <Text style={styles.metricLabel}>Week</Text>
        </CleanCard>
        <CleanCard style={{ flex: 1 }}>
          <View style={styles.row}><TrendingUp size={15} color={palette.accent} /><Text style={styles.metric}>+16%</Text></View>
          <Text style={styles.metricLabel}>Growth</Text>
        </CleanCard>
      </View>
    </CleanShell>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.text, fontSize: 40, lineHeight: 42, fontWeight: '800', letterSpacing: -0.8 },
  sub: { color: palette.subtext, marginTop: 4, fontSize: 14 },
  name: { color: palette.text, fontWeight: '700', fontSize: 20 },
  caption: { color: palette.subtext, marginTop: 4 },
  grid: { flexDirection: 'row', gap: 8, marginTop: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metric: { color: palette.text, fontWeight: '700', fontSize: 17 },
  metricLabel: { color: '#9AA3B6', marginTop: 4, fontSize: 12 },
});
