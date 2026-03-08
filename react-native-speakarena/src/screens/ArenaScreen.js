import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import DuoButton from '../components/DuoButton';
import ProgressBar from '../components/ProgressBar';
import GlassCard from '../components/GlassCard';

function PulsingMic({ active }) {
  const scale = useMemo(() => new Animated.Value(1), []);
  useEffect(() => {
    if (!active) return;
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(scale, { toValue: 1.14, duration: 520, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 520, useNativeDriver: true }),
    ]));
    loop.start();
    return () => loop.stop();
  }, [active, scale]);

  return (
    <Animated.View style={[styles.micOuter, { transform: [{ scale }] }]}>
      <LinearGradient colors={active ? [colors.orange, colors.orange2] : ['#4A5266', '#2A3142']} style={styles.micInner}>
        <Text style={{ color: 'white', fontSize: 20 }}>🎙️</Text>
      </LinearGradient>
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
    <LinearGradient colors={[colors.bg, '#0A0D16', '#241406']} style={styles.container}>
      <Text style={styles.title}>Arena</Text>

      <GlassCard><Text style={styles.topic}>Is remote work better than office work?</Text></GlassCard>

      <View style={styles.row}>
        <GlassCard style={styles.player}><Text style={styles.playerTitle}>You</Text><PulsingMic active={youTurn} /></GlassCard>
        <GlassCard style={styles.player}><Text style={styles.playerTitle}>Opponent</Text><PulsingMic active={!youTurn} /></GlassCard>
      </View>

      <Text style={styles.timer}>{seconds}s</Text>
      <ProgressBar progress={seconds / 60} fill={colors.orange} />

      <GlassCard style={{ minHeight: 130 }}>
        <Text style={styles.label}>Live Transcript</Text>
        <Text style={styles.transcript}>I believe remote work boosts focus and removes commute fatigue...</Text>
      </GlassCard>

      <DuoButton title="Transform voice" onPress={() => setYouTurn((v) => !v)} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 34, fontWeight: '900', color: colors.text },
  topic: { color: colors.text, fontWeight: '700', fontSize: 16 },
  row: { flexDirection: 'row', gap: 12 },
  player: { flex: 1 },
  playerTitle: { color: colors.text, fontWeight: '800', marginBottom: 8 },
  micOuter: { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
  micInner: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  timer: { fontSize: 26, fontWeight: '900', color: colors.orange2, textAlign: 'right' },
  label: { color: colors.text, fontWeight: '800', marginBottom: 8 },
  transcript: { color: colors.subtext, fontWeight: '600' },
});