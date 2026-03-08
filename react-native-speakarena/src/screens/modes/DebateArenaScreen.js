import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Timer, Swords } from 'lucide-react-native';
import AppleCard from '../../components/AppleCard';
import AppleButton from '../../components/AppleButton';

export default function DebateArenaScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Debate Arena</Text>
        <AppleCard style={{ marginTop: 10 }}>
          <View style={styles.row}><Swords size={18} color="#FFB25B" /><Text style={styles.cardTitle}>Remote vs Office Work</Text></View>
          <Text style={styles.cardSub}>60s opening · 30s rebuttal · AI adjudication</Text>
          <View style={styles.meta}><Timer size={13} color="#8C96AB" /><Text style={styles.metaText}>4 min round</Text></View>
          <AppleButton title="Start Match" onPress={() => {}} style={{ marginTop: 12 }} />
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
  cardTitle: { color: '#fff', fontWeight: '700', fontSize: 18 },
  cardSub: { color: '#A3AAB7', marginTop: 6 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 8 },
  metaText: { color: '#8C96AB', fontSize: 12, fontWeight: '600' },
});
