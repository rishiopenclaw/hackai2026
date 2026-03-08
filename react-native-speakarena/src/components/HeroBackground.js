import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient as SvgGradient, Stop, Rect, G } from 'react-native-svg';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

export default function HeroBackground() {
  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFillObject} viewBox="0 0 400 800">
        <Defs>
          {/* Master Continuous Light Source - Softened to match SpeechLab Gold/Amber */}
          <SvgGradient id="masterGlow" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#FFB85C" />
            {/* Soft golden bright flare */}
            <Stop offset="25%" stopColor="#D95C00" />
            {/* Deep rich amber */}
            <Stop offset="55%" stopColor="#4A1800" />
            {/* Burnt shadow */}
            <Stop offset="85%" stopColor="#09090B" />
            {/* Pitch black */}
          </SvgGradient>
        </Defs>

        {/* The Glass Panels (2x3 Grid)
        - 4px strict mathematical gaps reveal the #09090B background.
        - rx=18 makes the intersection corners sleek and subtle.
        - Steeper rotation (-22deg) to match target UI.
        */}
        <G rotation="-22" origin="150, 300">
          {/* ROW 1 */}
          <Rect x="-200" y="-200" width="298" height="348" rx="18" fill="url(#masterGlow)" stroke="#000" strokeWidth="1" />
          <Rect x="102" y="-200" width="348" height="348" rx="18" fill="url(#masterGlow)" stroke="#000" strokeWidth="1" />

          {/* ROW 2 (The main visible horizontal line) */}
          <Rect x="-200" y="152" width="298" height="246" rx="18" fill="url(#masterGlow)" stroke="#000" strokeWidth="1" />
          <Rect x="102" y="152" width="348" height="246" rx="18" fill="url(#masterGlow)" stroke="#000" strokeWidth="1" />

          {/* ROW 3 (Fading into the bottom) */}
          <Rect x="-200" y="402" width="298" height="498" rx="18" fill="url(#masterGlow)" stroke="#000" strokeWidth="1" />
          <Rect x="102" y="402" width="348" height="498" rx="18" fill="url(#masterGlow)" stroke="#000" strokeWidth="1" />
        </G>
      </Svg>

      {/* The Smooth Bottom Fade - Heightened so UI text is readable */}
      <ExpoLinearGradient
        colors={['transparent', 'rgba(9,9,11,0.7)', '#09090B', '#09090B']}
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
    backgroundColor: '#09090B', // The pure dark gap color
  },
});
