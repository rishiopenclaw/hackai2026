import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Siren, TriangleAlert } from 'lucide-react-native';
import AppleCard from '../../components/AppleCard';
import AppleButton from '../../components/AppleButton';

export default function CrisisRoomScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Crisis Room</Text>
        <AppleCard style={{ marginTop: 10 }}>
          <View style={styles.row}><Siren size={18} color="#FF6C6C" /><Text style={styles.cardTitle}>PR Incident Briefing</Text></View>
          <Text style={styles.cardSub}>New constraints drop every 20s. Stay calm and communicate clearly.</Text>
          <View style={styles.rowMini}><TriangleAlert size={14} color="#8C96AB" /><Text style={styles.metaText}>Stress resilience + executive clarity</Text></View>
          <AppleButton title="Start Crisis Sim" onPress={() => {}} style={{ marginTop: 12 }} />
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
