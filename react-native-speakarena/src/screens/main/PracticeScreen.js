import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import { AudioLines, Mic, MessageCircleQuestion, BookOpenText, ChevronRight } from 'lucide-react-native';
import AppleCard from '../../components/AppleCard';

const TRACKS = [
  { key: 'DebateArena', title: 'Speak Persuasive', sub: 'Build claims, rebut calmly, land your point.', icon: AudioLines, color: '#FFB25B' },
  { key: 'HotSeatInterview', title: 'Think Fast', sub: 'Answer on-the-spot with structured clarity.', icon: MessageCircleQuestion, color: '#8FA2FF' },
  { key: 'CrisisRoom', title: 'Stay Clear Under Pressure', sub: 'Adapt your response when constraints change.', icon: Mic, color: '#FF6C6C' },
  { key: 'StoryBuilder', title: 'Speak Human', sub: 'Tell stories with hook, conflict, and payoff.', icon: BookOpenText, color: '#63D58A' },
];

export default function PracticeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Practice Tracks</Text>
        <Text style={styles.sub}>Prompt → Speak → Reflect → Retry</Text>

        <View style={{ marginTop: 12, gap: 10 }}>
          {TRACKS.map((t) => {
            const Icon = t.icon;
            return (
              <Pressable key={t.key} onPress={() => navigation.navigate(t.key)}>
                <AppleCard>
                  <View style={styles.row}>
                    <View style={[styles.iconWrap, { backgroundColor: `${t.color}22` }]}><Icon size={18} color={t.color} /></View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardTitle}>{t.title}</Text>
                      <Text style={styles.cardSub}>{t.sub}</Text>
                    </View>
                    <ChevronRight size={18} color="#7E879A" />
                  </View>
                </AppleCard>
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#09090C' },
  content: { flex: 1, paddingHorizontal: 18, paddingTop: 16 },
  title: { color: '#fff', fontSize: 32, fontWeight: '800', letterSpacing: -0.3 },
  sub: { color: '#9DA5B6', marginTop: 2 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconWrap: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { color: '#fff', fontWeight: '700', fontSize: 16 },
  cardSub: { color: '#A3AAB7', marginTop: 2, fontSize: 13 },
});
