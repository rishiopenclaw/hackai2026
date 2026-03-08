import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient as SvgGradient, Stop, Rect, G } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

export default function HeroBackground() {
  return (
    <View style={styles.container} pointerEvents="none">
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFillObject}>
        <Defs>
          <SvgGradient id="ambientGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FF7A00" stopOpacity="0.8" />
            <Stop offset="40%" stopColor="#8A3800" stopOpacity="0.5" />
            <Stop offset="100%" stopColor="#09090B" stopOpacity="1" />
          </SvgGradient>
        </Defs>

        <Rect width="100%" height="100%" fill="url(#ambientGlow)" />

        <G rotation="-18" origin="200, 300">
          <Rect
            x="-100"
            y="-100"
            width="350"
            height="700"
            rx="54"
            fill="none"
            stroke="rgba(0,0,0,0.6)"
            strokeWidth="3"
          />
          <Rect
            x="150"
            y="100"
            width="400"
            height="800"
            rx="54"
            fill="none"
            stroke="rgba(0,0,0,0.6)"
            strokeWidth="3"
          />
          <Rect
            x="-200"
            y="450"
            width="550"
            height="600"
            rx="54"
            fill="none"
            stroke="rgba(0,0,0,0.6)"
            strokeWidth="3"
          />
        </G>
      </Svg>

      <LinearGradient
        colors={['transparent', 'rgba(9,9,11,0.5)', '#09090B', '#09090B']}
        locations={[0.4, 0.7, 0.9, 1]}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#09090B',
    overflow: 'hidden',
  },
});
