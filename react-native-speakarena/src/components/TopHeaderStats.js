import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';

function Stat({ emoji, value, color }) {
  return (
    <View style={styles.statPill}>
      <Text style={[styles.statEmoji, { color }]}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

export default function TopHeaderStats({ language = '🇺🇸', streak = 12, gems = 240, hearts = 5, onLanguagePress }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.row}>
        <Pressable onPress={onLanguagePress} style={styles.langCircle}>
          <Text style={styles.langText}>{language}</Text>
        </Pressable>

        <View style={styles.right}>
          <Stat emoji="🔥" value={streak} color="#FF9600" />
          <Stat emoji="💎" value={gems} color="#1CB0F6" />
          <Stat emoji="❤️" value={hearts} color="#FF4D6D" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: 'transparent' },
  row: {
    minHeight: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  langCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  langText: { fontSize: 20 },
  right: { flexDirection: 'row', gap: 8 },
  statPill: {
    minHeight: 36,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statEmoji: { fontSize: 14 },
  statValue: { color: '#4B4B4B', fontWeight: '900', fontSize: 13 },
});
