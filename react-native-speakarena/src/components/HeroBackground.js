import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient as SvgGradient, Stop, Rect, G } from 'react-native-svg';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

export default function HeroBackground() {
  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFillObject} viewBox="0 0 400 800">
        <Defs>
          {/* The Master Continuous Light Source */}
          <SvgGradient id="masterGlow" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#FFD18C" />
            {/* Bright glowing top-left */}
            <Stop offset="15%" stopColor="#FF6B00" />
            {/* Vibrant orange */}
            <Stop offset="45%" stopColor="#5C2200" />
            {/* Deep burnt shadow */}
            <Stop offset="80%" stopColor="#09090B" />
            {/* Pitch black */}
          </SvgGradient>
        </Defs>

        {/* The Glass Panels
        - Center intersection is precisely at X=150, Y=250.
        - 6px mathematical gaps between all panels reveal the black background.
        - rx=42 creates beautiful filleted intersections.
        */}
        <G rotation="-16" origin="200, 300">
          {/* Top Left */}
          <Rect x="-200" y="-200" width="347" height="447" rx="42" fill="url(#masterGlow)" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" />
          {/* Top Right */}
          <Rect x="153" y="-200" width="400" height="447" rx="42" fill="url(#masterGlow)" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" />
          {/* Bottom Left */}
          <Rect x="-200" y="253" width="347" height="600" rx="42" fill="url(#masterGlow)" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" />
          {/* Bottom Right */}
          <Rect x="153" y="253" width="400" height="600" rx="42" fill="url(#masterGlow)" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" />
        </G>
      </Svg>

      {/* The Smooth Bottom Fade */}
      <ExpoLinearGradient
        colors={['transparent', 'rgba(9,9,11,0.6)', '#09090B', '#09090B']}
        locations={[0.4, 0.75, 0.95, 1]}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B', // The dark gap color that bleeds through
  },
});
