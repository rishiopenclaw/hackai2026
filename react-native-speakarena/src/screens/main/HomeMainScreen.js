import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Sparkles, Play, Clock3 } from 'lucide-react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import ActionRow from '../../components/ActionRow';
import { palette, type } from '../../theme/design';

export default function HomeMainScreen({ navigation }) {
  return (
    <CleanShell>
      <Text style={styles.title}>Hi Rishi 👋</Text>
      <Text style={styles.sub}>Let’s make your speaking 1% better today.</Text>

      <CleanCard style={{ marginTop: 14 }}>
        <View style={styles.rowTop}>
          <View style={[styles.badge, { backgroundColor: '#EEE9FF' }]}><Sparkles size={14} color={palette.accent2} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Daily warmup</Text>
            <Text style={styles.cardSub}>8-minute guided speaking session</Text>
          </View>
        </View>
        <ActionRow
          primaryTitle="Start"
          onPrimary={() => navigation.navigate('Practice', { screen: 'DebateArena' })}
          secondaryTitle="Preview"
          onSecondary={() => navigation.navigate('Practice')}
        />
      </CleanCard>

      <View style={styles.quickRow}>
        <CleanCard style={{ flex: 1 }}>
          <View style={styles.mini}><Play size={14} color={palette.sky} /><Text style={styles.miniText}>Quick rep</Text></View>
        </CleanCard>
        <CleanCard style={{ flex: 1 }}>
          <View style={styles.mini}><Clock3 size={14} color={palette.peach} /><Text style={styles.miniText}>3 min</Text></View>
        </CleanCard>
      </View>
    </CleanShell>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.text, ...type.display },
  sub: { color: palette.subtext, marginTop: 4, ...type.body },
  rowTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  badge: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { color: palette.text, ...type.heading },
  cardSub: { color: palette.subtext, marginTop: 4, ...type.body },
  quickRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  mini: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  miniText: { color: palette.text, fontWeight: '700' },
});
