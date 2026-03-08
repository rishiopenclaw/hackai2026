import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Bouncy3DButton from '../../components/Bouncy3DButton';
import { TRACKS } from '../../data/tracks';

export default function SessionReflectScreen({ route, navigation }) {
  const trackId = route.params?.trackId || 'persuasive';
  const track = TRACKS[trackId] || TRACKS.persuasive;

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>REFLECT</Text>
        <Text style={styles.good}>✅ What improved</Text>
        <Text style={styles.text}>Your structure was clear and easy to follow.</Text>

        <Text style={[styles.good, { marginTop: 12 }]}>🎯 Next focus</Text>
        <Text style={styles.text}>{track.reflection}</Text>

        <Bouncy3DButton title="Retry with this change" variant="green" onPress={() => navigation.navigate('SessionRetry', { trackId })} style={{ marginTop: 16 }} />
        <Bouncy3DButton title="Coach hints" variant="white" onPress={() => navigation.navigate('CoachHints')} style={{ marginTop: 10 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F9F6', padding: 20, justifyContent: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 18, borderWidth: 1, borderColor: 'rgba(0,0,0,0.07)' },
  title: { color: '#4B4B4B', fontSize: 22, fontWeight: '900' },
  good: { color: '#4B4B4B', fontWeight: '900', marginTop: 10 },
  text: { color: '#6F76A1', marginTop: 4, fontWeight: '700', lineHeight: 20 },
});
