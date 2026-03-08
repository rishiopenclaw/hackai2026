import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import ActionRow from '../../components/ActionRow';
import { palette } from '../../theme/design';

export default function HomeMainScreen() {
  return (
    <CleanShell>
      <Text style={styles.eyebrow}>TODAY</Text>
      <Text style={styles.title}>Practice with intention.</Text>
      <Text style={styles.sub}>One focused session can improve clarity faster than random repetition.</Text>

      <CleanCard style={{ marginTop: 14 }}>
        <Text style={styles.cardTitle}>Warmup Echo</Text>
        <Text style={styles.cardSub}>8-minute guided speaking loop. Prompt → Speak → Reflect → Retry.</Text>
        <ActionRow
          primaryTitle="Start"
          onPrimary={() => {}}
          secondaryTitle="Preview"
          onSecondary={() => {}}
        />
      </CleanCard>

      <CleanCard style={{ marginTop: 10 }}>
        <Text style={styles.cardTitle}>Quick practice</Text>
        <Text style={styles.cardSub}>3-minute check-in to sharpen your opening response.</Text>
        <ActionRow
          primaryTitle="Try now"
          onPrimary={() => {}}
          secondaryTitle="Why this"
          onSecondary={() => {}}
        />
      </CleanCard>
    </CleanShell>
  );
}

const styles = StyleSheet.create({
  eyebrow: { color: '#8E97AC', fontSize: 11, letterSpacing: 1.6, fontWeight: '700', marginTop: 2 },
  title: { color: palette.text, fontSize: 34, lineHeight: 38, fontWeight: '800', letterSpacing: -0.5, marginTop: 4 },
  sub: { color: palette.subtext, marginTop: 6, fontSize: 14, lineHeight: 20, maxWidth: 340 },
  cardTitle: { color: palette.text, fontSize: 18, fontWeight: '700' },
  cardSub: { color: palette.subtext, marginTop: 5, lineHeight: 19 },
});
