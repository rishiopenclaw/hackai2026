import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { AudioLines, MessageCircleQuestion, Mic, BookOpenText, ChevronRight } from 'lucide-react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import { palette } from '../../theme/design';

const TRACKS = [
  { key: 'DebateArena', title: 'Speak Persuasive', sub: 'Build claims and rebut calmly.', icon: AudioLines },
  { key: 'HotSeatInterview', title: 'Think Fast', sub: 'Answer on-the-spot with structure.', icon: MessageCircleQuestion },
  { key: 'CrisisRoom', title: 'Stay Clear Under Pressure', sub: 'Adapt when constraints change.', icon: Mic },
  { key: 'StoryBuilder', title: 'Speak Human', sub: 'Tell stories with emotional flow.', icon: BookOpenText },
];

export default function PracticeScreen({ navigation }) {
  return (
    <CleanShell>
      <Text style={styles.title}>Practice Tracks</Text>
      <Text style={styles.sub}>Choose a skill and run one focused loop.</Text>

      <View style={{ marginTop: 12, gap: 10 }}>
        {TRACKS.map((t) => {
          const Icon = t.icon;
          return (
            <Pressable key={t.key} onPress={() => navigation.navigate(t.key)}>
              <CleanCard>
                <View style={styles.row}>
                  <Icon size={16} color={palette.accent} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{t.title}</Text>
                    <Text style={styles.cardSub}>{t.sub}</Text>
                  </View>
                  <ChevronRight size={16} color="#7E879A" />
                </View>
              </CleanCard>
            </Pressable>
          );
        })}
      </View>
    </CleanShell>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.text, fontSize: 30, fontWeight: '800', letterSpacing: -0.3 },
  sub: { color: palette.subtext, marginTop: 2, fontSize: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  cardTitle: { color: palette.text, fontSize: 16, fontWeight: '700' },
  cardSub: { color: palette.subtext, marginTop: 2, fontSize: 13 },
});
