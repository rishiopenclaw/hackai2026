import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Target, TrendingUp, Clock3 } from 'lucide-react-native';
import AppleCard from '../../components/AppleCard';

export default function ProfileMainScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>

        <AppleCard style={{ marginTop: 10 }}>
          <Text style={styles.cardTitle}>Rishi</Text>
          <Text style={styles.cardSub}>Skill-first speaking practice</Text>
        </AppleCard>

        <View style={styles.grid}>
          <AppleCard style={{ flex: 1 }}>
            <View style={styles.iconRow}><Target size={16} color="#8FA2FF" /><Text style={styles.metric}>89%</Text></View>
            <Text style={styles.metricLabel}>Clarity</Text>
          </AppleCard>
          <AppleCard style={{ flex: 1 }}>
            <View style={styles.iconRow}><TrendingUp size={16} color="#63D58A" /><Text style={styles.metric}>+16%</Text></View>
            <Text style={styles.metricLabel}>This week</Text>
          </AppleCard>
          <AppleCard style={{ flex: 1 }}>
            <View style={styles.iconRow}><Clock3 size={16} color="#FFB25B" /><Text style={styles.metric}>42m</Text></View>
            <Text style={styles.metricLabel}>Practice</Text>
          </AppleCard>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#09090C' },
  content: { flex: 1, paddingHorizontal: 18, paddingTop: 16 },
  title: { color: '#fff', fontSize: 32, fontWeight: '800', letterSpacing: -0.3 },
  cardTitle: { color: '#fff', fontWeight: '700', fontSize: 18 },
  cardSub: { color: '#A3AAB7', marginTop: 4 },
  grid: { flexDirection: 'row', gap: 8, marginTop: 10 },
  iconRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metric: { color: '#fff', fontWeight: '700', fontSize: 18 },
  metricLabel: { color: '#9AA3B6', marginTop: 4, fontSize: 12 },
});
