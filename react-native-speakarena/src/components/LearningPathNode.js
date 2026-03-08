import React, { useRef } from 'react';
import { StyleSheet, View, Text, Pressable, Animated } from 'react-native';

const COLORS = {
  green: { face: '#58CC02', shadow: '#58A700', text: '#FFFFFF' },
  blue: { face: '#1CB0F6', shadow: '#1899D6', text: '#FFFFFF' },
  grey: { face: '#E5E5E5', shadow: '#CECECE', text: '#4B4B4B' },
};

export default function LearningPathNode({ active, locked, number, icon, onPress }) {
  const translateY = useRef(new Animated.Value(0)).current;
  const palette = locked ? COLORS.grey : active ? COLORS.green : COLORS.blue;

  const handlePressIn = () => {
    Animated.spring(translateY, {
      toValue: 6,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start();
  };

  const label = icon || (number ? String(number) : '•');
  const isIcon = Boolean(icon);

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.container}>
      {/* LAYER 1: Static shadow/lip */}
      <View style={[styles.shadowCircle, { backgroundColor: palette.shadow }]} />

      {/* LAYER 2: Moving face */}
      <Animated.View style={[styles.faceCircle, { backgroundColor: palette.face, transform: [{ translateY }] }]}>
        <View style={styles.glossHighlight} />
        <Text style={[styles.numberText, { color: palette.text }, isIcon && styles.iconText]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 76, // 70 circle + 6 shadow drop
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  shadowCircle: {
    position: 'absolute',
    bottom: 0,
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  faceCircle: {
    position: 'absolute',
    top: 0,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  glossHighlight: {
    position: 'absolute',
    top: 2,
    width: 44,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  numberText: {
    fontSize: 28,
    fontWeight: '900',
    marginTop: 4,
  },
  iconText: {
    fontSize: 30,
    marginTop: 2,
  },
});
