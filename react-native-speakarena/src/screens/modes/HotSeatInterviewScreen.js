import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { MessageCircleQuestion, RotateCcw } from 'lucide-react-native';
import AppleCard from '../../components/AppleCard';
import AppleButton from '../../components/AppleButton';

export default function HotSeatInterviewScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Think Fast</Text>

        <AppleCard style={{ marginTop: 10 }}>
          <Text style={styles.step}>Prompt</Text>
          <View style={styles.row}><MessageCircleQuestion size={18} color="#8FA2FF" /><Text style={styles.prompt}>Tell me about a time you handled conflict in a team.</Text></View>
        </AppleCard>

        <AppleCard style={{ marginTop: 10 }}>
          <Text style={styles.step}>Reflect</Text>
          <Text style={styles.note}>You gave good context. Next try: lead with outcome first, then story.</Text>
        </AppleCard>

        <AppleButton title="Start Speaking" onPress={() => {}} style={{ marginTop: 12 }} />
        <AppleButton title="Retry with one change" secondary onPress={() => {}} style={{ marginTop: 10 }} />
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
