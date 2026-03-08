import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Rect, G } from 'react-native-svg';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

export default function HeroBackground() {
  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFillObject} viewBox="0 0 400 800">
        <Defs>
          {/* Stronger light sweep (closer to target) */}
          <SvgLinearGradient id="masterGlow" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#FFE6BC" stopOpacity="1" />
            <Stop offset="16%" stopColor="#FF8A10" stopOpacity="0.98" />
            <Stop offset="46%" stopColor="#A64000" stopOpacity="0.92" />
            <Stop offset="88%" stopColor="#110B0A" stopOpacity="0.72" />
          </SvgLinearGradient>

          {/* Subtle top-left glass sheen */}
          <SvgLinearGradient id="glassSurface" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.12" />
            <Stop offset="24%" stopColor="#FFFFFF" stopOpacity="0.015" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </SvgLinearGradient>

          {/* High-contrast panel edge so joints read darker/crisper */}
          <SvgLinearGradient id="glassEdge" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.24" />
            <Stop offset="28%" stopColor="#000000" stopOpacity="0.55" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="0.72" />
          </SvgLinearGradient>
        </Defs>

        {/* Keep geometry, boost readability */}
        <G rotation="-18" origin="150, 300">
          <Rect x="-200" y="-200" width="294" height="344" rx="24" fill="url(#masterGlow)" />
          <Rect x="-200" y="-200" width="294" height="344" rx="24" fill="url(#glassSurface)" stroke="url(#glassEdge)" strokeWidth="1.8" />

          <Rect x="100" y="-200" width="350" height="344" rx="24" fill="url(#masterGlow)" />
          <Rect x="100" y="-200" width="350" height="344" rx="24" fill="url(#glassSurface)" stroke="url(#glassEdge)" strokeWidth="1.8" />

          <Rect x="-200" y="150" width="294" height="244" rx="24" fill="url(#masterGlow)" />
          <Rect x="-200" y="150" width="294" height="244" rx="24" fill="url(#glassSurface)" stroke="url(#glassEdge)" strokeWidth="1.8" />

          <Rect x="100" y="150" width="350" height="244" rx="24" fill="url(#masterGlow)" />
          <Rect x="100" y="150" width="350" height="244" rx="24" fill="url(#glassSurface)" stroke="url(#glassEdge)" strokeWidth="1.8" />

          <Rect x="-200" y="400" width="294" height="400" rx="24" fill="url(#masterGlow)" />
          <Rect x="-200" y="400" width="294" height="400" rx="24" fill="url(#glassSurface)" stroke="url(#glassEdge)" strokeWidth="1.8" />

          <Rect x="100" y="400" width="350" height="400" rx="24" fill="url(#masterGlow)" />
          <Rect x="100" y="400" width="350" height="400" rx="24" fill="url(#glassSurface)" stroke="url(#glassEdge)" strokeWidth="1.8" />
        </G>
      </Svg>

      {/* Lower fade starts later to preserve orange field */}
      <ExpoLinearGradient
        colors={['transparent', 'rgba(9,9,11,0.12)', 'rgba(9,9,11,0.78)', '#09090B']}
        locations={[0.62, 0.8, 0.95, 1]}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B',
  },
});
