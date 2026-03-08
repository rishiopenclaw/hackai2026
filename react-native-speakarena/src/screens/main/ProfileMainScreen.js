import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppleCard from '../../components/AppleCard';

export default function ProfileMainScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <AppleCard style={{ marginTop: 10 }}>
          <Text style={styles.cardTitle}>Level 8 • 1240 XP</Text>
          <Text style={styles.cardSub}>13-day streak • Contender</Text>
        </AppleCard>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#09090C' },
  content: { flex: 1, paddingHorizontal: 18, paddingTop: 16 },
  title: { color: '#fff', fontSize: 32, fontWeight: '700' },
  cardTitle: { color: '#fff', fontWeight: '600', fontSize: 18 },
  cardSub: { color: '#A3AAB7', marginTop: 4 },
});
