import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BookOpenText, Sparkles } from 'lucide-react-native';
import AppleCard from '../../components/AppleCard';
import AppleButton from '../../components/AppleButton';

export default function StoryBuilderScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Story Builder</Text>
        <AppleCard style={{ marginTop: 10 }}>
          <View style={styles.row}><BookOpenText size={18} color="#63D58A" /><Text style={styles.cardTitle}>Hook → Conflict → Payoff</Text></View>
          <Text style={styles.cardSub}>Build a 60s story in structured checkpoints with live nudges.</Text>
          <View style={styles.rowMini}><Sparkles size={14} color="#8C96AB" /><Text style={styles.metaText}>Narrative flow + emotional pacing</Text></View>
          <AppleButton title="Begin Story Drill" onPress={() => {}} style={{ marginTop: 12 }} />
        </AppleCard>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#09090C' },
  content: { flex: 1, paddingHorizontal: 18, paddingTop: 16 },
  title: { color: '#fff', fontSize: 30, fontWeight: '800' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rowMini: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  cardTitle: { color: '#fff', fontWeight: '700', fontSize: 18 },
  cardSub: { color: '#A3AAB7', marginTop: 6 },
  metaText: { color: '#8C96AB', fontSize: 12, fontWeight: '600' },
});
