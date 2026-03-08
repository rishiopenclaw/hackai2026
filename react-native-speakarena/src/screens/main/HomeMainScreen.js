import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path, Circle } from 'react-native-svg';
import TopHeaderStats from '../../components/TopHeaderStats';
import LearningPathNode from '../../components/LearningPathNode';

const ROADMAPS = [
  { id: 'persuasive', label: 'Persuasive', trackId: 'persuasive' },
  { id: 'fast', label: 'Think Fast', trackId: 'fast' },
  { id: 'pressure', label: 'Pressure', trackId: 'pressure' },
  { id: 'human', label: 'Story', trackId: 'human' },
];

const PROGRESS_BY_ROADMAP = {
  persuasive: 4,
  fast: 3,
  pressure: 2,
  human: 1,
};

const NODE_COUNT = 15;

function buildPoints(count) {
  const points = [];
  for (let i = 0; i < count; i += 1) {
    const y = 110 + i * 108;
    const x = 180 + Math.sin(i * 0.9) * 82;
    points.push({ x, y });
  }
  return points;
}

function pathFromPoints(points) {
  if (!points.length) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = (prev.x + curr.x) / 2;
    const cy = (prev.y + curr.y) / 2;
    d += ` Q ${prev.x} ${prev.y} ${cx} ${cy}`;
  }
  return d;
}

function MapArtwork({ height, pathD }) {
  return (
    <Svg style={StyleSheet.absoluteFill} viewBox={`0 0 360 ${height}`} preserveAspectRatio="none">
      <Defs>
        <LinearGradient id="grassBase" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#BDEA8D" />
          <Stop offset="100%" stopColor="#9FD86A" />
        </LinearGradient>
        <LinearGradient id="hillShade" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#A8DE77" />
          <Stop offset="100%" stopColor="#8FC857" />
        </LinearGradient>
        <LinearGradient id="trailFill" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FFF7DD" />
          <Stop offset="100%" stopColor="#F2E3B9" />
        </LinearGradient>
      </Defs>

      <Path d={`M0 0 H360 V${height} H0 Z`} fill="url(#grassBase)" />

      <Path d={`M-30 120 C80 40, 210 110, 390 80 V-20 H-30 Z`} fill="url(#hillShade)" opacity="0.6" />
      <Path d={`M-40 520 C70 450, 170 530, 390 490 V390 H-40 Z`} fill="#94CE5E" opacity="0.55" />
      <Path d={`M-30 ${height - 240} C70 ${height - 300}, 180 ${height - 210}, 390 ${height - 240} V${height} H-30 Z`} fill="#87C650" opacity="0.58" />

      <Circle cx="44" cy="160" r="8" fill="#7FC345" />
      <Circle cx="56" cy="168" r="6" fill="#8BCF52" />
      <Circle cx="300" cy="350" r="7" fill="#7FC345" />
      <Circle cx="310" cy="357" r="5" fill="#8BCF52" />
      <Circle cx="80" cy="720" r="9" fill="#7FC345" />
      <Circle cx="95" cy="728" r="6" fill="#8BCF52" />

      <Path d={pathD} stroke="#D9C894" strokeWidth="42" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" fill="none" />
      <Path d={pathD} stroke="url(#trailFill)" strokeWidth="38" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Path d={pathD} stroke="rgba(255,255,255,0.42)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export default function HomeMainScreen({ navigation }) {
  const [roadmap, setRoadmap] = useState('persuasive');
  const progress = PROGRESS_BY_ROADMAP[roadmap] ?? 1;

  const points = useMemo(() => buildPoints(NODE_COUNT), [roadmap]);
  const pathD = useMemo(() => pathFromPoints(points), [points]);
  const mapHeight = useMemo(() => points[points.length - 1].y + 130, [points]);

  const selectedTrack = ROADMAPS.find((r) => r.id === roadmap)?.trackId || 'persuasive';

  return (
    <View style={styles.root}>
      <TopHeaderStats />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>YOUR PATH</Text>

        <View style={styles.roadmapRow}>
          {ROADMAPS.map((r) => (
            <Pressable
              key={r.id}
              onPress={() => setRoadmap(r.id)}
              style={[styles.roadmapPill, roadmap === r.id && styles.roadmapPillActive]}
            >
              <Text style={[styles.roadmapText, roadmap === r.id && styles.roadmapTextActive]}>{r.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={[styles.terrainWrap, { height: mapHeight }]}>
          <MapArtwork height={mapHeight} pathD={pathD} />

          {points.map((p, i) => {
            const left = p.x - 34;
            const top = p.y - 34;
            const isActive = i === progress;
            const isLocked = i > progress;

            return (
              <View key={`n-${i}`} style={[styles.nodePos, { left, top }]}> 
                <LearningPathNode
                  active={isActive}
                  locked={isLocked}
                  icon={isLocked ? '🔒' : i === 0 ? '⚑' : undefined}
                  number={i === 0 || isLocked ? undefined : i + 1}
                  onPress={
                    isLocked
                      ? undefined
                      : () => navigation.navigate('Practice', { screen: 'SessionPreflight', params: { trackId: selectedTrack } })
                  }
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F9F6' },
  content: { paddingHorizontal: 20, paddingTop: 6, paddingBottom: 24 },
  heading: { color: '#4B4B4B', fontSize: 15, fontWeight: '900', letterSpacing: 1, marginBottom: 10 },

  roadmapRow: { flexDirection: 'row', gap: 8, marginBottom: 10, flexWrap: 'wrap' },
  roadmapPill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  roadmapPillActive: { backgroundColor: '#E9FAD9', borderColor: 'rgba(88,167,0,0.25)' },
  roadmapText: { color: '#7A7A7A', fontSize: 12, fontWeight: '800' },
  roadmapTextActive: { color: '#4B4B4B' },

  terrainWrap: {
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#BDEB92',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    position: 'relative',
  },
  nodePos: { position: 'absolute' },
});
