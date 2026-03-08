import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Flame, Trophy, Activity, Target } from 'lucide-react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import { PrimaryPill } from '../../components/CleanCTA';
import { palette, type } from '../../theme/design';
import { apiJson, bootstrapDemoSession, getDemoUserId } from '../../lib/api';

export default function ProfileMainScreen({ navigation }) {
  const [userStats, setUserStats] = useState(null);
  const [profile, setProfile] = useState(null);
  const [demoUserId, setDemoUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const cachedDataRaw = await AsyncStorage.getItem('userData');
        const cachedData = cachedDataRaw ? JSON.parse(cachedDataRaw) : null;
        const bootstrap = await bootstrapDemoSession({
          displayName: cachedData?.displayName || 'Guest User',
          email: cachedData?.email || 'guest@speakarena.app',
        });
        const userId = bootstrap?.user?._id || (await getDemoUserId());
        if (!userId) return;

        setDemoUserId(userId);

        const [meData, profileData] = await Promise.all([
          apiJson('/api/auth/me').catch(() => null),
          apiJson(`/api/profiles/${userId}`).catch(() => null),
        ]);

        const nextUserStats = meData || bootstrap.user || cachedData || null;
        if (nextUserStats) {
          setUserStats(nextUserStats);
          await AsyncStorage.setItem('userData', JSON.stringify(nextUserStats));
        }
        setProfile(profileData?.user || null);
      } catch (e) {
        console.error('Failed to load profile data', e);
      } finally {
        setLoading(false);
      }
    };
    
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProfileData();
    });
    
    fetchProfileData();
    return unsubscribe;
  }, [navigation]);

  const handleUploadResume = async () => {
    if (!demoUserId || uploading) return;
    try {
      setUploading(true);
      setUploadStatus('');
      const picked = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });
      if (picked.canceled) {
        setUploading(false);
        return;
      }

      const file = picked.assets?.[0];
      if (!file?.uri) throw new Error('Could not read selected file.');

      const resumePdfBase64 = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const parsed = await apiJson(`/api/profiles/${demoUserId}/parse-resume-pdf`, {
        method: 'POST',
        body: JSON.stringify({
          resumePdfBase64,
          fileName: file.name || 'resume.pdf',
        }),
      });

      setProfile(parsed?.user || null);
      setUploadStatus(`Resume parsed successfully (${parsed?.extractedTextLength || 0} chars).`);
    } catch (err) {
      console.error('Resume upload failed:', err);
      setUploadStatus(err?.message || 'Resume upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('demoUserId');
    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  };

  if (loading) {
    return (
      <CleanShell>
        <ActivityIndicator size="large" color={palette.primary} style={{ marginTop: 40 }} />
      </CleanShell>
    );
  }

  if (!userStats) return (
    <CleanShell>
      <Text style={styles.sub}>Unable to load profile yet.</Text>
    </CleanShell>
  );

  const listOrFallback = (value, fallback) =>
    Array.isArray(value) && value.length ? value.join(', ') : fallback;
  const role = profile?.headlineRole || 'Not set yet';
  const industry = profile?.industry || 'Add a resume to auto-fill';
  const experience = listOrFallback(profile?.experience, 'Upload a resume PDF to parse experience.');
  const skills = listOrFallback(profile?.skills, 'Resume skills will appear here.');
  const goals = listOrFallback(profile?.goals, 'Resume goals will appear here.');
  const weaknesses = listOrFallback(profile?.speakingWeaknesses, 'Coaching weak areas will appear after parsing.');

  return (
    <CleanShell>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>{userStats.displayName || 'Guest User'}</Text>
        <Text style={styles.sub}>Rank: {(userStats.skillLevel || 'rookie').toUpperCase()}</Text>

        <View style={styles.grid}>
          <CleanCard style={{ flex: 1, backgroundColor: 'rgba(255, 150, 0, 0.08)', borderColor: 'rgba(255, 150, 0, 0.3)' }}>
            <View style={styles.iconRow}>
              <Flame color="#FF9500" size={24} />
              <Text style={styles.metric}>{userStats.streakDays || 0}</Text>
            </View>
            <Text style={styles.metricLabel}>Day Streak</Text>
          </CleanCard>
          
          <CleanCard style={{ flex: 1, backgroundColor: 'rgba(255, 204, 0, 0.08)', borderColor: 'rgba(255, 204, 0, 0.3)' }}>
            <View style={styles.iconRow}>
              <Trophy color="#FFCC00" size={24} />
              <Text style={styles.metric}>{userStats.maxStreakDays || 0}</Text>
            </View>
            <Text style={styles.metricLabel}>Max Streak</Text>
          </CleanCard>
        </View>

        <View style={styles.grid}>
          <CleanCard style={{ flex: 1, backgroundColor: 'rgba(76, 217, 100, 0.08)', borderColor: 'rgba(76, 217, 100, 0.3)' }}>
            <View style={styles.iconRow}>
              <Activity color="#4CD964" size={24} />
              <Text style={styles.metric}>{userStats.loginCount || 0}</Text>
            </View>
            <Text style={styles.metricLabel}>Total Logins</Text>
          </CleanCard>
          
          <CleanCard style={{ flex: 1, backgroundColor: 'rgba(90, 200, 250, 0.08)', borderColor: 'rgba(90, 200, 250, 0.3)' }}>
            <View style={styles.iconRow}>
              <Target color="#5AC8FA" size={24} />
              <Text style={styles.metric}>{userStats.xp || 0}</Text>
            </View>
            <Text style={styles.metricLabel}>Total XP</Text>
          </CleanCard>
        </View>

        <CleanCard style={{ marginTop: 14 }}>
          <Text style={styles.cardTitle}>Level {userStats.level || 1}</Text>
          <Text style={styles.cardSub}>Keep practicing to reach the next milestone.</Text>
        </CleanCard>

        <CleanCard style={{ marginTop: 14 }}>
          <Text style={styles.cardTitle}>Profile</Text>
          <Text style={styles.fieldLabel}>Role</Text>
          <Text style={styles.fieldText}>{role}</Text>
          <Text style={styles.fieldLabel}>Industry</Text>
          <Text style={styles.fieldText}>{industry}</Text>
          <Text style={styles.fieldLabel}>Experience</Text>
          <Text style={styles.fieldText}>{experience}</Text>
          <Text style={styles.fieldLabel}>Skills</Text>
          <Text style={styles.fieldText}>{skills}</Text>
          <Text style={styles.fieldLabel}>Goals</Text>
          <Text style={styles.fieldText}>{goals}</Text>
          <Text style={styles.fieldLabel}>Speaking weaknesses</Text>
          <Text style={styles.fieldText}>{weaknesses}</Text>
          <Pressable style={[styles.uploadBtn, uploading && styles.uploadBtnDisabled]} onPress={handleUploadResume}>
            <Text style={styles.uploadBtnText}>{uploading ? 'Uploading resume...' : 'Upload Resume (PDF)'}</Text>
          </Pressable>
          {!!uploadStatus && <Text style={styles.uploadStatus}>{uploadStatus}</Text>}
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
  fieldLabel: { color: palette.subtext, marginTop: 10, ...type.label },
  fieldText: { color: palette.text, marginTop: 2, ...type.body, fontWeight: '700' },
  uploadBtn: {
    marginTop: 14,
    backgroundColor: palette.primary,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  uploadBtnDisabled: { opacity: 0.7 },
  uploadBtnText: { color: '#fff', fontWeight: '800' },
  uploadStatus: { color: palette.subtext, marginTop: 8, ...type.body },
});
