import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const SUNSET = ['#FF4B2B', '#FF416C', '#FF9020'];

const ICONS = {
  Path: 'git-network-outline',
  Arena: 'people-outline',
  Drills: 'mic-outline',
  Profile: 'person-outline',
};

export default function CustomTabBar({ state, descriptors, navigation }) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.12, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const goToArena = () => {
    const arenaIndex = state.routes.findIndex((r) => r.name === 'Arena');
    if (arenaIndex >= 0) {
      navigation.navigate(state.routes[arenaIndex].name);
    }
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.barShell}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable key={route.key} onPress={onPress} style={styles.tabBtn}>
              {isFocused ? (
                <LinearGradient colors={SUNSET} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.activeChip}>
                  <Ionicons name={ICONS[route.name]} size={18} color="#FFFFFF" />
                  <Text style={styles.activeText}>{route.name}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.inactiveChip}>
                  <Ionicons name={ICONS[route.name]} size={18} color="#9CA3AF" />
                  <Text style={styles.inactiveText}>{route.name}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      <Animated.View style={[styles.fabWrap, { transform: [{ scale: pulse }] }]}>
        <Pressable onPress={goToArena} style={{ borderRadius: 34 }}>
          <LinearGradient colors={SUNSET} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.fab}>
            <Ionicons name="mic" size={24} color="#FFFFFF" />
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
    paddingBottom: 18,
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  barShell: {
    flexDirection: 'row',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: 8,
    gap: 6,
  },
  tabBtn: { flex: 1 },
  activeChip: {
    borderRadius: 20,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  inactiveChip: {
    borderRadius: 20,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  activeText: { color: '#FFFFFF', fontWeight: '800', fontSize: 12 },
  inactiveText: { color: '#A1A1AA', fontWeight: '700', fontSize: 12 },
  fabWrap: {
    position: 'absolute',
    alignSelf: 'center',
    top: -22,
    shadowColor: '#FF6A2C',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 16,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.22)',
  },
});
