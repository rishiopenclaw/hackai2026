import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AudioLines, Mic, Sparkles, PlayCircle } from 'lucide-react-native';
import HeroBackground from '../../components/HeroBackground';
import AppleCard from '../../components/AppleCard';
import AppleButton from '../../components/AppleButton';
import StatChip from '../../components/StatChip';

export default function HomeMainScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.hero}><HeroBackground /></View>

      <View style={styles.content}>
        <Text style={styles.title}>Today</Text>

        <View style={styles.statsRow}>
          <StatChip icon={<AudioLines size={14} color="#FF9B4A" />} label="Focus" value="Clarity" color="#FF9B4A" />
          <StatChip icon={<Mic size={14} color="#8FA2FF" />} label="Session" value="8 min" color="#8FA2FF" />
        </View>

        <AppleCard style={{ marginTop: 12 }}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.cardTitle}>Warmup Echo</Text>
              <Text style={styles.cardSub}>Prompt → Speak → Reflect → Retry</Text>
            </View>
            <Sparkles size={18} color="#FFB25B" />
          </View>
          <AppleButton title="Continue" onPress={() => {}} style={{ marginTop: 12 }} />
        </AppleCard>

        <AppleCard style={{ marginTop: 10 }}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.cardTitle}>Quick Practice</Text>
              <Text style={styles.cardSub}>One focused 3-minute speaking drill</Text>
            </View>
            <PlayCircle size={20} color="#A8B0C2" />
          </View>
        </AppleCard>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#09090C' },
  hero: { flex: 0.45 },
  content: { flex: 0.55, paddingHorizontal: 18, paddingTop: 10, paddingBottom: 10 },
  title: { color: '#fff', fontSize: 32, fontWeight: '800', marginBottom: 10, letterSpacing: -0.3 },
  statsRow: { flexDirection: 'row', gap: 8 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { color: '#fff', fontWeight: '700', fontSize: 18 },
  cardSub: { color: '#A3AAB7', marginTop: 4, fontSize: 13, lineHeight: 18 },
});
