import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Timer, Mic2, AudioLines } from 'lucide-react-native';
import AppleCard from '../../components/AppleCard';
import AppleButton from '../../components/AppleButton';

export default function PracticeScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Practice</Text>

        <AppleCard style={{ marginTop: 10 }}>
          <View style={styles.row}><Mic2 size={18} color="#FFB25B" /><Text style={styles.cardTitle}>Arena Drill</Text></View>
          <Text style={styles.cardSub}>60s argument • 30s rebuttal • AI feedback</Text>
          <View style={styles.meta}><Timer size={13} color="#8C96AB" /><Text style={styles.metaText}>5 min session</Text></View>
          <AppleButton title="Start Drill" onPress={() => {}} style={{ marginTop: 10 }} />
        </AppleCard>

        <AppleCard style={{ marginTop: 10 }}>
          <View style={styles.row}><AudioLines size={18} color="#8FA2FF" /><Text style={styles.cardTitle}>Shadowing</Text></View>
          <Text style={styles.cardSub}>Mimic tone and pacing from reference clips</Text>
        </AppleCard>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#09090C' },
  content: { flex: 1, paddingHorizontal: 18, paddingTop: 16 },
  title: { color: '#fff', fontSize: 32, fontWeight: '800', letterSpacing: -0.3 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardTitle: { color: '#fff', fontWeight: '700', fontSize: 18 },
  cardSub: { color: '#A3AAB7', marginTop: 6 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 8 },
  metaText: { color: '#8C96AB', fontSize: 12, fontWeight: '600' },
});
