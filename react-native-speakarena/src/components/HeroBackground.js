import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, LinearGradient as SvgLinearGradient, Stop, Rect, G } from 'react-native-svg';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

export default function HeroBackground() {
  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFillObject} viewBox="0 0 400 800">
        <Defs>
          {/* Ambient cinematic base */}
          <SvgLinearGradient id="base" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#2A0F07" />
            <Stop offset="35%" stopColor="#1A0F16" />
            <Stop offset="100%" stopColor="#07080D" />
          </SvgLinearGradient>

          {/* Warm orb */}
          <RadialGradient id="warmOrb" cx="18%" cy="8%" r="78%">
            <Stop offset="0%" stopColor="#FFD19A" stopOpacity="0.78" />
            <Stop offset="28%" stopColor="#FF8A2A" stopOpacity="0.52" />
            <Stop offset="72%" stopColor="#A33C14" stopOpacity="0.18" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </RadialGradient>

          {/* Cool contrast orb */}
          <RadialGradient id="coolOrb" cx="92%" cy="18%" r="65%">
            <Stop offset="0%" stopColor="#6E66FF" stopOpacity="0.20" />
            <Stop offset="45%" stopColor="#3F45B8" stopOpacity="0.10" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </RadialGradient>

          {/* Glass card sheen */}
          <SvgLinearGradient id="sheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.13" />
            <Stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.03" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </SvgLinearGradient>

          {/* Joint edge */}
          <SvgLinearGradient id="edge" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.20" />
            <Stop offset="35%" stopColor="#000000" stopOpacity="0.40" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="0.62" />
          </SvgLinearGradient>
        </Defs>

        <Rect width="400" height="800" fill="url(#base)" />
        <Rect width="400" height="800" fill="url(#warmOrb)" />
        <Rect width="400" height="800" fill="url(#coolOrb)" />

        {/* New geometric composition: elegant asymmetry */}
        <G rotation="-16" origin="190, 290">
          <Rect x="-190" y="-210" width="310" height="360" rx="26" fill="url(#warmOrb)" />
          <Rect x="-190" y="-210" width="310" height="360" rx="26" fill="url(#sheen)" stroke="url(#edge)" strokeWidth="1.4" />

          <Rect x="126" y="-210" width="360" height="300" rx="26" fill="url(#warmOrb)" />
          <Rect x="126" y="-210" width="360" height="300" rx="26" fill="url(#sheen)" stroke="url(#edge)" strokeWidth="1.4" />

          <Rect x="-190" y="156" width="310" height="280" rx="26" fill="url(#warmOrb)" />
          <Rect x="-190" y="156" width="310" height="280" rx="26" fill="url(#sheen)" stroke="url(#edge)" strokeWidth="1.4" />

          <Rect x="126" y="96" width="360" height="430" rx="26" fill="url(#warmOrb)" />
          <Rect x="126" y="96" width="360" height="430" rx="26" fill="url(#sheen)" stroke="url(#edge)" strokeWidth="1.4" />

          <Rect x="-190" y="442" width="310" height="430" rx="26" fill="url(#warmOrb)" />
          <Rect x="-190" y="442" width="310" height="430" rx="26" fill="url(#sheen)" stroke="url(#edge)" strokeWidth="1.4" />

          <Rect x="126" y="532" width="360" height="340" rx="26" fill="url(#warmOrb)" />
          <Rect x="126" y="532" width="360" height="340" rx="26" fill="url(#sheen)" stroke="url(#edge)" strokeWidth="1.4" />
        </G>
      </Svg>

      {/* Atmospheric haze */}
      <ExpoLinearGradient
        colors={['rgba(255,255,255,0.16)', 'rgba(255,255,255,0.05)', 'transparent']}
        locations={[0, 0.22, 0.48]}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />

      {/* Bottom readability mask */}
      <ExpoLinearGradient
        colors={['transparent', 'rgba(8,10,14,0.30)', 'rgba(8,10,14,0.85)', '#05060B']}
        locations={[0.58, 0.78, 0.94, 1]}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07080D',
  },
});
