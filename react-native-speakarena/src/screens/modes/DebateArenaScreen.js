import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import ActionRow from '../../components/ActionRow';
import { palette, type } from '../../theme/design';

const PHASES = ['prompt', 'speak', 'reflect'];

export default function DebateArenaScreen() {
  const [phase, setPhase] = useState('prompt');
  const phaseIndex = useMemo(() => PHASES.indexOf(phase), [phase]);

  return (
    <SafeAreaView style={styles.root}>
      <CleanShell>
        <Text style={styles.title}>Speak Persuasive</Text>
        <Text style={styles.sub}>Step {phaseIndex + 1} of 3 · {phase.toUpperCase()}</Text>

        {phase === 'prompt' && (
          <CleanCard style={{ marginTop: 14 }}>
            <Text style={styles.label}>Prompt</Text>
            <Text style={styles.prompt}>Remote work improves output more than office work.</Text>
            <ActionRow primaryTitle="Start speaking" onPrimary={() => setPhase('speak')} secondaryTitle="Switch prompt" onSecondary={() => {}} />
          </CleanCard>
        )}

        {phase === 'speak' && (
          <CleanCard style={{ marginTop: 14 }}>
            <Text style={styles.label}>Speak</Text>
            <Text style={styles.prompt}>Deliver a 60-second argument. Keep opening to one sentence.</Text>
            <Text style={styles.live}>Live transcript appears here during recording…</Text>
            <ActionRow primaryTitle="Stop and reflect" onPrimary={() => setPhase('reflect')} secondaryTitle="Restart" onSecondary={() => setPhase('prompt')} />
          </CleanCard>
        )}

        {phase === 'reflect' && (
          <CleanCard style={{ marginTop: 14 }}>
            <Text style={styles.label}>Reflect</Text>
            <Text style={styles.prompt}>Strong structure. Next attempt: add one concrete metric in first 20 seconds.</Text>
            <ActionRow primaryTitle="Retry with change" onPrimary={() => setPhase('speak')} secondaryTitle="Done" onSecondary={() => setPhase('prompt')} />
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
  live: { color: '#C8D0E2', marginTop: 10, ...type.body },
});
