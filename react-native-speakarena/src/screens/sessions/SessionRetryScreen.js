import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Bouncy3DButton from '../../components/Bouncy3DButton';
import { TRACKS } from '../../data/tracks';

export default function SessionRetryScreen({ route, navigation }) {
  const trackId = route.params?.trackId || 'persuasive';
  const track = TRACKS[trackId] || TRACKS.persuasive;

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>RETRY</Text>
        <Text style={styles.text}>{track.reflection}</Text>

        <Bouncy3DButton title="Start retry" variant="green" onPress={() => navigation.navigate('SessionLive', { trackId })} style={{ marginTop: 16 }} />
        <Bouncy3DButton title="Skip" variant="white" onPress={() => navigation.navigate('SessionComplete', { trackId })} style={{ marginTop: 10 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F9F6', padding: 20, justifyContent: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 18, borderWidth: 1, borderColor: 'rgba(0,0,0,0.07)' },
  title: { color: '#4B4B4B', fontSize: 22, fontWeight: '900' },
  text: { color: '#6F76A1', marginTop: 10, fontWeight: '700', lineHeight: 20 },
});
