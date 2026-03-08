import React from 'react';
import { StyleSheet, Text } from 'react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import ActionRow from '../../components/ActionRow';
import { palette, type } from '../../theme/design';
import { TRACKS } from '../../data/tracks';

export default function SessionReflectScreen({ route, navigation }) {
  const trackId = route.params?.trackId || 'persuasive';
  const track = TRACKS[trackId] || TRACKS.persuasive;

  return (
    <CleanShell>
      <Text style={styles.title}>{track.title}</Text>
      <Text style={styles.sub}>Reflection</Text>

      <CleanCard style={{ marginTop: 14 }}>
        <Text style={styles.label}>What improved</Text>
        <Text style={styles.prompt}>Your structure was clear and easy to follow.</Text>
      </CleanCard>

      <CleanCard style={{ marginTop: 10 }}>
        <Text style={styles.label}>What next</Text>
        <Text style={styles.prompt}>{track.reflection}</Text>
        <ActionRow
          primaryTitle="Retry with this change"
          onPrimary={() => navigation.navigate('SessionRetry', { trackId })}
          secondaryTitle="Finish"
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
