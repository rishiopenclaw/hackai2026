import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import Svg, { Polygon, Circle, Text as SvgText, Line } from 'react-native-svg';
import { CheckCircle2, CircleDashed, Trophy, Medal, Star } from 'lucide-react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import { palette, type } from '../../theme/design';
import { apiJson } from '../../lib/api';

// Radar Chart Component
const RadarChart = ({ stats }) => {
  const size = 220;
  const center = size / 2;
  const radius = center - 30; // Padding for labels
  
  if (!stats) return null;
  const labels = ['Vocab', 'Pacing', 'Fluency', 'Clarity', 'Poise'];
  // Convert backend stats into percentages
  const data = [
    stats.vocabulary || 50,
    stats.pacing || 50,
    stats.fillerWords || 50, // "Fluency"
    stats.pronunciation || 50, // "Clarity"
    stats.confidence || 50 // "Poise"
  ];

  // Helper to convert percentage to coordinates
  const getPoint = (value, index) => {
    const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
    const distance = (value / 100) * radius;
    return {
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance
    };
  };

  // Build polygon path
  const points = data.map((val, i) => {
    const pt = getPoint(val, i);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  return (
    <View style={styles.chartContainer}>
      <Svg height={size} width={size}>
        {/* Web (Background grid) */}
        {[100, 75, 50, 25].map(level => {
          const webPoints = labels.map((_, i) => {
            const pt = getPoint(level, i);
            return `${pt.x},${pt.y}`;
          }).join(' ');
          return (
            <Polygon 
              key={`grid-${level}`}
              points={webPoints}
              stroke="rgba(0,0,0,0.06)"
              strokeWidth="1"
              fill="none"
            />
          );
        })}

        {/* Axis lines */}
        {labels.map((_, i) => {
          const edge = getPoint(100, i);
          return (
            <Line 
              key={`line-${i}`}
              x1={center} y1={center} 
              x2={edge.x} y2={edge.y} 
              stroke="rgba(0,0,0,0.06)" 
              strokeWidth="1"
            />
          );
        })}

        {/* Data Polygon */}
        <Polygon
          points={points}
          fill="rgba(44, 201, 107, 0.2)"
          stroke="#20C96B"
          strokeWidth="3"
        />

        {/* Labels */}
        {labels.map((label, i) => {
          const labelPt = getPoint(125, i); // Push labels out slightly
          return (
            <SvgText
              key={`label-${i}`}
              x={labelPt.x}
              y={labelPt.y}
              fontSize="12"
              fill={palette.subtext}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontWeight="bold"
            >
              {label}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
};

export default function ProgressMainScreen({ navigation }) {
  const [userStats, setUserStats] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [meData, leadData] = await Promise.all([
          apiJson('/api/auth/me'),
          apiJson('/api/auth/leaderboard'),
        ]);
        setUserStats(meData);
        setLeaderboard(Array.isArray(leadData) ? leadData : []);
      } catch (e) {
        console.error("Failed to load progress data", e);
      } finally {
        setLoading(false);
      }
    };
    
    const unsubscribe = navigation.addListener('focus', fetchData);
    fetchData();
    return unsubscribe;
  }, [navigation]);

  if (loading || !userStats) {
    return (
      <CleanShell>
        <ActivityIndicator size="large" color={palette.primary} style={{ marginTop: 40 }} />
      </CleanShell>
    );
  }

  // Quests Mock State (Would normally compare to thresholds like minutes > 15)
  const quests = [
    { id: 1, title: 'Read 1 Module', done: userStats.quests?.drillsCompleted >= 1 },
    { id: 2, title: 'Practice for 15+ Min', done: userStats.quests?.minutesPracticedToday >= 15 },
    { id: 3, title: 'Win a P2P Debate', done: userStats.quests?.debatesWon >= 1 },
  ];

  return (
    <CleanShell>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Progress</Text>
          <Text style={styles.sub}>Track your journey to mastery.</Text>
        </View>

        {/* 1. Daily Quests */}
        <Text style={styles.sectionTitle}>Daily Quests</Text>
        <View style={styles.questsContainer}>
          {quests.map(quest => (
            <CleanCard key={quest.id} style={styles.questCard}>
              <View style={styles.questContent}>
                {quest.done ? (
                  <CheckCircle2 color="#20C96B" size={26} strokeWidth={2.5} />
                ) : (
                  <CircleDashed color="#CBD5E1" size={26} strokeWidth={2.5} />
                )}
                <Text style={[styles.questText, quest.done && styles.questTextDone]}>
                  {quest.title}
                </Text>
              </View>
            </CleanCard>
          ))}
        </View>

        {/* 2. Radar Chart */}
        <Text style={styles.sectionTitle}>Speech Analytics</Text>
        <CleanCard style={styles.radarCard}>
          <Text style={styles.cardTitle}>Clarity Radar</Text>
          <Text style={styles.cardSub}>Your strengths and weaknesses based on recent AI evaluations.</Text>
          <RadarChart stats={userStats.stats} />
        </CleanCard>

        {/* 3. League Leaderboard */}
        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>
          {userStats.skillLevel.toUpperCase()} League
        </Text>
        <View style={styles.leaderboardContainer}>
          {leaderboard.map((user, index) => {
            const isMe = user._id === userStats._id;
            
            // Medals for top 3
            let rankIcon;
            if (index === 0) rankIcon = <Trophy color="#FFCC00" size={20} />;
            else if (index === 1) rankIcon = <Medal color="#C0C0C0" size={20} />;
            else if (index === 2) rankIcon = <Medal color="#CD7F32" size={20} />;
            else rankIcon = <Text style={styles.rankNum}>{index + 1}</Text>;

            return (
              <View key={user._id} style={[styles.leaderboardRow, isMe && styles.myRow]}>
                <View style={styles.rankBox}>{rankIcon}</View>
                <Text style={[styles.boardName, isMe && styles.myName]}>
                  {user.displayName} {isMe && '(You)'}
                </Text>
                <View style={styles.xpBadge}>
                  <Star color="#FDBA35" size={14} />
                  <Text style={styles.xpText}>{user.xp} XP</Text>
                </View>
              </View>
            );
          })}
        </View>

      </ScrollView>
    </CleanShell>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: 24 },
  title: { color: palette.text, ...type.display },
  sub: { color: palette.subtext, marginTop: 4, ...type.body },
  
  sectionTitle: {
    ...type.heading,
    fontSize: 20,
    color: palette.text,
    marginBottom: 12,
    marginTop: 20,
  },
  
  // Quests
  questsContainer: { gap: 8 },
  questCard: { padding: 16, backgroundColor: '#FFFFFF', borderColor: '#F1F5F9' },
  questContent: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  questText: { ...type.body, color: palette.text, fontWeight: '700', fontSize: 16 },
  questTextDone: { color: '#94A3B8', textDecorationLine: 'line-through' },
  
  // Radar 
  radarCard: { padding: 20 },
  cardTitle: { color: palette.text, ...type.heading },
  cardSub: { color: palette.subtext, marginTop: 4, ...type.body },
  chartContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 20,
    marginBottom: 10 
  },
  
  // Leaderboard
  leaderboardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(34, 34, 34, 0.05)',
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: '#8FA89A',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  myRow: {
    backgroundColor: '#FFF8E8',
    borderRadius: 12,
    marginHorizontal: 8,
    borderBottomWidth: 0,
  },
  rankBox: { width: 30, alignItems: 'center', justifyContent: 'center' },
  rankNum: { ...type.heading, fontSize: 16, color: '#94A3B8' },
  boardName: { flex: 1, marginLeft: 10, ...type.body, fontWeight: '700', color: palette.text },
  myName: { color: '#B9770E' },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF4D6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  xpText: { fontSize: 13, fontWeight: '800', color: '#B9770E' }
});
