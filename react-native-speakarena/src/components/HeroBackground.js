import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient as SvgRadialGradient, LinearGradient as SvgLinearGradient, Stop, Rect, G } from 'react-native-svg';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

export default function HeroBackground() {
  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFillObject} viewBox="0 0 400 800">
        <Defs>
          {/* Layer 1: The Realistic 3D Glowing Orb (Underneath the glass) */}
          <SvgRadialGradient id="glowSource" cx="0%" cy="0%" r="90%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#FFC875" stopOpacity="0.8" />
            {/* Bright bulb core */}
            <Stop offset="25%" stopColor="#E05A00" stopOpacity="0.6" />
            {/* Diffused amber */}
            <Stop offset="60%" stopColor="#4A1500" stopOpacity="0.4" />
            {/* Fading heat */}
            <Stop offset="90%" stopColor="#09090B" stopOpacity="0" />
            {/* Blends to black */}
          </SvgRadialGradient>

          {/* Layer 2: The Glass Surface Reflection (Creates the "screen" glare) */}
          <SvgLinearGradient id="glassSheen" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.12" />
            {/* Brightest at top left corner */}
            <Stop offset="15%" stopColor="#FFFFFF" stopOpacity="0.02" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </SvgLinearGradient>
        </Defs>

        {/* The Glass Panels
        - Perfect 6px gap math to reveal the pitch-black background.
        - Each panel has TWO rectangles. One for the glow, one for the glass border/sheen.
        */}
        <G rotation="-18" origin="150, 300">
          {/* Top Left Panel */}
          <Rect x="-200" y="-200" width="294" height="344" rx="24" fill="url(#glowSource)" />
          <Rect x="-200" y="-200" width="294" height="344" rx="24" fill="url(#glassSheen)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

          {/* Top Right Panel */}
          <Rect x="100" y="-200" width="350" height="344" rx="24" fill="url(#glowSource)" />
          <Rect x="100" y="-200" width="350" height="344" rx="24" fill="url(#glassSheen)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

          {/* Middle Left Panel */}
          <Rect x="-200" y="150" width="294" height="244" rx="24" fill="url(#glowSource)" />
          <Rect x="-200" y="150" width="294" height="244" rx="24" fill="url(#glassSheen)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

          {/* Middle Right Panel */}
          <Rect x="100" y="150" width="350" height="244" rx="24" fill="url(#glowSource)" />
          <Rect x="100" y="150" width="350" height="244" rx="24" fill="url(#glassSheen)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

          {/* Bottom Left Panel */}
          <Rect x="-200" y="400" width="294" height="400" rx="24" fill="url(#glowSource)" />
          <Rect x="-200" y="400" width="294" height="400" rx="24" fill="url(#glassSheen)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

          {/* Bottom Right Panel */}
          <Rect x="100" y="400" width="350" height="400" rx="24" fill="url(#glowSource)" />
          <Rect x="100" y="400" width="350" height="400" rx="24" fill="url(#glassSheen)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        </G>
      </Svg>

      {/* The Smooth Bottom Fade */}
      <ExpoLinearGradient
        colors={['transparent', 'rgba(9,9,11,0.6)', '#09090B', '#09090B']}
        locations={[0.35, 0.65, 0.85, 1]}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B', // Pure dark gap color
  },
});
