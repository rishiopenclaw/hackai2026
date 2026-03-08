import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Siren } from 'lucide-react-native';
import AppleCard from '../../components/AppleCard';
import AppleButton from '../../components/AppleButton';

export default function CrisisRoomScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Stay Clear Under Pressure</Text>

        <AppleCard style={{ marginTop: 10 }}>
          <Text style={styles.step}>Prompt</Text>
          <View style={styles.row}><Siren size={18} color="#FF6C6C" /><Text style={styles.prompt}>You are briefing users after an outage. Midway, legal asks you to avoid fault language.</Text></View>
        </AppleCard>

        <AppleCard style={{ marginTop: 10 }}>
          <Text style={styles.step}>Reflect</Text>
          <Text style={styles.note}>Tone stayed calm. Next: shorten your first sentence and state the action plan sooner.</Text>
        </AppleCard>

        <AppleButton title="Start Simulation" onPress={() => {}} style={{ marginTop: 12 }} />
        <AppleButton title="Retry with tighter opening" secondary onPress={() => {}} style={{ marginTop: 10 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#09090C' },
  content: { flex: 1, paddingHorizontal: 18, paddingTop: 16 },
  title: { color: '#fff', fontSize: 30, fontWeight: '800' },
  step: { color: '#9DA5B6', fontSize: 12, fontWeight: '700', marginBottom: 8 },
  row: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  prompt: { color: '#fff', fontWeight: '600', flex: 1, lineHeight: 22 },
  note: { color: '#A3AAB7', lineHeight: 20 },
});
