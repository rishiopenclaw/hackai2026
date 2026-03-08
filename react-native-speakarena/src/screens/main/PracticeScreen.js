import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Plus, Search, Users, Lock, CircleCheck, Play, Trophy } from 'lucide-react-native';

const PRACTICE_PATHS = [
  {
    id: 'everyday',
    title: 'Everyday',
    focus: 'Casual conversations + confidence',
    nodes: [
      { id: 'everyday-1', title: 'Quick Replies', trackId: 'fast' },
      { id: 'everyday-2', title: 'Small Talk Builder', trackId: 'human' },
      { id: 'everyday-3', title: 'Follow-up Chain', trackId: 'persuasive' },
    ],
  },
  {
    id: 'clarify',
    title: 'Clarify',
    focus: 'Question quality + active listening',
    nodes: [
      { id: 'clarify-1', title: 'Ask Better Questions', trackId: 'fast' },
      { id: 'clarify-2', title: 'Intent Decoder', trackId: 'pressure' },
      { id: 'clarify-3', title: 'Interview Mode', trackId: 'human' },
    ],
  },
  {
    id: 'persuade',
    title: 'Persuade',
    focus: 'Structure + convincing delivery',
    nodes: [
      { id: 'persuade-1', title: '30-sec Pitch', trackId: 'persuasive' },
      { id: 'persuade-2', title: 'Objection Handling', trackId: 'pressure' },
      { id: 'persuade-3', title: 'Story to Point', trackId: 'human' },
    ],
  },
];

const STARTER_ROOMS = [
  { id: 'room-1', name: 'Weekend Fluency', host: 'Ava', players: 3, maxPlayers: 6, mode: 'Quick Match', privacy: 'public' },
  { id: 'room-2', name: 'Pitch Night', host: 'Kai', players: 4, maxPlayers: 6, mode: 'Pitch Battle', privacy: 'public' },
];

