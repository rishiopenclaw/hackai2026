import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { G, Rect } from 'react-native-svg';

export default function HeroBackground() {
  return (
    <View style={styles.container} pointerEvents="none">
      <LinearGradient
        colors={['#D97D2A', '#8B4513', '#000000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.glowLayer}
      />

      <Svg style={styles.svgLayer} viewBox="0 0 390 500" preserveAspectRatio="xMidYMid slice">
        <G transform="rotate(-20 195 250)">
          <Rect
            x="-20"
            y="20"
            width="240"
            height="180"
            rx="40"
            fill="transparent"
            stroke="rgba(0,0,0,0.60)"
            strokeWidth="15"
          />
          <Rect
            x="170"
            y="-10"
            width="240"
            height="220"
            rx="40"
            fill="transparent"
            stroke="rgba(0,0,0,0.60)"
            strokeWidth="15"
          />
          <Rect
            x="-10"
            y="185"
            width="260"
            height="220"
            rx="40"
            fill="transparent"
            stroke="rgba(0,0,0,0.60)"
            strokeWidth="15"
          />
          <Rect
            x="205"
            y="180"
            width="230"
            height="260"
            rx="40"
            fill="transparent"
            stroke="rgba(0,0,0,0.60)"
            strokeWidth="15"
          />
        </G>
      </Svg>

      <LinearGradient
        colors={['transparent', 'transparent', 'rgba(0,0,0,0.8)', '#000000']}
        locations={[0, 0.45, 0.75, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.fadeMaskLayer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  glowLayer: {
    ...StyleSheet.absoluteFillObject,
    height: '60%',
    top: 0,
  },
  svgLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  fadeMaskLayer: {
    ...StyleSheet.absoluteFillObject,
  },
});
