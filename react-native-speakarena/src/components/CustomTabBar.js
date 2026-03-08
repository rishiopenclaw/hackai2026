import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const ICONS = {
  Path: 'git-network-outline',
  Arena: 'flame-outline',
  Drills: 'mic-outline',
  Profile: 'person-outline',
};

export default function CustomTabBar({ state, navigation }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const content = (
            <>
              <Ionicons name={ICONS[route.name]} size={16} color={focused ? '#fff' : '#8F97AA'} />
              <Text style={[styles.label, focused && styles.labelActive]}>{route.name}</Text>
            </>
          );
          return (
            <Pressable key={route.key} onPress={() => navigation.navigate(route.name)} style={styles.item}>
              {focused ? (
                <LinearGradient colors={colors.sunset} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.activePill}>
                  {content}
                </LinearGradient>
              ) : (
                <View style={styles.pill}>{content}</View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 12, paddingBottom: 12, backgroundColor: 'transparent' },
  bar: {
    flexDirection: 'row',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 7,
    gap: 6,
  },
  item: { flex: 1 },
  pill: { height: 40, borderRadius: 18, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 },
  activePill: { height: 40, borderRadius: 18, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 },
  label: { color: '#8F97AA', fontWeight: '700', fontSize: 12 },
  labelActive: { color: '#fff' },
});