export default function PracticeScreen({ navigation }) {
  const [activeTopTab, setActiveTopTab] = useState('practice');
  const [selectedPathId, setSelectedPathId] = useState('everyday');
  const [completedNodes, setCompletedNodes] = useState({ 'everyday-1': true });
  const [rooms, setRooms] = useState(STARTER_ROOMS);
  const [joinCode, setJoinCode] = useState('');

  const selectedPath = useMemo(
    () => PRACTICE_PATHS.find((p) => p.id === selectedPathId) ?? PRACTICE_PATHS[0],
    [selectedPathId],
  );

  const isNodeUnlocked = (index) => index === 0 || !!completedNodes[selectedPath.nodes[index - 1].id];

  const playNode = (node, unlocked) => {
    if (!unlocked) return;
    setCompletedNodes((prev) => ({ ...prev, [node.id]: true }));
    navigation.navigate('SessionPreflight', { trackId: node.trackId });
  };

  const createRoom = () => {
    const roomId = `room-${Date.now()}`;
    const code = Math.random().toString(36).slice(2, 6).toUpperCase();
    const newRoom = {
      id: roomId,
      name: `Room ${code}`,
      host: 'You',
      players: 1,
      maxPlayers: 6,
      mode: 'Quick Match',
      privacy: 'public',
      code,
    };
    setRooms((prev) => [newRoom, ...prev]);
  };

  const quickMatch = () => {
    const firstOpen = rooms.find((room) => room.players < room.maxPlayers);
    if (!firstOpen) return createRoom();
    navigation.navigate('SessionLive', { roomId: firstOpen.id, mode: 'club' });
  };

  const joinRoom = () => {
    const room = rooms.find((r) => (r.code || '').toUpperCase() === joinCode.trim().toUpperCase());
    if (!room) return;
    navigation.navigate('SessionLive', { roomId: room.id, mode: 'club' });
  };

  return (
    <View style={styles.root}>
      <View style={styles.topSwitcher}>
        <TopPill active={activeTopTab === 'practice'} label="Practice" onPress={() => setActiveTopTab('practice')} />
        <TopPill active={activeTopTab === 'club'} label="Club" onPress={() => setActiveTopTab('club')} />
      </View>

      {activeTopTab === 'practice' ? (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Practice Paths</Text>
          <Text style={styles.sub}>Train specific speaking use cases with separate progression.</Text>

          <View style={styles.pathTabs}>
            {PRACTICE_PATHS.map((path) => (
              <TouchableOpacity
                key={path.id}
                style={[styles.pathTab, selectedPathId === path.id && styles.pathTabActive]}
                onPress={() => setSelectedPathId(path.id)}
              >
                <Text style={[styles.pathTabText, selectedPathId === path.id && styles.pathTabTextActive]}>{path.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.pathCard}>
            <Text style={styles.pathTitle}>{selectedPath.title}</Text>
            <Text style={styles.pathFocus}>{selectedPath.focus}</Text>

            <View style={styles.nodesWrap}>
              {selectedPath.nodes.map((node, index) => {
                const unlocked = isNodeUnlocked(index);
                const done = !!completedNodes[node.id];

                return (
                  <TouchableOpacity
                    key={node.id}
                    style={[styles.nodeCard, !unlocked && styles.nodeCardLocked]}
                    activeOpacity={unlocked ? 0.9 : 1}
                    onPress={() => playNode(node, unlocked)}
                  >
                    <View style={styles.nodeLeft}>
                      {done ? (
                        <CircleCheck size={20} color="#29B44A" />
                      ) : unlocked ? (
                        <Play size={20} color="#5E54FF" />
                      ) : (
                        <Lock size={20} color="#9AA2B0" />
                      )}
                      <View>
                        <Text style={[styles.nodeTitle, !unlocked && styles.muted]}>{node.title}</Text>
                        <Text style={styles.nodeMeta}>{done ? 'Completed' : unlocked ? 'Tap to play' : 'Complete previous node'}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Club</Text>
          <Text style={styles.sub}>Create rooms and play with anyone live.</Text>

          <View style={styles.clubActions}>
            <TouchableOpacity style={[styles.cta, styles.primary]} onPress={createRoom}>
              <Plus size={18} color="#fff" />
              <Text style={styles.ctaText}>Create Room</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cta, styles.secondary]} onPress={quickMatch}>
              <Users size={18} color="#4A42E8" />
              <Text style={styles.ctaTextSecondary}>Quick Match</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.joinWrap}>
            <View style={styles.joinInputWrap}>
              <Search size={16} color="#7F88A4" />
              <TextInput
                placeholder="Enter room code"
                placeholderTextColor="#95A0BC"
                value={joinCode}
                onChangeText={setJoinCode}
                autoCapitalize="characters"
                style={styles.joinInput}
              />
            </View>
            <TouchableOpacity style={styles.joinBtn} onPress={joinRoom}>
              <Text style={styles.joinBtnText}>Join</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.roomsWrap}>
            {rooms.map((room) => (
              <TouchableOpacity key={room.id} style={styles.roomCard} onPress={() => navigation.navigate('SessionLive', { roomId: room.id, mode: 'club' })}>
                <View>
                  <Text style={styles.roomTitle}>{room.name}</Text>
                  <Text style={styles.roomMeta}>{room.mode} · Host {room.host}</Text>
                </View>
                <View style={styles.roomRight}>
                  <Users size={14} color="#5F6788" />
                  <Text style={styles.roomMeta}>{room.players}/{room.maxPlayers}</Text>
                  <Trophy size={14} color="#5F6788" />
                </View>
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
  topSwitcher: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 14,
    padding: 4,
    backgroundColor: '#E8EDF7',
    borderRadius: 16,
  },
  topPill: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  topPillActive: { backgroundColor: '#5E54FF' },
  topPillText: { fontSize: 14, fontWeight: '800', color: '#6D7594' },
  topPillTextActive: { color: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24, gap: 14 },
  title: { color: '#202544', fontSize: 30, fontWeight: '900' },
  sub: { color: '#7F88A4', fontSize: 14, fontWeight: '600', marginTop: -6 },

  pathTabs: { flexDirection: 'row', gap: 8, marginTop: 6 },
  pathTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#E8EDF7',
  },
  pathTabActive: { backgroundColor: '#DCD9FF' },
  pathTabText: { color: '#5E6788', fontWeight: '700' },
  pathTabTextActive: { color: '#3B36C6' },

  pathCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E6EAF4',
    gap: 10,
  },
  pathTitle: { fontSize: 20, fontWeight: '900', color: '#202544' },
  pathFocus: { color: '#636E90', fontSize: 13, fontWeight: '600' },
  nodesWrap: { gap: 10, marginTop: 2 },
  nodeCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E3E8F3',
    backgroundColor: '#F8FAFF',
    padding: 12,
  },
  nodeCardLocked: { backgroundColor: '#F2F4F8' },
  nodeLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  nodeTitle: { fontSize: 15, fontWeight: '800', color: '#273053' },
  nodeMeta: { fontSize: 12, color: '#7A84A3', fontWeight: '600', marginTop: 2 },
  muted: { color: '#8B94AD' },

  clubActions: { flexDirection: 'row', gap: 10, marginTop: 2 },
  cta: {
    flex: 1,
    borderRadius: 14,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  primary: { backgroundColor: '#5E54FF' },
  secondary: { backgroundColor: '#E8E5FF' },
  ctaText: { color: '#FFF', fontWeight: '800', fontSize: 14 },
  ctaTextSecondary: { color: '#4A42E8', fontWeight: '800', fontSize: 14 },

  joinWrap: { flexDirection: 'row', gap: 10, marginTop: 6 },
  joinInputWrap: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDE3F1',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 8,
  },
  joinInput: { flex: 1, fontWeight: '700', color: '#263054' },
  joinBtn: {
    width: 80,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#2FB257',
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinBtnText: { color: '#FFF', fontWeight: '800', fontSize: 14 },

  roomsWrap: { gap: 10, marginTop: 4 },
  roomCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E3E8F3',
    backgroundColor: '#FFF',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roomTitle: { color: '#1F2747', fontWeight: '900', fontSize: 15 },
  roomMeta: { color: '#677191', fontWeight: '600', fontSize: 12, marginTop: 2 },
  roomRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
