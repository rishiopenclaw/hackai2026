import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Swords, BriefcaseBusiness, Siren, BookOpenText, ChevronRight } from 'lucide-react-native';
import AppleCard from '../../components/AppleCard';

const MODES = [
  { key: 'DebateArena', title: 'Debate Arena', sub: 'Timed rounds + rebuttals', icon: Swords, color: '#FFB25B' },
  { key: 'HotSeatInterview', title: 'Hot Seat Interview', sub: 'Adaptive follow-up questions', icon: BriefcaseBusiness, color: '#8FA2FF' },
  { key: 'CrisisRoom', title: 'Crisis Room', sub: 'Live constraint changes', icon: Siren, color: '#FF6C6C' },
  { key: 'StoryBuilder', title: 'Story Builder', sub: 'Hook, conflict, payoff', icon: BookOpenText, color: '#63D58A' },
];

export default function PracticeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Practice Modes</Text>
        <Text style={styles.sub}>Pick your training loop.</Text>

        <View style={{ marginTop: 12, gap: 10 }}>
          {MODES.map((m) => {
            const Icon = m.icon;
            return (
              <Pressable key={m.key} onPress={() => navigation.navigate(m.key)}>
                <AppleCard>
                  <View style={styles.row}>
                    <View style={[styles.iconWrap, { backgroundColor: `${m.color}22` }]}><Icon size={18} color={m.color} /></View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardTitle}>{m.title}</Text>
                      <Text style={styles.cardSub}>{m.sub}</Text>
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
