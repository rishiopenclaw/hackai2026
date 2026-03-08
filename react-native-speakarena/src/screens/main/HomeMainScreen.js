import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Sparkles, Mic, Clock3, ArrowRight } from 'lucide-react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import CleanCTA from '../../components/CleanCTA';
import { palette } from '../../theme/design';

export default function HomeMainScreen() {
  return (
    <CleanShell>
      <Text style={styles.eyebrow}>SPEAKLAB</Text>
      <Text style={styles.title}>Today’s{`\n`}Focus</Text>

      <CleanCard style={{ marginTop: 14 }}>
        <View style={styles.rowTop}>
          <View style={styles.iconWrap}><Sparkles size={16} color={palette.accent} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Warmup Echo</Text>
            <Text style={styles.cardSub}>Prompt → Speak → Reflect → Retry</Text>
          </View>
          <ArrowRight size={16} color="#AAB2C5" />
        </View>
        <View style={styles.metaRow}>
          <View style={styles.meta}><Mic size={13} color="#AAB2C5" /><Text style={styles.metaText}>Clarity</Text></View>
          <View style={styles.meta}><Clock3 size={13} color="#AAB2C5" /><Text style={styles.metaText}>8 min</Text></View>
        </View>
        <CleanCTA title="Start session" onPress={() => {}} style={{ marginTop: 14 }} />
      </CleanCard>

      <Text style={styles.section}>Suggested next</Text>

      <CleanCard style={{ marginTop: 8 }}>
        <Text style={styles.cardTitle}>Interview Quick Round</Text>
        <Text style={styles.cardSub}>3 high-pressure questions with instant reflection.</Text>
      </CleanCard>
    </CleanShell>
  );
}

const styles = StyleSheet.create({
  eyebrow: { color: '#8F98AD', fontSize: 11, letterSpacing: 1.6, fontWeight: '700', marginTop: 2 },
  title: { color: palette.text, fontSize: 40, lineHeight: 42, fontWeight: '800', letterSpacing: -0.8, marginTop: 4 },
  rowTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(240,179,92,0.16)',
  },
  cardTitle: { color: palette.text, fontSize: 18, fontWeight: '700' },
  cardSub: { color: palette.subtext, marginTop: 3, lineHeight: 19 },
  metaRow: { flexDirection: 'row', gap: 12, marginTop: 10 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaText: { color: '#AAB2C5', fontSize: 12, fontWeight: '600' },
  section: { color: '#8F98AD', fontSize: 13, fontWeight: '700', marginTop: 18, marginBottom: 2 },
});
