import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Rect, G } from 'react-native-svg';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

export default function HeroBackground() {
  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFillObject} viewBox="0 0 400 800">
        <Defs>
          <SvgLinearGradient id="masterGlow" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#FFE2B7" stopOpacity="0.88" />
            <Stop offset="18%" stopColor="#FF8612" stopOpacity="0.82" />
            <Stop offset="50%" stopColor="#9A3D00" stopOpacity="0.78" />
            <Stop offset="90%" stopColor="#120C0A" stopOpacity="0.70" />
          </SvgLinearGradient>

          <SvgLinearGradient id="glassSurface" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.09" />
            <Stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.012" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </SvgLinearGradient>

          <SvgLinearGradient id="glassEdge" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.20" />
            <Stop offset="28%" stopColor="#000000" stopOpacity="0.50" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="0.64" />
          </SvgLinearGradient>
        </Defs>

        <G rotation="-18" origin="150, 300">
          <Rect x="-200" y="-200" width="294" height="344" rx="24" fill="url(#masterGlow)" />
          <Rect x="-200" y="-200" width="294" height="344" rx="24" fill="url(#glassSurface)" stroke="url(#glassEdge)" strokeWidth="1.5" />

          <Rect x="100" y="-200" width="350" height="344" rx="24" fill="url(#masterGlow)" />
          <Rect x="100" y="-200" width="350" height="344" rx="24" fill="url(#glassSurface)" stroke="url(#glassEdge)" strokeWidth="1.5" />

          <Rect x="-200" y="150" width="294" height="244" rx="24" fill="url(#masterGlow)" />
          <Rect x="-200" y="150" width="294" height="244" rx="24" fill="url(#glassSurface)" stroke="url(#glassEdge)" strokeWidth="1.5" />

          <Rect x="100" y="150" width="350" height="244" rx="24" fill="url(#masterGlow)" />
          <Rect x="100" y="150" width="350" height="244" rx="24" fill="url(#glassSurface)" stroke="url(#glassEdge)" strokeWidth="1.5" />

          <Rect x="-200" y="400" width="294" height="400" rx="24" fill="url(#masterGlow)" />
          <Rect x="-200" y="400" width="294" height="400" rx="24" fill="url(#glassSurface)" stroke="url(#glassEdge)" strokeWidth="1.5" />

          <Rect x="100" y="400" width="350" height="400" rx="24" fill="url(#masterGlow)" />
          <Rect x="100" y="400" width="350" height="400" rx="24" fill="url(#glassSurface)" stroke="url(#glassEdge)" strokeWidth="1.5" />
        </G>
      </Svg>

      {/* top haze to mimic faded look */}
      <ExpoLinearGradient
        colors={['rgba(255,255,255,0.16)', 'rgba(255,255,255,0.05)', 'transparent']}
        locations={[0, 0.26, 0.5]}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />

      {/* gentle global wash to reduce harsh saturation */}
      <View style={styles.globalWash} pointerEvents="none" />

      {/* bottom dark fade */}
      <ExpoLinearGradient
        colors={['transparent', 'rgba(9,9,11,0.18)', 'rgba(9,9,11,0.74)', '#09090B']}
        locations={[0.56, 0.78, 0.94, 1]}
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
  globalWash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20,16,14,0.16)',
  },
});
