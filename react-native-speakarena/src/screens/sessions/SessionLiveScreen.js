import React, { useMemo } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Bouncy3DButton from '../../components/Bouncy3DButton';

export default function SessionLiveScreen({ route, navigation }) {
  const trackId = route.params?.trackId || 'persuasive';
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
        <Text style={styles.title}>SPEAK NOW</Text>

        <Animated.View style={[styles.micWrap, { transform: [{ scale: pulse }] }]}>
          <Text style={styles.mic}>🎙️</Text>
        </Animated.View>

        <Text style={styles.transcript}>Live transcript appears here while speaking...</Text>

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
  micWrap: {
    width: 84, height: 84, borderRadius: 42, alignSelf: 'center', marginTop: 16,
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#E9FAD9', borderWidth: 2, borderColor: '#58CC02',
  },
  mic: { fontSize: 32 },
  transcript: { color: '#AFAFAF', marginTop: 14, textAlign: 'center', fontWeight: '700', lineHeight: 20 },
});
