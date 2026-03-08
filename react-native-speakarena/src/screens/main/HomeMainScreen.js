import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HeroBackground from '../../components/HeroBackground';
import AppleCard from '../../components/AppleCard';

export default function HomeMainScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.hero}><HeroBackground /></View>
      <View style={styles.content}>
        <Text style={styles.title}>Today</Text>
        <AppleCard>
          <Text style={styles.cardTitle}>Voice Calibration</Text>
          <Text style={styles.cardSub}>8 minute warm-up • clarity + pacing</Text>
        </AppleCard>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#09090C' },
  hero: { flex: 0.55 },
  content: { flex: 0.45, paddingHorizontal: 18, paddingTop: 12 },
  title: { color: '#fff', fontSize: 32, fontWeight: '700', marginBottom: 10 },
  cardTitle: { color: '#fff', fontWeight: '600', fontSize: 18 },
  cardSub: { color: '#A3AAB7', marginTop: 4 },
});
