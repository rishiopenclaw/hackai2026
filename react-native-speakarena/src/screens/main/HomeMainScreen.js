import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Play, Plus, House, Trophy, GraduationCap, UserCircle2, CircleHelp } from 'lucide-react-native';

const rooms = [
  { id: '1', status: 'Fighting', statusColor: '#EC4C7B', title: 'Room 18', subtitle: 'Duet: Guess the word' },
  { id: '2', status: 'Waiting', statusColor: '#F7A928', title: 'Room 29', subtitle: '3/6 players • Starts in 12s' },
  { id: '3', status: 'Fighting', statusColor: '#EC4C7B', title: 'Room 77', subtitle: 'Debate: AI in schools' },
];

export default function HomeMainScreen() {
  const [activeTab, setActiveTab] = useState('practice');
  const [activeBottom, setActiveBottom] = useState('home');

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
        </ScrollView>

        <View style={styles.bottomNav}>
          <BottomItem
            active={activeBottom === 'home'}
            onPress={() => setActiveBottom('home')}
            icon={<House size={22} color={activeBottom === 'home' ? '#27A14C' : '#B0B0B0'} strokeWidth={2.8} />}
          />
          <BottomItem
            active={activeBottom === 'club'}
            onPress={() => setActiveBottom('club')}
            icon={<Trophy size={22} color={activeBottom === 'club' ? '#27A14C' : '#B0B0B0'} strokeWidth={2.8} />}
          />
          <BottomItem
            active={activeBottom === 'learn'}
            onPress={() => setActiveBottom('learn')}
            icon={<GraduationCap size={22} color={activeBottom === 'learn' ? '#27A14C' : '#B0B0B0'} strokeWidth={2.8} />}
          />
          <BottomItem
            active={activeBottom === 'me'}
            onPress={() => setActiveBottom('me')}
            icon={<UserCircle2 size={22} color={activeBottom === 'me' ? '#27A14C' : '#B0B0B0'} strokeWidth={2.8} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function BottomItem({ icon, onPress }) {
  return (
    <TouchableOpacity style={styles.bottomItem} onPress={onPress} activeOpacity={0.8}>
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#27A14C' },
  screen: { flex: 1, backgroundColor: '#27A14C' },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 120,
  },

  segmentWrap: {
    backgroundColor: '#1C7A35',
    borderRadius: 20,
    padding: 4,
    flexDirection: 'row',
    marginBottom: 16,
  },
  segmentBtn: {
    flex: 1,
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 10,
  },
  segmentActive: {
    backgroundColor: '#27A14C',
    borderBottomWidth: 0,
    transform: [{ translateY: 2 }],
  },
  segmentInactive: {
    backgroundColor: '#37C25E',
    borderBottomWidth: 4,
    borderBottomColor: '#1C7A35',
  },
  segmentText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 16,
  },

  heroCard: {
    height: 180,
    backgroundColor: '#FFD13B',
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
  heroSub: { color: '#6F5B30', fontSize: 13, fontWeight: '700', marginTop: 4, lineHeight: 18 },
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

  exploreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  exploreTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '900',
  },
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
  createBtnText: {
    color: '#27A14C',
    fontWeight: '900',
    fontSize: 13,
  },

  listWrap: { paddingTop: 4 },
  roomOuter: {
    marginTop: 20,
    position: 'relative',
  },
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
  overlapTagText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 12,
  },
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
    backgroundColor: '#F7A928',
    borderBottomWidth: 4,
    borderBottomColor: '#D88700',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  watchOrangeText: { color: '#FFF', fontWeight: '900', fontSize: 14 },

  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 14,
    paddingBottom: 22,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },
  bottomItem: {
    width: 52,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
