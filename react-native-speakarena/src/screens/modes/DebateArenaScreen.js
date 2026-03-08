import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Animated, Easing } from 'react-native';
import { Mic, Waves } from 'lucide-react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import ActionRow from '../../components/ActionRow';
import { palette, type, motion } from '../../theme/design';

const LINES = [
  'Remote work improves output when async systems are clear.',
  'I should define one measurable outcome before giving examples.',
  'Add one concrete case and trim the opening to one sentence.',
];

export default function DebateArenaScreen() {
  const [lineIndex, setLineIndex] = useState(0);
  const pulse = useMemo(() => new Animated.Value(1), []);
  const card1 = useMemo(() => new Animated.Value(0), []);
  const card2 = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.stagger(60, [
      Animated.timing(card1, { toValue: 1, duration: motion.base, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      Animated.timing(card2, { toValue: 1, duration: motion.base, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
    ]).start();

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.12, duration: 520, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1.0, duration: 520, useNativeDriver: true }),
      ])
    );
    loop.start();

    const id = setInterval(() => setLineIndex((v) => (v + 1) % LINES.length), 1900);
    return () => {
      loop.stop();
      clearInterval(id);
    };
  }, [card1, card2, pulse]);

  return (
    <SafeAreaView style={styles.root}>
      <CleanShell>
        <Text style={styles.title}>Speak Persuasive</Text>
        <Text style={styles.sub}>Live practice with guided reflection.</Text>

        <Animated.View
          style={{
            opacity: card1,
            transform: [{ translateY: card1.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }],
            marginTop: 14,
          }}
        >
          <CleanCard>
            <Text style={styles.label}>Prompt</Text>
            <Text style={styles.prompt}>Remote work improves output more than office work.</Text>

            <View style={styles.liveRow}>
              <Animated.View style={[styles.micOrb, { transform: [{ scale: pulse }] }]}>
                <Mic size={16} color={palette.accent} />
              </Animated.View>
              <View style={{ flex: 1 }}>
                <View style={styles.rowInline}>
                  <Waves size={14} color="#97A2B9" />
                  <Text style={styles.liveLabel}>Live transcript</Text>
                </View>
                <Text style={styles.transcript}>{LINES[lineIndex]}</Text>
              </View>
            </View>

            <ActionRow primaryTitle="Stop" onPrimary={() => {}} secondaryTitle="Retry" onSecondary={() => {}} />
          </CleanCard>
        </Animated.View>

        <Animated.View
          style={{
            opacity: card2,
            transform: [{ translateY: card2.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }],
            marginTop: 10,
          }}
        >
          <CleanCard>
            <Text style={styles.label}>Reflection</Text>
            <Text style={styles.note}>Strong structure. Next attempt: make your first sentence shorter and include one concrete metric.</Text>
            <ActionRow primaryTitle="Retry with this change" onPrimary={() => {}} secondaryTitle="Save note" onSecondary={() => {}} />
          </CleanCard>
        </Animated.View>
      </CleanShell>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg },
  title: { color: palette.text, ...type.display },
  sub: { color: palette.subtext, marginTop: 6, ...type.body },
  label: { color: '#8E97AC', ...type.label, textTransform: 'uppercase', letterSpacing: 1 },
  prompt: { color: palette.text, marginTop: 8, ...type.heading },
  liveRow: { marginTop: 14, flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  micOrb: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(240,179,92,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(240,179,92,0.25)',
  },
  rowInline: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  liveLabel: { color: '#97A2B9', ...type.label },
  transcript: { color: '#D6DCE8', marginTop: 5, ...type.body },
  note: { color: palette.subtext, marginTop: 8, ...type.body },
});
