import React, { useMemo, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path, Circle } from 'react-native-svg';
import { Plus, Users, Search } from 'lucide-react-native';
import TopHeaderStats from '../../components/TopHeaderStats';
import LearningPathNode from '../../components/LearningPathNode';
import Bouncy3DButton from '../../components/Bouncy3DButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const NODE_SIZE = 70;
const Y_SPACING = 130;
const X_AMPLITUDE = 84;

const PATHS = [
  { id: 'everyday', label: 'Everyday', trackId: 'human' },
  { id: 'clarify', label: 'Clarify', trackId: 'pressure' },
  { id: 'persuade', label: 'Persuade', trackId: 'persuasive' },
];

const STARTER_ROOMS = [
  { id: 'room-1', name: 'Weekend Fluency', host: 'Ava', players: 3, maxPlayers: 6, code: 'FLUX' },
  { id: 'room-2', name: 'Pitch Night', host: 'Kai', players: 4, maxPlayers: 6, code: 'PITCH' },
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
  const [topMode, setTopMode] = useState('practice');
  const [selectedPathId, setSelectedPathId] = useState('everyday');
  const [joinCode, setJoinCode] = useState('');
  const [rooms, setRooms] = useState(STARTER_ROOMS);

  const mapScrollRef = useRef(null);
  const MAP_WIDTH = SCREEN_WIDTH - 40;
  const nodes = useMemo(() => generatePathData(11, MAP_WIDTH), [MAP_WIDTH]);
  const pathD = useMemo(() => generateSvgPath(nodes), [nodes]);
  const CONTENT_HEIGHT = useMemo(() => (nodes.length + 1) * Y_SPACING, [nodes]);

  const selectedPath = PATHS.find((p) => p.id === selectedPathId) || PATHS[0];

  const createRoom = () => {
    const code = Math.random().toString(36).slice(2, 6).toUpperCase();
    const room = { id: `room-${Date.now()}`, name: `Room ${code}`, host: 'You', players: 1, maxPlayers: 6, code };
    setRooms((prev) => [room, ...prev]);
  };

  const quickMatch = () => {
    const room = rooms.find((r) => r.players < r.maxPlayers);
    if (!room) {
      createRoom();
      return;
    }
    navigation.navigate('Practice', { screen: 'SessionLive', params: { mode: 'club', roomId: room.id } });
  };

  const joinRoom = () => {
    const code = joinCode.trim().toUpperCase();
    const room = rooms.find((r) => r.code.toUpperCase() === code);
    if (!room) return;
    navigation.navigate('Practice', { screen: 'SessionLive', params: { mode: 'club', roomId: room.id } });
  };

  return (
    <View style={styles.root}>
      <TopHeaderStats />

      <View style={styles.switcherShell}>
        <View style={styles.switcher}>
          <TopPill active={topMode === 'practice'} label="Practise" onPress={() => setTopMode('practice')} />
          <TopPill active={topMode === 'club'} label="Club" onPress={() => setTopMode('club')} />
        </View>
      </View>

      {topMode === 'practice' ? (
        <>
          <Text style={styles.heading}>PRACTICE PATHS</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pathRow}>
            {PATHS.map((path) => (
              <TouchableOpacity
                key={path.id}
                style={[styles.pathChip, selectedPathId === path.id && styles.pathChipActive]}
                onPress={() => setSelectedPathId(path.id)}
              >
                <Text style={[styles.pathChipText, selectedPathId === path.id && styles.pathChipTextActive]}>{path.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

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

          <View style={styles.bottomCta}>
            <Bouncy3DButton title={`Start ${selectedPath.label}`} variant="orange" onPress={() => navigation.navigate('Practice', { screen: 'SessionPreflight', params: { trackId: selectedPath.trackId } })} />
          </View>
        </>
      ) : (
        <ScrollView contentContainerStyle={styles.clubWrap}>
          <Text style={styles.heading}>CLUB</Text>
          <Text style={styles.clubSub}>Create rooms and play with anyone.</Text>

          <View style={styles.clubActions}>
            <TouchableOpacity style={[styles.clubBtn, styles.primaryBtn]} onPress={createRoom}>
              <Plus size={16} color="#fff" />
              <Text style={styles.primaryBtnText}>Create Room</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.clubBtn, styles.secondaryBtn]} onPress={quickMatch}>
              <Users size={16} color="#4A42E8" />
              <Text style={styles.secondaryBtnText}>Quick Match</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.joinRow}>
            <View style={styles.joinInputWrap}>
              <Search size={15} color="#7F88A4" />
              <TextInput
                style={styles.joinInput}
                placeholder="Enter room code"
                value={joinCode}
                onChangeText={setJoinCode}
                autoCapitalize="characters"
                placeholderTextColor="#96A0B8"
              />
            </View>
            <TouchableOpacity style={styles.joinBtn} onPress={joinRoom}>
              <Text style={styles.joinBtnText}>Join</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.roomsList}>
            {rooms.map((room) => (
              <TouchableOpacity
                key={room.id}
                style={styles.roomCard}
                onPress={() => navigation.navigate('Practice', { screen: 'SessionLive', params: { mode: 'club', roomId: room.id } })}
              >
                <View>
                  <Text style={styles.roomTitle}>{room.name}</Text>
                  <Text style={styles.roomMeta}>Host {room.host} · Code {room.code}</Text>
                </View>
                <Text style={styles.roomMeta}>{room.players}/{room.maxPlayers}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

function TopPill({ active, label, onPress }) {
  return (
    <TouchableOpacity style={[styles.topPill, active && styles.topPillActive]} onPress={onPress}>
      <Text style={[styles.topPillText, active && styles.topPillTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F9F6' },
  switcherShell: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 18,
    backgroundColor: '#1E8D53',
    padding: 3,
    shadowColor: '#11683A',
    shadowOpacity: 0.24,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  switcher: {
    flexDirection: 'row',
    gap: 4,
  },
  topPill: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#2FB56F',
    borderWidth: 1,
    borderColor: '#249E5F',
  },
  topPillActive: {
    backgroundColor: '#239F5E',
    borderColor: '#19864E',
    shadowColor: '#0F6E3E',
    shadowOpacity: 0.22,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  topPillText: { fontWeight: '800', color: '#DDF7E9', fontSize: 15 },
  topPillTextActive: { color: '#FFFFFF' },
  heading: {
    color: '#4B4B4B',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  pathRow: { paddingHorizontal: 20, gap: 8, paddingBottom: 10 },
  pathChip: { backgroundColor: '#E8EDF7', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 },
  pathChipActive: { backgroundColor: '#DCD9FF' },
  pathChipText: { fontWeight: '700', color: '#687193' },
  pathChipTextActive: { color: '#433DD3' },
  mapViewport: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    backgroundColor: '#89E256',
  },
  mapContent: { backgroundColor: '#89E256' },
  svgLayer: { position: 'absolute', top: 0, left: 0 },
  bottomCta: { paddingHorizontal: 20, paddingBottom: 14, paddingTop: 10, backgroundColor: '#F4F9F6' },

  clubWrap: { paddingHorizontal: 20, paddingBottom: 24, gap: 10 },
  clubSub: { color: '#7F88A4', fontWeight: '700', marginTop: -4, marginBottom: 6 },
  clubActions: { flexDirection: 'row', gap: 10 },
  clubBtn: { flex: 1, borderRadius: 12, height: 46, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  primaryBtn: { backgroundColor: '#5E54FF' },
  secondaryBtn: { backgroundColor: '#E8E5FF' },
  primaryBtnText: { color: '#fff', fontWeight: '800' },
  secondaryBtnText: { color: '#4A42E8', fontWeight: '800' },

  joinRow: { flexDirection: 'row', gap: 10, marginTop: 2 },
  joinInputWrap: { flex: 1, borderWidth: 1, borderColor: '#DDE3F1', borderRadius: 12, height: 44, flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 10, backgroundColor: '#fff' },
  joinInput: { flex: 1, color: '#253054', fontWeight: '700' },
  joinBtn: { width: 76, borderRadius: 12, backgroundColor: '#2FB257', alignItems: 'center', justifyContent: 'center' },
  joinBtnText: { color: '#fff', fontWeight: '800' },

  roomsList: { gap: 8, marginTop: 4 },
  roomCard: { borderWidth: 1, borderColor: '#E1E7F2', backgroundColor: '#fff', borderRadius: 14, padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  roomTitle: { fontWeight: '900', color: '#1F2747' },
  roomMeta: { color: '#657192', fontWeight: '700', fontSize: 12 },
});
