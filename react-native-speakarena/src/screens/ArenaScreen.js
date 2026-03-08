import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Animated, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';
import ProgressBar from '../components/ProgressBar';
import MobileFrame from '../components/MobileFrame';
import { colors } from '../theme/colors';

function PulsingMic({ active }) {
  const scale = useMemo(() => new Animated.Value(1), []);
  useEffect(() => {
    if (!active) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.12, duration: 520, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 520, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [active, scale]);

  return (
    <Animated.View style={[styles.micOuter, { transform: [{ scale }] }]}>
      <LinearGradient colors={active ? colors.sunset : ['#3A3F4C', '#222735']} style={styles.micInner}>
        <Text style={{ color: '#fff', fontSize: 20 }}>🎙️</Text>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgBottom }}>
      <MobileFrame>
        <LinearGradient colors={[colors.bgTop, '#0B0D13', colors.bgBottom]} style={styles.container}>
          <Text style={styles.title}>Arena</Text>
          <GlassCard><Text style={styles.topic}>Is remote work better than office work?</Text></GlassCard>

          <View style={styles.row}>
            <GlassCard style={styles.player}><Text style={styles.playerTitle}>You</Text><PulsingMic active={youTurn} /></GlassCard>
            <GlassCard style={styles.player}><Text style={styles.playerTitle}>Opponent</Text><PulsingMic active={!youTurn} /></GlassCard>
          </View>

          <Text style={styles.timer}>{seconds}s</Text>
          <ProgressBar progress={seconds / 60} fill={colors.sunset[2]} />

          <GlassCard style={{ minHeight: 122 }}>
            <Text style={styles.playerTitle}>Live Transcript</Text>
            <Text style={styles.transcript}>I believe remote work boosts focus and removes commute fatigue...</Text>
          </GlassCard>

          <GlowButton title="End Turn" onPress={() => setYouTurn((v) => !v)} />
        </LinearGradient>
      </MobileFrame>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { color: '#fff', fontSize: 32, fontWeight: '900' },
  topic: { color: '#fff', fontSize: 15, fontWeight: '700' },
  row: { flexDirection: 'row', gap: 10 },
  player: { flex: 1 },
  playerTitle: { color: '#fff', fontWeight: '800', marginBottom: 8 },
  micOuter: { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
  micInner: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  timer: { color: '#FF9A2D', textAlign: 'right', fontSize: 24, fontWeight: '900' },
  transcript: { color: '#A1A1AA', fontWeight: '500' },
});
