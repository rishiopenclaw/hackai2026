import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import { palette, type } from '../../theme/design';

const TRACKS = [
  { key: 'DebateArena', title: 'Speak Persuasive', sub: 'Build claims and rebut calmly.' },
  { key: 'HotSeatInterview', title: 'Think Fast', sub: 'Answer on-the-spot with structure.' },
  { key: 'CrisisRoom', title: 'Stay Clear Under Pressure', sub: 'Adapt when constraints change.' },
  { key: 'StoryBuilder', title: 'Speak Human', sub: 'Tell stories with emotional flow.' },
];

export default function PracticeScreen({ navigation }) {
  return (
    <CleanShell>
      <Text style={styles.title}>Practice tracks</Text>
      <Text style={styles.sub}>Choose one and run a focused learning loop.</Text>

      <View style={{ marginTop: 14, gap: 9 }}>
        {TRACKS.map((t) => (
          <Pressable key={t.key} onPress={() => navigation.navigate(t.key)}>
            <CleanCard style={styles.rowCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{t.title}</Text>
                <Text style={styles.cardSub}>{t.sub}</Text>
              </View>
              <ChevronRight size={16} color="#7E879A" />
            </CleanCard>
          </Pressable>
        ))}
      </View>
    </CleanShell>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.text, ...type.display },
  sub: { color: palette.subtext, marginTop: 6, ...type.body, maxWidth: 340 },
  rowCard: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { color: palette.text, fontSize: 16, fontWeight: '700' },
  cardSub: { color: palette.subtext, marginTop: 3, fontSize: 13 },
});
