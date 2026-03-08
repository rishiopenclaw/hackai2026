import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, RadialGradient, Stop, Rect, Path } from 'react-native-svg';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

export default function HeroBackground() {
  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFillObject} viewBox="0 0 400 800">
        <Defs>
          <SvgLinearGradient id="base" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#1A1A1E" />
            <Stop offset="55%" stopColor="#101015" />
            <Stop offset="100%" stopColor="#09090C" />
          </SvgLinearGradient>

          <RadialGradient id="warmGlow" cx="22%" cy="10%" r="62%">
            <Stop offset="0%" stopColor="#FFD7A6" stopOpacity="0.36" />
            <Stop offset="28%" stopColor="#FF9B47" stopOpacity="0.24" />
            <Stop offset="70%" stopColor="#5C2A12" stopOpacity="0.08" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </RadialGradient>

          <RadialGradient id="coolGlow" cx="85%" cy="18%" r="52%">
            <Stop offset="0%" stopColor="#7C8BFF" stopOpacity="0.10" />
            <Stop offset="45%" stopColor="#3F4AA0" stopOpacity="0.05" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </RadialGradient>

          <SvgLinearGradient id="hairline" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.20" />
            <Stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.00" />
          </SvgLinearGradient>
        </Defs>

        <Rect width="400" height="800" fill="url(#base)" />
        <Rect width="400" height="800" fill="url(#warmGlow)" />
        <Rect width="400" height="800" fill="url(#coolGlow)" />

        {/* Apple-like subtle glass ribbons */}
        <Path
          d="M-60 120 C 80 60, 240 70, 460 140"
          stroke="url(#hairline)"
          strokeWidth="1.2"
          fill="none"
          opacity="0.65"
        />
        <Path
          d="M-80 230 C 120 165, 250 180, 470 250"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          fill="none"
        />
        <Path
          d="M-90 360 C 70 315, 230 325, 470 390"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          fill="none"
        />
      </Svg>

      {/* Soft atmospheric veil */}
      <ExpoLinearGradient
        colors={['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.015)', 'transparent']}
        locations={[0, 0.22, 0.52]}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />

      {/* Readability fade for lower content */}
      <ExpoLinearGradient
        colors={['transparent', 'rgba(9,9,12,0.30)', 'rgba(9,9,12,0.88)', '#09090C']}
        locations={[0.62, 0.80, 0.95, 1]}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090C',
  },
});
