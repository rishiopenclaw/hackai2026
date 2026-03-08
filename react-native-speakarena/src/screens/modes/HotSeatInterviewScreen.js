import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import ActionRow from '../../components/ActionRow';
import { palette, type } from '../../theme/design';

export default function HotSeatInterviewScreen() {
  const [phase, setPhase] = useState('prompt');

  return (
    <SafeAreaView style={styles.root}>
      <CleanShell>
        <Text style={styles.title}>Think Fast</Text>
        <Text style={styles.sub}>Prompt → Speak → Reflect</Text>

        {phase === 'prompt' ? (
          <CleanCard style={{ marginTop: 14 }}>
            <Text style={styles.label}>Prompt</Text>
            <Text style={styles.prompt}>Tell me about a time you handled conflict in a team.</Text>
            <ActionRow primaryTitle="Start response" onPrimary={() => setPhase('speak')} secondaryTitle="New question" onSecondary={() => {}} />
          </CleanCard>
        ) : phase === 'speak' ? (
          <CleanCard style={{ marginTop: 14 }}>
            <Text style={styles.label}>Speak</Text>
            <Text style={styles.prompt}>Answer in 60 seconds. Lead with outcome first.</Text>
            <ActionRow primaryTitle="Stop and reflect" onPrimary={() => setPhase('reflect')} secondaryTitle="Restart" onSecondary={() => setPhase('prompt')} />
          </CleanCard>
        ) : (
          <CleanCard style={{ marginTop: 14 }}>
            <Text style={styles.label}>Reflect</Text>
            <Text style={styles.prompt}>Clear example. Next try: shorten your opening by one sentence.</Text>
            <ActionRow primaryTitle="Retry" onPrimary={() => setPhase('speak')} secondaryTitle="Done" onSecondary={() => setPhase('prompt')} />
          </CleanCard>
        )}
      </CleanShell>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg },
  title: { color: palette.text, ...type.display },
  sub: { color: palette.subtext, marginTop: 6, ...type.body },
  label: { color: '#8E97AC', ...type.label, textTransform: 'uppercase', letterSpacing: 1 },
  prompt: { color: palette.text, marginTop: 8, ...type.heading, lineHeight: 24 },
});
