import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';
import { modules, user } from '../data/mock';

const SUNSET = ['#FF4B2B', '#FF416C', '#FF9020'];

function AmbientBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={['#09090B', '#050507', '#000000']}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['rgba(255,145,32,0.35)', 'rgba(255,90,30,0.08)', 'rgba(0,0,0,0)']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={[styles.orb, { top: -80, left: -40, width: 280, height: 280, borderRadius: 140 }]}
      />
      <LinearGradient
        colors={['rgba(255,120,20,0.24)', 'rgba(0,0,0,0)']}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.orb, { bottom: 70, right: -40, width: 260, height: 260, borderRadius: 130 }]}
      />
    </View>
  );
}

function PathNode({ item, align = 'left' }) {
  const isLocked = item.status === 'locked';
  return (
    <View style={[styles.nodeRow, align === 'left' ? styles.left : styles.right]}>
      <GlassCard style={styles.nodeCard}>
        <View style={styles.nodeInner}>
          <LinearGradient
            colors={isLocked ? ['#3A3A43', '#23232B'] : SUNSET}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.nodeIconCircle}
          >
            <Text style={styles.nodeIcon}>{isLocked ? '•' : '✦'}</Text>
          </LinearGradient>
          <View>
            <Text style={styles.nodeTitle}>{item.title}</Text>
            <Text style={styles.nodeSubtitle}>{item.subtitle}</Text>
          </View>
        </View>
      </GlassCard>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <AmbientBackground />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={styles.metricWrap}>
            <Text style={styles.metricLabel}>Credits</Text>
            <Text style={styles.metricValue}>{user.xp}</Text>
          </View>
          <View style={styles.metricWrap}>
            <Text style={styles.metricLabel}>Streak</Text>
            <Text style={styles.metricValue}>{user.streak}🔥</Text>
          </View>
        </View>

        <GlassCard style={styles.heroCard}>
          <Text style={styles.heroTitle}>SpeakArena</Text>
          <Text style={styles.heroSub}>AI voice training for debates, articulation and confidence</Text>
          <GlowButton title="Transform voice" onPress={() => {}} style={{ marginTop: 14 }} />
        </GlassCard>

        <Text style={styles.sectionTitle}>Speaking Path</Text>

        {modules.map((m, idx) => (
          <PathNode key={m.id} item={m} align={idx % 2 === 0 ? 'left' : 'right'} />
        ))}

        <Pressable>
          <LinearGradient colors={SUNSET} style={styles.bottomCTA} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
            <Text style={styles.bottomCTAText}>Start Session</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#050507' },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 120, gap: 14 },
  orb: { position: 'absolute' },

  headerRow: { flexDirection: 'row', gap: 12 },
  metricWrap: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 12,
  },
  metricLabel: { color: '#A1A1AA', fontSize: 12, fontWeight: '500' },
  metricValue: { color: '#FF9A2D', fontSize: 19, fontWeight: '800', marginTop: 4 },

  heroCard: { marginTop: 2 },
  heroTitle: { color: '#FFFFFF', fontSize: 32, fontWeight: '900' },
  heroSub: { color: '#A1A1AA', marginTop: 6, fontSize: 14, lineHeight: 20 },

  sectionTitle: { color: '#FFFFFF', fontSize: 28, fontWeight: '900', marginTop: 6 },

  nodeRow: { width: '100%' },
  left: { alignItems: 'flex-start' },
  right: { alignItems: 'flex-end' },
  nodeCard: { width: '92%' },
  nodeInner: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  nodeIconCircle: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  nodeIcon: { color: '#FFF', fontWeight: '900' },
  nodeTitle: { color: '#FFF', fontWeight: '800', fontSize: 16 },
  nodeSubtitle: { color: '#A1A1AA', fontSize: 13, marginTop: 2 },

  bottomCTA: {
    marginTop: 10,
    borderRadius: 30,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF7F2A',
    shadowOpacity: 0.45,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  bottomCTAText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
