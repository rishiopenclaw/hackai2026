import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Gem, Flame, Flag } from 'lucide-react-native';
import LearningPathNode from '../../components/LearningPathNode';

function StatPill({ icon, value }) {
  return (
    <View style={styles.statPill}>
      {icon}
      <Text style={styles.statText}>{value}</Text>
    </View>
  );
}

export default function HomeMainScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.phoneCard}>
        <View style={styles.topHeader}>
          <View style={styles.topRow}>
            <View style={styles.languagePill}>
              <Text style={styles.languageText}>Speaking</Text>
              <Flag size={12} color="#4B4B4B" />
            </View>

            <View style={styles.topStats}>
              <StatPill icon={<Gem size={14} color="#FFB300" />} value="300" />
              <StatPill icon={<Flame size={14} color="#FFD73A" />} value="7" />
            </View>
          </View>

          <Text style={styles.part}>Part 1</Text>
          <Text style={styles.title}>Asking Questions</Text>

          <View style={styles.micBubble}>
            <Text style={styles.micEmoji}>🎤</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.pathArea} showsVerticalScrollIndicator={false}>
          <View style={[styles.curve, { top: 20, left: 84, transform: [{ rotate: '18deg' }] }]} />
          <View style={[styles.curve, { top: 170, left: 96, transform: [{ rotate: '-22deg' }] }]} />
          <View style={[styles.curve, { top: 320, left: 84, transform: [{ rotate: '20deg' }] }]} />

          <View style={[styles.nodeRow, { marginTop: 6, marginLeft: 108 }]}>
            <LearningPathNode active number={1} onPress={() => navigation.navigate('Practice', { screen: 'SessionPreflight', params: { trackId: 'persuasive' } })} />
          </View>

          <View style={[styles.nodeRow, { marginTop: 62, marginLeft: 66 }]}>
            <LearningPathNode number={2} onPress={() => navigation.navigate('Practice', { screen: 'SessionPreflight', params: { trackId: 'fast' } })} />
          </View>

          <View style={[styles.nodeRow, { marginTop: 62, marginLeft: 126 }]}>
            <LearningPathNode number={3} onPress={() => navigation.navigate('Practice', { screen: 'SessionPreflight', params: { trackId: 'pressure' } })} />
          </View>

          <View style={[styles.nodeRow, { marginTop: 62, marginLeft: 78 }]}>
            <LearningPathNode locked icon="🔒" />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#DEE4E3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  phoneCard: {
    width: '100%',
    maxWidth: 390,
    height: '94%',
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#D9F4B7',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  topHeader: {
    backgroundColor: '#0F9A4A',
    paddingTop: 14,
    paddingHorizontal: 14,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  languageText: { color: '#4B4B4B', fontWeight: '700', fontSize: 12 },
  topStats: { flexDirection: 'row', gap: 8 },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statText: { color: '#fff', fontWeight: '800', fontSize: 12 },
  part: { color: '#D6FFE8', marginTop: 14, fontSize: 14, fontWeight: '700' },
  title: { color: '#FFFFFF', marginTop: 2, fontSize: 30, fontWeight: '900' },
  micBubble: {
    position: 'absolute',
    right: 14,
    bottom: -20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF5E8E',
    borderBottomWidth: 6,
    borderBottomColor: '#DC3F6F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micEmoji: { fontSize: 26 },
  pathArea: {
    minHeight: 780,
    paddingTop: 30,
    paddingBottom: 40,
  },
  curve: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderWidth: 14,
    borderColor: '#F4E9C6',
    borderRadius: 90,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  nodeRow: {
    width: 75,
  },
});
