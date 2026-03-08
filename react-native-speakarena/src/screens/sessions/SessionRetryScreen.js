import React from 'react';
import { StyleSheet, Text } from 'react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import ActionRow from '../../components/ActionRow';
import { palette, type } from '../../theme/design';
import { TRACKS } from '../../data/tracks';

export default function SessionRetryScreen({ route, navigation }) {
  const trackId = route.params?.trackId || 'persuasive';
  const track = TRACKS[trackId] || TRACKS.persuasive;

  return (
    <CleanShell>
      <Text style={styles.title}>{track.title}</Text>
      <Text style={styles.sub}>Retry</Text>

      <CleanCard style={{ marginTop: 14 }}>
        <Text style={styles.label}>Apply this change</Text>
        <Text style={styles.prompt}>{track.reflection}</Text>
        <ActionRow
          primaryTitle="Start retry"
          onPrimary={() => navigation.navigate('SessionLive', { trackId })}
          secondaryTitle="Skip"
          onSecondary={() => navigation.navigate('SessionComplete', { trackId })}
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
