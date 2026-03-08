import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Bouncy3DButton from '../../components/Bouncy3DButton';
import { TRACKS } from '../../data/tracks';

export default function SessionPreflightScreen({ route, navigation }) {
  const trackId = route.params?.trackId || 'persuasive';
  const track = TRACKS[trackId] || TRACKS.persuasive;

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>{track.title}</Text>
        <Text style={styles.prompt}>{track.prompt}</Text>
        <Text style={styles.hint}>{track.focusHint}</Text>

        <Bouncy3DButton title="Start speaking" variant="green" onPress={() => navigation.navigate('SessionLive', { trackId })} style={{ marginTop: 16 }} />
        <Bouncy3DButton title="Change prompt" variant="white" onPress={() => navigation.navigate('PromptPicker')} style={{ marginTop: 10 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F9F6', padding: 20, justifyContent: 'center' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.07)',
  },
  title: { color: '#4B4B4B', fontSize: 26, fontWeight: '900' },
  prompt: { color: '#4B4B4B', fontSize: 16, fontWeight: '800', marginTop: 10, lineHeight: 22 },
  hint: { color: '#AFAFAF', fontSize: 14, marginTop: 10, fontWeight: '700', lineHeight: 20 },
});
