import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { Mic, Waves } from 'lucide-react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import ActionRow from '../../components/ActionRow';
import { palette, type } from '../../theme/design';
import { TRACKS } from '../../data/tracks';

export default function SessionLiveScreen({ route, navigation }) {
  const trackId = route.params?.trackId || 'persuasive';
  const track = TRACKS[trackId] || TRACKS.persuasive;
  const pulse = useMemo(() => new Animated.Value(1), []);
  const [line] = useState('Live transcript appears here during recording…');

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.12, duration: 520, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 520, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <CleanShell>
      <Text style={styles.title}>{track.title}</Text>
      <Text style={styles.sub}>Speak phase</Text>

      <CleanCard style={{ marginTop: 14 }}>
        <Text style={styles.label}>Prompt</Text>
        <Text style={styles.prompt}>{track.prompt}</Text>

        <View style={styles.liveRow}>
          <Animated.View style={[styles.micOrb, { transform: [{ scale: pulse }] }]}>
            <Mic size={16} color={palette.accent2} />
          </Animated.View>
          <View style={{ flex: 1 }}>
            <View style={styles.rowInline}><Waves size={14} color="#97A2B9" /><Text style={styles.liveLabel}>Live transcript</Text></View>
            <Text style={styles.transcript}>{line}</Text>
          </View>
        </View>

        <ActionRow
          primaryTitle="Stop and reflect"
          onPrimary={() => navigation.navigate('SessionReflect', { trackId })}
          secondaryTitle="Settings"
          onSecondary={() => navigation.navigate('SessionSettings')}
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
  liveRow: { marginTop: 14, flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  micOrb: {
    width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(141,123,255,0.18)', borderWidth: 1, borderColor: 'rgba(109,94,248,0.25)'
  },
  rowInline: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  liveLabel: { color: '#97A2B9', ...type.label },
  transcript: { color: '#D6DCE8', marginTop: 5, ...type.body },
});
