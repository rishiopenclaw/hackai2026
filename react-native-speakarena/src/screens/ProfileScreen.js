import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import MobileFrame from '../components/MobileFrame';
import { colors } from '../theme/colors';
import { PrimaryPill } from '../components/CleanCTA';

export default function ProfileScreen({ navigation }) {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgBottom }}>
      <MobileFrame>
        <LinearGradient colors={[colors.bgTop, '#0B0D13', colors.bgBottom]} style={styles.container}>
          <Text style={styles.title}>{userName}</Text>
          <Text style={styles.sub}>XP timeline and performance analysis lives here.</Text>
          <View style={{ marginTop: 40 }}>
            <PrimaryPill title="Log Out" onPress={handleLogout} />
          </View>
        </LinearGradient>
      </MobileFrame>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { color: '#fff', fontSize: 30, fontWeight: '900' },
  sub: { color: '#A1A1AA', marginTop: 8 },
});
