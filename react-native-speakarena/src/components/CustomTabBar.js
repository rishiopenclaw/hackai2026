import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const SUNSET = ['#FF4B2B', '#FF416C', '#FF9020'];

const ICONS = {
  Path: 'git-network-outline',
  Arena: 'sparkles-outline',
  Drills: 'mic-outline',
  Profile: 'person-outline',
};

export default function CustomTabBar({ state, navigation }) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <View style={styles.wrap}>
      <LinearGradient colors={['rgba(20,20,27,0.98)', 'rgba(8,8,12,0.98)']} style={styles.bar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          return (
            <Pressable key={route.key} onPress={() => navigation.navigate(route.name)} style={styles.item}>
              {focused ? (
                <LinearGradient colors={SUNSET} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.activePill}>
                  <Ionicons name={ICONS[route.name]} size={16} color="#fff" />
                  <Text style={styles.activeText}>{route.name}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.inactivePill}>
                  <Ionicons name={ICONS[route.name]} size={16} color="#8D95A8" />
                  <Text style={styles.inactiveText}>{route.name}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </LinearGradient>

      <Animated.View style={[styles.fabWrap, { transform: [{ scale: pulse }] }]}>
        <Pressable onPress={() => navigation.navigate('Arena')}>
          <LinearGradient colors={SUNSET} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.fab}>
            <Ionicons name="mic" size={24} color="#fff" />
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    paddingHorizontal: 12,
    paddingBottom: 14,
    backgroundColor: 'transparent',
  },
  bar: {
    flexDirection: 'row',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 8,
    paddingTop: 18,
    paddingBottom: 8,
    gap: 6,
  },
  item: { flex: 1 },
  activePill: {
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  inactivePill: {
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  activeText: { color: '#fff', fontWeight: '800', fontSize: 12 },
  inactiveText: { color: '#8D95A8', fontWeight: '700', fontSize: 12 },
  fabWrap: {
    position: 'absolute',
    alignSelf: 'center',
    top: -16,
    shadowColor: '#FF7B2A',
    shadowOpacity: 0.55,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 15,
  },
  fab: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.24)',
  },
});
