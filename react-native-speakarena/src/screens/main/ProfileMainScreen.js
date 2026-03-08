import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flame, Trophy, Activity, Target } from 'lucide-react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import { PrimaryPill } from '../../components/CleanCTA';
import { palette, type } from '../../theme/design';

export default function ProfileMainScreen({ navigation }) {
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) return;

        const response = await fetch('http://localhost:3000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setUserStats(data);
          await AsyncStorage.setItem('userData', JSON.stringify(data));
        }
      } catch (e) {
        console.error("Failed to load user stats", e);
      } finally {
        setLoading(false);
      }
    };
    
    // Using focus listener so stats refresh every time you tap the Profile tab
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserStats();
    });
    
    fetchUserStats();
    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  };

  if (loading && !userStats) {
    return (
      <CleanShell>
        <ActivityIndicator size="large" color={palette.primary} style={{ marginTop: 40 }} />
      </CleanShell>
    );
  }

  // Fallback if data hasn't loaded 
  if (!userStats) return null;

  return (
    <CleanShell>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>{userStats.displayName}</Text>
        <Text style={styles.sub}>Rank: {userStats.skillLevel.toUpperCase()}</Text>

        <View style={styles.grid}>
          <CleanCard style={{ flex: 1, backgroundColor: 'rgba(255, 150, 0, 0.08)', borderColor: 'rgba(255, 150, 0, 0.3)' }}>
            <View style={styles.iconRow}>
              <Flame color="#FF9500" size={24} />
              <Text style={styles.metric}>{userStats.streakDays}</Text>
            </View>
            <Text style={styles.metricLabel}>Day Streak</Text>
          </CleanCard>
          
          <CleanCard style={{ flex: 1, backgroundColor: 'rgba(255, 204, 0, 0.08)', borderColor: 'rgba(255, 204, 0, 0.3)' }}>
            <View style={styles.iconRow}>
              <Trophy color="#FFCC00" size={24} />
              <Text style={styles.metric}>{userStats.maxStreakDays}</Text>
            </View>
            <Text style={styles.metricLabel}>Max Streak</Text>
          </CleanCard>
        </View>

        <View style={styles.grid}>
          <CleanCard style={{ flex: 1, backgroundColor: 'rgba(76, 217, 100, 0.08)', borderColor: 'rgba(76, 217, 100, 0.3)' }}>
            <View style={styles.iconRow}>
              <Activity color="#4CD964" size={24} />
              <Text style={styles.metric}>{userStats.loginCount}</Text>
            </View>
            <Text style={styles.metricLabel}>Total Logins</Text>
          </CleanCard>
          
          <CleanCard style={{ flex: 1, backgroundColor: 'rgba(90, 200, 250, 0.08)', borderColor: 'rgba(90, 200, 250, 0.3)' }}>
            <View style={styles.iconRow}>
              <Target color="#5AC8FA" size={24} />
              <Text style={styles.metric}>{userStats.xp}</Text>
            </View>
            <Text style={styles.metricLabel}>Total XP</Text>
          </CleanCard>
        </View>

        <CleanCard style={{ marginTop: 14 }}>
          <Text style={styles.cardTitle}>Level {userStats.level}</Text>
          <Text style={styles.cardSub}>Keep practicing to reach the next milestone.</Text>
        </CleanCard>

        <View style={{ marginTop: 40 }}>
          <PrimaryPill title="Log Out" onPress={handleLogout} />
        </View>
      </ScrollView>
    </CleanShell>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.text, ...type.display },
  sub: { color: palette.primary, marginTop: 4, ...type.heading, fontSize: 16 },
  cardTitle: { color: palette.text, ...type.heading },
  cardSub: { color: palette.subtext, marginTop: 4, ...type.body },
  iconRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  grid: { flexDirection: 'row', gap: 10, marginTop: 10 },
  metric: { color: palette.text, fontWeight: '800', fontSize: 28 },
  metricLabel: { color: palette.subtext, marginTop: 6, ...type.label },
});
