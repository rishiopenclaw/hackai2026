import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import { palette, type } from '../../theme/design';

const TRACKS = [
  { key: 'DebateArena', title: 'Speak Persuasive', sub: 'Claim, reason, rebuttal.' },
  { key: 'HotSeatInterview', title: 'Think Fast', sub: 'Answer confidently on the spot.' },
  { key: 'CrisisRoom', title: 'Pressure Clarity', sub: 'Stay calm when constraints change.' },
  { key: 'StoryBuilder', title: 'Speak Human', sub: 'Tell stories people remember.' },
];

export default function PracticeScreen({ navigation }) {
  return (
    <CleanShell>
      <Text style={styles.title}>Practice tracks</Text>
      <Text style={styles.sub}>Pick one focused loop.</Text>

      <View style={{ marginTop: 14, gap: 10 }}>
        {TRACKS.map((t, i) => (
          <Pressable key={t.key} onPress={() => navigation.navigate(t.key)}>
            <CleanCard style={[styles.rowCard, i === 0 && styles.firstCard]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{t.title}</Text>
                <Text style={styles.cardSub}>{t.sub}</Text>
              </View>
              <ChevronRight size={16} color="#8E95B3" />
            </CleanCard>
          </Pressable>
        ))}
      </View>
    </CleanShell>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.text, ...type.display },
  sub: { color: palette.subtext, marginTop: 4, ...type.body },
  rowCard: { flexDirection: 'row', alignItems: 'center' },
  firstCard: { borderColor: 'rgba(141,123,255,0.24)' },
  cardTitle: { color: palette.text, fontSize: 16, fontWeight: '700' },
  cardSub: { color: palette.subtext, marginTop: 3, fontSize: 13 },
});
