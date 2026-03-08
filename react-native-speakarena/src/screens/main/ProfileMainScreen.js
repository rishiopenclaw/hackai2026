import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import { palette, type } from '../../theme/design';

import { PrimaryPill } from '../../components/CleanCTA';

export default function ProfileMainScreen({ navigation }) {
  const [userName, setUserName] = useState('Profile');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDataStr = await AsyncStorage.getItem('userData');
        if (userDataStr) {
          const userData = JSON.parse(userDataStr);
          if (userData.displayName) {
            setUserName(userData.displayName);
          }
        }
      } catch (e) {
        console.error("Failed to load user data", e);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  };

  return (
    <CleanShell>
      <Text style={styles.title}>{userName}</Text>
      <Text style={styles.sub}>Your communication growth.</Text>

      <CleanCard style={{ marginTop: 14 }}>
        <Text style={styles.cardTitle}>{userName}</Text>
        <Text style={styles.cardSub}>Focused speaking practice, daily.</Text>
      </CleanCard>

      <View style={styles.grid}>
        <CleanCard style={{ flex: 1 }}>
          <Text style={styles.metric}>89%</Text>
          <Text style={styles.metricLabel}>Clarity</Text>
        </CleanCard>
        <CleanCard style={{ flex: 1 }}>
          <Text style={styles.metric}>42m</Text>
          <Text style={styles.metricLabel}>Week</Text>
        </CleanCard>
      </View>

      <View style={{ marginTop: 40 }}>
        <PrimaryPill title="Log Out" onPress={handleLogout} />
      </View>
    </CleanShell>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.text, ...type.display },
  sub: { color: palette.subtext, marginTop: 4, ...type.body },
  cardTitle: { color: palette.text, ...type.heading },
  cardSub: { color: palette.subtext, marginTop: 4, ...type.body },
  grid: { flexDirection: 'row', gap: 10, marginTop: 10 },
  metric: { color: palette.text, fontWeight: '800', fontSize: 24 },
  metricLabel: { color: palette.subtext, marginTop: 2, ...type.label },
});
