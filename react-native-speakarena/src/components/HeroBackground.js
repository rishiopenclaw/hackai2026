import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Rect, G } from 'react-native-svg';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

export default function HeroBackground() {
  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFillObject} viewBox="0 0 400 800">
        <Defs>
          {/* Layer 1: The Master Light - Expanded to reach further down */}
          <SvgLinearGradient id="masterGlow" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#FFE0B2" stopOpacity="1" />
            {/* Intense white-hot core */}
            <Stop offset="20%" stopColor="#FF7A00" stopOpacity="0.9" />
            {/* Vibrant orange */}
            <Stop offset="55%" stopColor="#8A2C00" stopOpacity="0.8" />
            {/* Rich amber pushed lower */}
            <Stop offset="90%" stopColor="#09090B" stopOpacity="0.4" />
            {/* Slowly dies out */}
          </SvgLinearGradient>

          {/* Layer 2: The Glass Surface Glare */}
          <SvgLinearGradient id="glassSurface" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.15" />
            {/* Brighter screen glare */}
            <Stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.03" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </SvgLinearGradient>

          {/* Layer 3: The 3D Glass Edge (The Secret to the "Pop") */}
          <SvgLinearGradient id="glassEdge" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            {/* Harsh bright reflection on top-left edges */}
            <Stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            {/* Shadow on bottom-right edges */}
          </SvgLinearGradient>
        </Defs>

        {/* The Glass Panels - Rendered with 3 passes for extreme 3D depth */}
        <G rotation="-18" origin="150, 300">
          {/* Top Left Panel */}
          <Rect x="-200" y="-200" width="294" height="344" rx="24" fill="url(#masterGlow)" />
          <Rect x="-200" y="-200" width="294" height="344" rx="24" fill="url(#glassSurface)" stroke="url(#glassEdge)" strokeWidth="1.5" />

          {/* Top Right Panel */}
          <Rect x="100" y="-200" width="350" height="344" rx="24" fill="url(#masterGlow)" />
          <Rect x="100" y="-200" width="350" height="344" rx="24" fill="url(#glassSurface)" stroke="url(#glassEdge)" strokeWidth="1.5" />

          {/* Middle Left Panel */}
          <Rect x="-200" y="150" width="294" height="244" rx="24" fill="url(#masterGlow)" />
          <Rect x="-200" y="150" width="294" height="244" rx="24" fill="url(#glassSurface)" stroke="url(#glassEdge)" strokeWidth="1.5" />

          {/* Middle Right Panel */}
          <Rect x="100" y="150" width="350" height="244" rx="24" fill="url(#masterGlow)" />
          <Rect x="100" y="150" width="350" height="244" rx="24" fill="url(#glassSurface)" stroke="url(#glassEdge)" strokeWidth="1.5" />

          {/* Bottom Left Panel */}
          <Rect x="-200" y="400" width="294" height="400" rx="24" fill="url(#masterGlow)" />
          <Rect x="-200" y="400" width="294" height="400" rx="24" fill="url(#glassSurface)" stroke="url(#glassEdge)" strokeWidth="1.5" />

          {/* Bottom Right Panel */}
          <Rect x="100" y="400" width="350" height="400" rx="24" fill="url(#masterGlow)" />
          <Rect x="100" y="400" width="350" height="400" rx="24" fill="url(#glassSurface)" stroke="url(#glassEdge)" strokeWidth="1.5" />
        </G>
      </Svg>

      {/* The Bottom Fade - Pushed WAY down the screen to let the light breathe */}
      <ExpoLinearGradient
        colors={['transparent', 'rgba(9,9,11,0.2)', 'rgba(9,9,11,0.85)', '#09090B']}
        locations={[0.55, 0.75, 0.95, 1]}
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
