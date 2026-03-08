import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AudioLines } from 'lucide-react-native';
import AppleCard from '../../components/AppleCard';
import AppleButton from '../../components/AppleButton';

export default function DebateArenaScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Speak Persuasive</Text>

        <AppleCard style={{ marginTop: 10 }}>
          <Text style={styles.step}>Prompt</Text>
          <View style={styles.row}><AudioLines size={18} color="#FFB25B" /><Text style={styles.prompt}>Remote work improves output more than office work.</Text></View>
        </AppleCard>

        <AppleCard style={{ marginTop: 10 }}>
          <Text style={styles.step}>Reflect</Text>
          <Text style={styles.note}>Strong claim. Next: add one concrete example in the first 20 seconds.</Text>
        </AppleCard>

        <AppleButton title="Start Argument" onPress={() => {}} style={{ marginTop: 12 }} />
        <AppleButton title="Retry with stronger evidence" secondary onPress={() => {}} style={{ marginTop: 10 }} />
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
