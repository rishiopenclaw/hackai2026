import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors } from '../theme/colors';
import DuoButton from '../components/DuoButton';
import ProgressBar from '../components/ProgressBar';

function PulsingMic({ active }) {
  const scale = useMemo(() => new Animated.Value(1), []);
  useEffect(() => {
    if (!active) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.12, duration: 500, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, [active, scale]);

  return (
    <Animated.View style={[styles.micOuter, { transform: [{ scale }], backgroundColor: active ? '#39CC5E44' : '#AAB5C733' }]}>
      <View style={[styles.micInner, { backgroundColor: active ? colors.green : '#AAB5C7' }]}>
        <Text style={{ color: 'white', fontSize: 22 }}>🎙️</Text>
      </View>
    </Animated.View>
  );
}

export default function ArenaScreen() {
  const [seconds, setSeconds] = useState(60);
  const [youTurn, setYouTurn] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setYouTurn((v) => !v);
          return youTurn ? 60 : 30;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [youTurn]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arena</Text>
      <View style={styles.card}><Text style={styles.topic}>Is remote work better than office work?</Text></View>

      <View style={styles.row}>
        <View style={styles.player}><Text style={styles.playerTitle}>You</Text><PulsingMic active={youTurn} /></View>
        <View style={styles.player}><Text style={styles.playerTitle}>Opponent</Text><PulsingMic active={!youTurn} /></View>
      </View>

      <Text style={styles.timer}>{seconds}s</Text>
      <ProgressBar progress={seconds / 60} fill={colors.orange} />

      <View style={[styles.card, { minHeight: 120 }]}>
        <Text style={styles.label}>Live Transcript</Text>
        <Text style={styles.transcript}>I believe remote work boosts focus and removes commute fatigue...</Text>
      </View>

      <DuoButton title="End Turn" onPress={() => setYouTurn((v) => !v)} fill={colors.blue} base={colors.purple} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16, gap: 12 },
  title: { fontSize: 32, fontWeight: '900', color: colors.text },
  card: { backgroundColor: colors.card, borderRadius: 24, padding: 14 },
  topic: { fontSize: 16, fontWeight: '700', color: colors.text },
  row: { flexDirection: 'row', gap: 12 },
  player: { flex: 1, backgroundColor: colors.card, borderRadius: 24, padding: 12, alignItems: 'center' },
  playerTitle: { fontWeight: '800', marginBottom: 8 },
  micOuter: { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center' },
  micInner: { width: 66, height: 66, borderRadius: 33, alignItems: 'center', justifyContent: 'center' },
  timer: { fontSize: 26, fontWeight: '900', color: colors.text, textAlign: 'right' },
  label: { fontWeight: '800', marginBottom: 8 },
  transcript: { color: colors.subtext, fontWeight: '600' },
});
