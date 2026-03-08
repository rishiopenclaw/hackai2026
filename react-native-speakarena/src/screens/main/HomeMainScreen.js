import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path, Circle } from 'react-native-svg';
import { Play, Plus, CircleHelp, Check, Gift } from 'lucide-react-native';
import LearningPathNode from '../../components/LearningPathNode';
import Bouncy3DButton from '../../components/Bouncy3DButton';

const rooms = [
  { id: '1', status: 'Fighting', statusColor: '#EC4C7B', title: 'Room 18', subtitle: 'Duet: Guess the word' },
  { id: '2', status: 'Waiting', statusColor: '#8C6BFF', title: 'Room 29', subtitle: '3/6 players • Starts in 12s' },
  { id: '3', status: 'Fighting', statusColor: '#EC4C7B', title: 'Room 77', subtitle: 'Debate: AI in schools' },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const NODE_SIZE = 70;
const Y_SPACING = 130;
const X_AMPLITUDE = 84;

const PATHS = [
  {
    id: 'everyday',
    label: 'Everyday',
    trackId: 'human',
    subtitle: 'Casual conversations + confidence',
  },
  {
    id: 'clarify',
    label: 'Clarify',
    trackId: 'pressure',
    subtitle: 'Questions + active listening',
  },
  {
    id: 'persuade',
    label: 'Persuade',
    trackId: 'persuasive',
    subtitle: 'Pitches + structured influence',
  },
];

const generatePathData = (numNodes = 10, viewportWidth = SCREEN_WIDTH) =>
  Array.from({ length: numNodes }).map((_, i) => {
    const xOffset = Math.sin(i * 1.02) * X_AMPLITUDE;
    return {
      id: i + 1,
      centerX: viewportWidth / 2 + xOffset,
      centerY: (i + 1) * Y_SPACING,
    };
  });

const generateSvgPath = (nodes) => {
  if (!nodes.length) return '';
  let d = `M ${nodes[0].centerX} ${nodes[0].centerY}`;
  for (let i = 1; i < nodes.length; i += 1) {
    const prev = nodes[i - 1];
    const curr = nodes[i];
    const cpY = prev.centerY + (curr.centerY - prev.centerY) / 2;
    d += ` C ${prev.centerX} ${cpY}, ${curr.centerX} ${cpY}, ${curr.centerX} ${curr.centerY}`;
  }
  return d;
};

export default function HomeMainScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('club');
  const [selectedPathId, setSelectedPathId] = useState(null);

  const mapScrollRef = useRef(null);
  const MAP_WIDTH = SCREEN_WIDTH - 32;
  const nodes = useMemo(() => generatePathData(11, MAP_WIDTH), [MAP_WIDTH]);
  const pathD = useMemo(() => generateSvgPath(nodes), [nodes]);
  const CONTENT_HEIGHT = useMemo(() => (nodes.length + 1) * Y_SPACING, [nodes]);
  const selectedPath = PATHS.find((p) => p.id === selectedPathId) || PATHS[0];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.segmentWrap}>
            <TouchableOpacity
              style={[styles.segmentBtn, activeTab === 'practice' ? styles.segmentActive : styles.segmentInactive]}
              onPress={() => setActiveTab('practice')}
              activeOpacity={0.9}
            >
              <Text style={styles.segmentText}>Practise</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.segmentBtn, activeTab === 'club' ? styles.segmentActive : styles.segmentInactive]}
              onPress={() => setActiveTab('club')}
              activeOpacity={0.9}
            >
              <Text style={styles.segmentText}>Club</Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'practice' ? (
            <>
              {!selectedPathId ? (
                <>
                  <View style={styles.streakCardWrap}>
                    <View style={styles.streakCardGlow} />
                    <View style={styles.streakCard}>
                      <View style={styles.giftCenterWrap}>
                        <View style={styles.giftBadgeLarge}>
                          <View style={styles.giftRibbonVertical} />
                          <View style={styles.giftRibbonHorizontal} />
                          <View style={styles.giftBowLeft} />
                          <View style={styles.giftBowRight} />
                          <Gift size={16} color="#FFFFFF" />
                        </View>
                      </View>

                      <View style={styles.streakTopRow}>
                        <Text style={styles.streakTitle}>Consecutive study days</Text>
                      </View>

                      <View style={styles.weekRow}>
                        {[
                          { day: 'Mon', done: true },
                          { day: 'Tue', done: true },
                          { day: 'Wed', done: true },
                          { day: 'Thu', done: true, active: true },
                          { day: 'Fri', done: false },
                          { day: 'Sat', done: false },
                          { day: 'Sun', done: false },
                        ].map((d) => (
                          <View key={d.day} style={styles.dayItem}>
                            <View style={[styles.dayDot, d.done ? styles.dayDotDone : styles.dayDotIdle, d.active && styles.dayDotActive]}>
                              {d.done ? <Check size={12} color="#FFFFFF" strokeWidth={3} /> : null}
                            </View>
                            <Text style={[styles.dayLabel, d.active && styles.dayLabelActive]}>{d.day}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>

                  <Text style={styles.practiceHeader}>PRACTICE PATHS</Text>
                  <Text style={styles.practiceSub}>Pick a path card to open the full node map.</Text>

                  <View style={styles.pathCardsStack}>
                    {PATHS.map((path) => (
                      <TouchableOpacity
                        key={path.id}
                        style={styles.pathCard}
                        onPress={() => setSelectedPathId(path.id)}
                        activeOpacity={0.92}
                      >
                        <Text style={styles.pathCardTitle}>{path.label}</Text>
                        <Text style={styles.pathCardSub}>{path.subtitle}</Text>
                        <View style={styles.pathCardCta}>
                          <Text style={styles.pathCardCtaText}>Open Path</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.practiceTopRow}>
                    <Text style={styles.practiceHeader}>{selectedPath.label.toUpperCase()} PATH</Text>
                    <TouchableOpacity onPress={() => setSelectedPathId(null)} style={styles.backToCardsBtn}>
                      <Text style={styles.backToCardsText}>All Paths</Text>
                    </TouchableOpacity>
                  </View>

                  <ScrollView
                    ref={mapScrollRef}
                    style={styles.mapViewport}
                    contentContainerStyle={[styles.mapContent, { height: CONTENT_HEIGHT }]}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() => mapScrollRef.current?.scrollToEnd({ animated: false })}
                  >
                    <Svg width={MAP_WIDTH} height={CONTENT_HEIGHT} style={styles.svgLayer}>
                      <Defs>
                        <LinearGradient id="grassBase" x1="0" y1="0" x2="0" y2="1">
                          <Stop offset="0%" stopColor="#9AE15D" />
                          <Stop offset="100%" stopColor="#84D64A" />
                        </LinearGradient>
                        <LinearGradient id="trail" x1="0" y1="0" x2="1" y2="1">
                          <Stop offset="0%" stopColor="#FFF7DD" />
                          <Stop offset="100%" stopColor="#F1E0B2" />
                        </LinearGradient>
                      </Defs>

                      <Path d={`M0 0 H${MAP_WIDTH} V${CONTENT_HEIGHT} H0 Z`} fill="url(#grassBase)" />
                      <Path d={pathD} stroke="#DDBF78" strokeWidth="44" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                      <Path d={pathD} stroke="url(#trail)" strokeWidth="32" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <Path d={pathD} stroke="rgba(255,255,255,0.45)" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />

                      {nodes.map((n) => (
                        <Circle key={`mask-${n.id}`} cx={n.centerX} cy={n.centerY} r={37} fill="#89E256" />
                      ))}
                    </Svg>

                    {nodes.map((node, idx) => {
                      const isFlagNode = idx === 0;
                      const numberFromBottom = nodes.length - idx;
                      const shownNumber = isFlagNode ? undefined : numberFromBottom;

                      return (
                        <View
                          key={node.id}
                          style={{
                            position: 'absolute',
                            left: node.centerX - NODE_SIZE / 2,
                            top: node.centerY - NODE_SIZE / 2,
                            width: NODE_SIZE,
                            height: NODE_SIZE,
                          }}
                        >
                          <LearningPathNode
                            number={shownNumber}
                            icon={isFlagNode ? '⚑' : undefined}
                            active={isFlagNode}
                            onPress={() =>
                              navigation.navigate('Practice', {
                                screen: 'SessionPreflight',
                                params: { trackId: selectedPath.trackId },
                              })
                            }
                          />
                        </View>
                      );
                    })}
                  </ScrollView>

                  <View style={styles.bottomCtaArea}>
                    <Bouncy3DButton
                      title={`Start ${selectedPath.label}`}
                      variant="orange"
                      onPress={() =>
                        navigation.navigate('Practice', {
                          screen: 'SessionPreflight',
                          params: { trackId: selectedPath.trackId },
                        })
                      }
                    />
                  </View>
                </>
              )}
            </>
          ) : (
            <>
              <View style={styles.heroCard}>
                <View style={styles.liveTag}>
                  <Text style={styles.liveTagText}>• LIVE</Text>
                </View>

                <Text style={styles.heroTitle}>Room 4450</Text>
                <Text style={styles.heroSub}>Competition{"\n"}Top users</Text>

                <TouchableOpacity style={styles.watchGreenBtn} activeOpacity={0.9}>
                  <Play size={14} color="#FFF" fill="#FFF" />
                  <Text style={styles.watchGreenText}>Watch</Text>
                </TouchableOpacity>

                <View style={styles.heroMascotPlaceholder} />
              </View>

              <View style={styles.exploreRow}>
                <Text style={styles.exploreTitle}>Explore</Text>
                <TouchableOpacity style={styles.createBtn} activeOpacity={0.9}>
                  <Plus size={14} color="#27A14C" />
                  <Text style={styles.createBtnText}>Create Room</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.listWrap}>
                {rooms.map((room) => (
                  <View key={room.id} style={styles.roomOuter}>
                    <View style={[styles.overlapTag, { backgroundColor: room.statusColor }]}>
                      <Text style={styles.overlapTagText}>{room.status}</Text>
                    </View>

                    <View style={styles.roomCard}>
                      <View style={styles.roomLeft}>
                        <Text style={styles.roomTitle}>{room.title}</Text>
                        <Text style={styles.roomSub}>{room.subtitle}</Text>
                      </View>

                      <View style={styles.roomRight}>
                        <CircleHelp size={24} color="#8C6BFF" />
                        <TouchableOpacity style={styles.watchOrangeBtn} activeOpacity={0.9}>
                          <Text style={styles.watchOrangeText}>Watch</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}
        </ScrollView>


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#27A14C' },
  screen: { flex: 1, backgroundColor: '#27A14C' },
  content: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 120 },

  segmentWrap: {
    backgroundColor: '#1C7A35',
    borderRadius: 20,
    padding: 4,
    flexDirection: 'row',
    marginBottom: 16,
  },
  segmentBtn: { flex: 1, borderRadius: 16, alignItems: 'center', paddingVertical: 10 },
  segmentActive: { backgroundColor: '#27A14C', borderBottomWidth: 0, transform: [{ translateY: 2 }] },
  segmentInactive: { backgroundColor: '#37C25E', borderBottomWidth: 4, borderBottomColor: '#1C7A35' },
  segmentText: { color: '#FFF', fontWeight: '900', fontSize: 16 },

  streakCardWrap: { marginBottom: 14, position: 'relative' },
  streakCardGlow: {
    position: 'absolute',
    left: 8,
    right: 8,
    top: 14,
    bottom: -6,
    borderRadius: 26,
    backgroundColor: '#DCE2F5',
    opacity: 0.7,
  },
  streakCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#7C86AA',
    shadowOpacity: 0.16,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    transform: [{ rotate: '-2deg' }],
  },
  streakTopRow: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' },
  streakTitle: { color: '#1F1F1F', fontWeight: '900', fontSize: 24, flexShrink: 1, paddingRight: 8 },
  giftCenterWrap: { alignItems: 'center', marginTop: 2, marginBottom: 8 },
  giftBadgeLarge: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: '#EC4C7B',
    borderBottomWidth: 6,
    borderBottomColor: '#C93A63',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  giftRibbonVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 12,
    backgroundColor: '#F7B43A',
  },
  giftRibbonHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 12,
    backgroundColor: '#F7B43A',
  },
  giftBowLeft: {
    position: 'absolute',
    top: -8,
    left: 18,
    width: 16,
    height: 14,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: '#F7B43A',
    transform: [{ rotate: '-20deg' }],
  },
  giftBowRight: {
    position: 'absolute',
    top: -8,
    right: 18,
    width: 16,
    height: 14,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: '#F7B43A',
    transform: [{ rotate: '20deg' }],
  },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  dayItem: { alignItems: 'center', gap: 6, width: 34 },
  dayLabel: { color: '#7F869E', fontWeight: '700', fontSize: 10 },
  dayLabelActive: { color: '#D28A00', fontWeight: '900' },
  dayDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayDotDone: { backgroundColor: '#F7B43A' },
  dayDotIdle: { backgroundColor: '#F2F3F7', borderWidth: 1, borderColor: '#E4E7EF' },
  dayDotActive: { borderWidth: 1.5, borderColor: '#E6A52B' },

  practiceHeader: { color: '#FFF', fontWeight: '900', fontSize: 16, marginBottom: 8, letterSpacing: 1 },
  practiceSub: { color: 'rgba(255,255,255,0.9)', fontWeight: '700', marginBottom: 12 },
  pathCardsStack: { gap: 12 },
  pathCard: {
    borderRadius: 24,
    padding: 18,
    minHeight: 132,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8F0E9',
    shadowColor: '#0E5D2E',
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  pathCardTitle: { color: '#182026', fontWeight: '900', fontSize: 20 },
  pathCardSub: { color: '#55616B', fontWeight: '700', marginTop: 4, fontSize: 12 },
  pathCardCta: {
    alignSelf: 'flex-start',
    marginTop: 14,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 9,
    backgroundColor: '#00D15E',
    borderBottomWidth: 4,
    borderBottomColor: '#009E47',
  },
  pathCardCtaText: { color: '#FFF', fontWeight: '900', fontSize: 14 },
  practiceTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  backToCardsBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderBottomWidth: 3,
    borderBottomColor: '#DFDFDF',
  },
  backToCardsText: { color: '#1C7A35', fontWeight: '900' },
  mapViewport: {
    flex: 1,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    backgroundColor: '#89E256',
    minHeight: 500,
  },
  mapContent: { backgroundColor: '#89E256' },
  svgLayer: { position: 'absolute', top: 0, left: 0 },
  bottomCtaArea: { paddingTop: 10 },

  heroCard: {
    height: 180,
    backgroundColor: '#EEF0FF',
    borderRadius: 24,
    padding: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  liveTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#EC4C7B',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  liveTagText: { color: '#FFF', fontWeight: '900', fontSize: 11 },
  heroTitle: { color: '#1D1D1D', fontSize: 28, fontWeight: '900' },
  heroSub: { color: '#5C617A', fontSize: 13, fontWeight: '700', marginTop: 4, lineHeight: 18 },
  watchGreenBtn: {
    marginTop: 12,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#00D15E',
    borderBottomWidth: 4,
    borderBottomColor: '#009E47',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  watchGreenText: { color: '#FFF', fontWeight: '900', fontSize: 14 },
  heroMascotPlaceholder: {
    position: 'absolute',
    right: 10,
    bottom: -2,
    width: 95,
    height: 110,
    borderRadius: 16,
    backgroundColor: 'rgba(128, 78, 255, 0.15)',
  },

  exploreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  exploreTitle: { color: '#FFF', fontSize: 22, fontWeight: '900' },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF',
    borderBottomWidth: 4,
    borderBottomColor: '#E5E5E5',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  createBtnText: { color: '#27A14C', fontWeight: '900', fontSize: 13 },

  listWrap: { paddingTop: 4 },
  roomOuter: { marginTop: 20, position: 'relative' },
  overlapTag: {
    position: 'absolute',
    top: -16,
    left: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    zIndex: 20,
    elevation: 10,
  },
  overlapTagText: { color: '#FFF', fontWeight: '900', fontSize: 12 },
  roomCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 7,
    zIndex: 1,
  },
  roomLeft: { flex: 1, paddingRight: 10 },
  roomTitle: { color: '#1E1E1E', fontSize: 24, fontWeight: '900' },
  roomSub: { color: '#949494', fontSize: 12, fontWeight: '700', marginTop: 2 },
  roomRight: { alignItems: 'flex-end', gap: 8 },
  watchOrangeBtn: {
    backgroundColor: '#8C6BFF',
    borderBottomWidth: 4,
    borderBottomColor: '#6E52DE',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  watchOrangeText: { color: '#FFF', fontWeight: '900', fontSize: 14 },


});
