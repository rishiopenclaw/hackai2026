import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import ActionRow from '../../components/ActionRow';
import { palette, type } from '../../theme/design';

export default function StoryBuilderScreen() {
  const [phase, setPhase] = useState('prompt');

  return (
    <SafeAreaView style={styles.root}>
      <CleanShell>
        <Text style={styles.title}>Speak Human</Text>
        <Text style={styles.sub}>Prompt → Speak → Reflect</Text>

        {phase === 'prompt' ? (
          <CleanCard style={{ marginTop: 14 }}>
            <Text style={styles.label}>Prompt</Text>
            <Text style={styles.prompt}>Tell a 60s story about a setback that improved your decision-making.</Text>
            <ActionRow primaryTitle="Start story" onPrimary={() => setPhase('speak')} secondaryTitle="New prompt" onSecondary={() => {}} />
          </CleanCard>
        ) : phase === 'speak' ? (
          <CleanCard style={{ marginTop: 14 }}>
            <Text style={styles.label}>Speak</Text>
            <Text style={styles.prompt}>Use hook, conflict, and payoff in that order.</Text>
            <ActionRow primaryTitle="Stop and reflect" onPrimary={() => setPhase('reflect')} secondaryTitle="Restart" onSecondary={() => setPhase('prompt')} />
          </CleanCard>
        ) : (
          <CleanCard style={{ marginTop: 14 }}>
            <Text style={styles.label}>Reflect</Text>
            <Text style={styles.prompt}>Great hook. Next: make conflict more specific and end with one lesson line.</Text>
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
