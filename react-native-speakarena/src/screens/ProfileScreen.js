import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MobileFrame from '../components/MobileFrame';
import { colors } from '../theme/colors';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgBottom }}>
      <MobileFrame>
        <LinearGradient colors={[colors.bgTop, '#0B0D13', colors.bgBottom]} style={styles.container}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.sub}>XP timeline and performance analysis lives here.</Text>
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
