import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import { palette, type } from '../../theme/design';
import { TRACK_LIST } from '../../data/tracks';

export default function PracticeScreen({ navigation }) {
  return (
    <CleanShell>
      <Text style={styles.title}>Practice tracks</Text>
      <Text style={styles.sub}>Choose one. Then run Prompt → Speak → Reflect → Retry.</Text>

      <View style={{ marginTop: 14, gap: 10 }}>
        {TRACK_LIST.map((t, i) => (
          <Pressable key={t.id} onPress={() => navigation.navigate('SessionPreflight', { trackId: t.id })}>
            <CleanCard style={[styles.rowCard, i === 0 && styles.firstCard]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{t.title}</Text>
                <Text style={styles.cardSub}>{t.subtitle}</Text>
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
