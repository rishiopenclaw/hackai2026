import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import ActionRow from '../../components/ActionRow';
import { palette, type } from '../../theme/design';

export default function HomeMainScreen({ navigation }) {
  return (
    <CleanShell>
      <Text style={styles.eyebrow}>TODAY</Text>
      <Text style={styles.title}>Start a focused session.</Text>
      <Text style={styles.sub}>One clear action now. One suggested follow-up after.</Text>

      <CleanCard style={{ marginTop: 14 }}>
        <Text style={styles.cardTitle}>Resume: Speak Persuasive</Text>
        <Text style={styles.cardSub}>Last stopped at reflection step. ~4 minutes remaining.</Text>
        <ActionRow
          primaryTitle="Resume"
          onPrimary={() => navigation.navigate('Practice', { screen: 'DebateArena' })}
          secondaryTitle="Start fresh"
          onSecondary={() => navigation.navigate('Practice', { screen: 'DebateArena' })}
        />
      </CleanCard>

      <CleanCard style={{ marginTop: 10 }}>
        <Text style={styles.cardTitle}>Suggested next: Think Fast</Text>
        <Text style={styles.cardSub}>Short on-the-spot interview response drill.</Text>
        <ActionRow
          primaryTitle="Try"
          onPrimary={() => navigation.navigate('Practice', { screen: 'HotSeatInterview' })}
          secondaryTitle="Browse all"
          onSecondary={() => navigation.navigate('Practice')}
        />
      </CleanCard>
    </CleanShell>
  );
}

const styles = StyleSheet.create({
  eyebrow: { color: '#8E97AC', fontSize: 11, letterSpacing: 1.6, fontWeight: '700', marginTop: 2 },
  title: { color: palette.text, ...type.display, marginTop: 4 },
  sub: { color: palette.subtext, marginTop: 6, ...type.body, maxWidth: 340 },
  cardTitle: { color: palette.text, fontSize: 18, fontWeight: '700' },
  cardSub: { color: palette.subtext, marginTop: 5, lineHeight: 19 },
});
