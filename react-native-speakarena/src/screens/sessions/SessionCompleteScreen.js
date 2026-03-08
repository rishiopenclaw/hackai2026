import React from 'react';
import { StyleSheet, Text } from 'react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import ActionRow from '../../components/ActionRow';
import { palette, type } from '../../theme/design';
import { TRACKS } from '../../data/tracks';

export default function SessionCompleteScreen({ route, navigation }) {
  const trackId = route.params?.trackId || 'persuasive';
  const track = TRACKS[trackId] || TRACKS.persuasive;

  return (
    <CleanShell>
      <Text style={styles.title}>Session complete</Text>
      <Text style={styles.sub}>{track.title}</Text>

      <CleanCard style={{ marginTop: 14 }}>
        <Text style={styles.label}>Summary</Text>
        <Text style={styles.prompt}>You completed one focused speaking loop with reflection and retry guidance.</Text>
        <ActionRow
          primaryTitle="Back to tracks"
          onPrimary={() => navigation.navigate('PracticeHome')}
          secondaryTitle="Home"
          onSecondary={() => navigation.navigate('PracticeHome')}
        />
      </CleanCard>
    </CleanShell>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.text, ...type.display },
  sub: { color: palette.subtext, marginTop: 4, ...type.body },
  label: { color: '#8E97AC', ...type.label, textTransform: 'uppercase', letterSpacing: 1 },
  prompt: { color: palette.text, marginTop: 7, ...type.heading, lineHeight: 24 },
});
