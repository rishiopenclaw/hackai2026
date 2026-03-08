import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';
import MobileFrame from '../components/MobileFrame';
import { modules, user } from '../data/mock';
import { colors } from '../theme/colors';

function Node({ title, subtitle, locked }) {
  return (
    <GlassCard style={styles.nodeCard}>
      <View style={styles.nodeRow}>
        <LinearGradient
          colors={locked ? ['#3A3F4B', '#232735'] : colors.sunset}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.nodeDot}
        >
          <Text style={styles.nodeDotText}>{locked ? '•' : '✦'}</Text>
        </LinearGradient>
        <View>
          <Text style={styles.nodeTitle}>{title}</Text>
          <Text style={styles.nodeSub}>{subtitle}</Text>
        </View>
      </View>
    </GlassCard>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <MobileFrame>
        <View style={{ flex: 1 }}>
          <LinearGradient colors={[colors.bgTop, '#0A0B10', colors.bgBottom]} style={StyleSheet.absoluteFill} />

          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.headerRow}>
              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>Credits</Text>
                <Text style={styles.metricValue}>{user.xp}</Text>
              </View>
              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>Streak</Text>
                <Text style={styles.metricValue}>{user.streak} days</Text>
              </View>
            </View>

            <GlassCard style={styles.hero} contentStyle={{ padding: 18 }}>
              <Text style={styles.title}>Elevate Your Voice</Text>
              <Text style={styles.subtitle}>Train clarity, articulation, and debate confidence with immersive AI sessions.</Text>

              <View style={styles.waveStrip}>
                <LinearGradient colors={['rgba(255,255,255,0.16)', 'rgba(255,255,255,0.02)']} style={styles.waveInner}>
                  <Text style={styles.waveText}>Live speaking calibration • low latency</Text>
                </LinearGradient>
              </View>

              <GlowButton title="Transform voice" onPress={() => {}} style={{ marginTop: 14 }} />
            </GlassCard>

            <Text style={styles.pathHeading}>Speaking Path</Text>

            {modules.map((m, i) => (
              <View key={m.id} style={[styles.nodeAlign, i % 2 === 0 ? styles.left : styles.right]}>
                <Node title={m.title} subtitle={m.subtitle} locked={m.status === 'locked'} />
              </View>
            ))}
          </ScrollView>
        </View>
      </MobileFrame>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#06070A' },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24, gap: 14 },

  headerRow: { flexDirection: 'row', gap: 10 },
  metricBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  metricLabel: { color: '#A1A1AA', fontSize: 12, fontWeight: '500' },
  metricValue: { color: '#FF9A2D', fontSize: 18, fontWeight: '800', marginTop: 3 },

  hero: { marginTop: 2 },
  title: { color: '#fff', fontSize: 32, fontWeight: '900', lineHeight: 36 },
  subtitle: { color: '#A1A1AA', fontSize: 14, marginTop: 8, lineHeight: 20 },

  waveStrip: { marginTop: 14, borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  waveInner: { paddingHorizontal: 12, paddingVertical: 10, backgroundColor: 'rgba(255,255,255,0.02)' },
  waveText: { color: '#C2C9D6', fontSize: 12, fontWeight: '600' },

  pathHeading: { color: '#fff', fontSize: 26, fontWeight: '900', marginTop: 4 },
  nodeAlign: { width: '100%' },
  left: { alignItems: 'flex-start' },
  right: { alignItems: 'flex-end' },

  nodeCard: { width: '92%' },
  nodeRow: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  nodeDot: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  nodeDotText: { color: '#fff', fontWeight: '900' },
  nodeTitle: { color: '#fff', fontSize: 15, fontWeight: '800' },
  nodeSub: { color: '#A1A1AA', fontSize: 13, marginTop: 2 },
});
