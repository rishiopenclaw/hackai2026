import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, G, Rect } from 'react-native-svg';

export default function HeroBackground() {
  return (
    <View style={styles.container} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 500 1000" style={StyleSheet.absoluteFillObject}>
        <Defs>
          <SvgLinearGradient
            id="glow"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor="#D97D2A" />
            <Stop offset="40%" stopColor="#8B4513" />
            <Stop offset="100%" stopColor="#000000" />
          </SvgLinearGradient>
        </Defs>

        <G rotation="-20" origin="250, 500">
          <Rect x="-100" y="-100" width="340" height="550" rx="48" fill="url(#glow)" />
          <Rect x="260" y="-100" width="340" height="400" rx="48" fill="url(#glow)" />
          <Rect x="-100" y="470" width="340" height="600" rx="48" fill="url(#glow)" />
          <Rect x="260" y="320" width="340" height="750" rx="48" fill="url(#glow)" />
        </G>
      </Svg>

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.4)', '#000000', '#000000']}
        locations={[0.3, 0.6, 0.85, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#050300',
    overflow: 'hidden',
  },
});
