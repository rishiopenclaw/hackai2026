import React, { useMemo } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Bouncy3DButton from '../../components/Bouncy3DButton';

export default function SessionLiveScreen({ route, navigation }) {
  const trackId = route.params?.trackId || 'persuasive';
  const mode = route.params?.mode;
  const topic = route.params?.topic;
  const roomTitle = route.params?.roomTitle;
  const localFriend = route.params?.localFriend;
  const pulse = useMemo(() => new Animated.Value(1), []);

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.12, duration: 500, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>{mode === 'club-debate' ? 'DEBATE LIVE' : 'SPEAK NOW'}</Text>

        {mode === 'club-debate' && (
          <View style={styles.topicWrap}>
            <Text style={styles.roomName}>{roomTitle || 'Debate Room'}</Text>
            <Text style={styles.topicLabel}>{localFriend ? 'Mode: Friend Nearby' : 'Mode: Online Lobby'}</Text>
            <Text style={styles.topicText}>{topic}</Text>
          </View>
        )}

        <Animated.View style={[styles.micWrap, { transform: [{ scale: pulse }] }]}> 
          <Text style={styles.mic}>🎙️</Text>
        </Animated.View>

        <Text style={styles.transcript}>
          {mode === 'club-debate'
            ? 'Take your stance and defend it with structure, examples, and rebuttal.'
            : 'Live transcript appears here while speaking...'}
        </Text>

        <Bouncy3DButton title="Stop and reflect" variant="green" onPress={() => navigation.navigate('SessionReflect', { trackId })} style={{ marginTop: 16 }} />
        <Bouncy3DButton title="Settings" variant="white" onPress={() => navigation.navigate('SessionSettings')} style={{ marginTop: 10 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F9F6', padding: 20, justifyContent: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 18, borderWidth: 1, borderColor: 'rgba(0,0,0,0.07)' },
  title: { color: '#4B4B4B', fontSize: 22, fontWeight: '900', textAlign: 'center' },
  topicWrap: {
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    backgroundColor: '#F7F9FF',
    padding: 12,
  },
  roomName: { color: '#2A3150', fontSize: 12, fontWeight: '800' },
  topicLabel: { color: '#7A84A3', fontSize: 11, fontWeight: '700', marginTop: 4 },
  topicText: { color: '#1E2440', fontSize: 14, fontWeight: '800', marginTop: 2, lineHeight: 20 },
  micWrap: {
    width: 84, height: 84, borderRadius: 42, alignSelf: 'center', marginTop: 16,
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#E9FAD9', borderWidth: 2, borderColor: '#58CC02',
  },
  mic: { fontSize: 32 },
  transcript: { color: '#AFAFAF', marginTop: 14, textAlign: 'center', fontWeight: '700', lineHeight: 20 },
});
