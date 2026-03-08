import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Mic, AudioLines } from 'lucide-react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import CleanCTA from '../../components/CleanCTA';
import { palette } from '../../theme/design';

export default function HomeMainScreen() {
  return (
    <CleanShell>
      <Text style={styles.title}>Today</Text>
      <Text style={styles.sub}>One focused session. Real feedback.</Text>

      <CleanCard style={{ marginTop: 14 }}>
        <View style={styles.row}>
          <Mic size={16} color={palette.accent} />
          <Text style={styles.cardTitle}>Warmup Echo</Text>
        </View>
        <Text style={styles.cardSub}>8 minutes · Prompt → Speak → Reflect → Retry</Text>
        <CleanCTA title="Start session" onPress={() => {}} style={{ marginTop: 12 }} />
      </CleanCard>

      <CleanCard style={{ marginTop: 10 }}>
        <View style={styles.row}>
          <AudioLines size={16} color={palette.accent} />
          <Text style={styles.cardTitle}>Quick Drill</Text>
        </View>
        <Text style={styles.cardSub}>3-minute clarity sprint.</Text>
      </CleanCard>
    </CleanShell>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.text, fontSize: 30, fontWeight: '800', letterSpacing: -0.3 },
  sub: { color: palette.subtext, marginTop: 2, fontSize: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardTitle: { color: palette.text, fontSize: 17, fontWeight: '700' },
  cardSub: { color: palette.subtext, marginTop: 6, lineHeight: 19 },
});
