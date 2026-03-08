import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path, Circle } from 'react-native-svg';
import TopHeaderStats from '../../components/TopHeaderStats';
import LearningPathNode from '../../components/LearningPathNode';
import GamifiedModal from '../../components/GamifiedModal';
import Bouncy3DButton from '../../components/Bouncy3DButton';

function MapArtwork({ height }) {
  return (
    <Svg style={StyleSheet.absoluteFill} viewBox={`0 0 360 ${height}`} preserveAspectRatio="none">
      <Defs>
        <LinearGradient id="grassBase" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#BDEA8D" />
          <Stop offset="100%" stopColor="#9FD86A" />
        </LinearGradient>
        <LinearGradient id="hillShade" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#A8DE77" />
          <Stop offset="100%" stopColor="#8FC857" />
        </LinearGradient>
        <LinearGradient id="trailFill" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FFF7DD" />
          <Stop offset="100%" stopColor="#F2E3B9" />
        </LinearGradient>
      </Defs>

      <Path d={`M0 0 H360 V${height} H0 Z`} fill="url(#grassBase)" />

      <Path d="M-40 60 C60 -10, 180 40, 390 110 V-20 H-40 Z" fill="url(#hillShade)" opacity="0.65" />
      <Path d="M-30 390 C80 330, 170 400, 390 360 V260 H-30 Z" fill="#94CE5E" opacity="0.55" />
      <Path d={`M-40 ${height - 230} C70 ${height - 280}, 160 ${height - 210}, 390 ${height - 230} V${height} H-40 Z`} fill="#87C650" opacity="0.58" />

      <Circle cx="50" cy="170" r="8" fill="#7FC345" />
      <Circle cx="62" cy="178" r="6" fill="#8BCF52" />
      <Circle cx="295" cy="500" r="7" fill="#7FC345" />
      <Circle cx="306" cy="507" r="5" fill="#8BCF52" />
      <Circle cx="92" cy="980" r="8" fill="#7FC345" />
      <Circle cx="104" cy="988" r="6" fill="#8BCF52" />

      {/* Long winding trail (top = end, bottom = start) */}
      <Path
        d={`M258 90
            C188 132, 102 196, 84 282
            C70 348, 112 414, 194 472
            C250 512, 262 582, 214 650
            C170 712, 108 772, 106 840
            C104 916, 162 982, 244 1040
            C278 1064, 300 1100, 300 1140`}
        stroke="#D9C894"
        strokeWidth="42"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
        fill="none"
      />
      <Path
        d={`M258 90
            C188 132, 102 196, 84 282
            C70 348, 112 414, 194 472
            C250 512, 262 582, 214 650
            C170 712, 108 772, 106 840
            C104 916, 162 982, 244 1040
            C278 1064, 300 1100, 300 1140`}
        stroke="url(#trailFill)"
        strokeWidth="38"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d={`M266 88
            C196 130, 112 192, 94 276
            C80 340, 122 406, 202 462
            C256 500, 270 572, 224 638
            C180 700, 118 760, 116 830
            C114 904, 170 968, 252 1028
            C286 1052, 308 1088, 308 1128`}
        stroke="rgba(255,255,255,0.42)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export default function HomeMainScreen({ navigation }) {
  const [open, setOpen] = useState(false);
  const mapScrollRef = useRef(null);
  const MAP_HEIGHT = 1240;

  return (
    <View style={styles.root}>
      <TopHeaderStats />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>YOUR PATH</Text>

        {/* Fixed viewport box; map scrolls inside this box only */}
        <View style={styles.terrainWrap}>
          <ScrollView
            ref={mapScrollRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ height: MAP_HEIGHT }}
            onContentSizeChange={() => mapScrollRef.current?.scrollToEnd({ animated: false })}
          >
            <View style={{ height: MAP_HEIGHT }}>
              <MapArtwork height={MAP_HEIGHT} />

              {/* END node (flag) at TOP of path */}
              <View style={[styles.nodePos, { top: 62, left: 226 }]}>
                <LearningPathNode
                  active
                  icon="⚑"
                  onPress={() => navigation.navigate('Practice', { screen: 'SessionPreflight', params: { trackId: 'persuasive' } })}
                />
              </View>

              {/* Mid nodes */}
              <View style={[styles.nodePos, { top: 268, left: 78 }]}>
                <LearningPathNode number={2} onPress={() => navigation.navigate('Practice', { screen: 'SessionPreflight', params: { trackId: 'fast' } })} />
              </View>
              <View style={[styles.nodePos, { top: 468, left: 176 }]}>
                <LearningPathNode number={3} onPress={() => navigation.navigate('Practice', { screen: 'SessionPreflight', params: { trackId: 'pressure' } })} />
              </View>
              <View style={[styles.nodePos, { top: 662, left: 110 }]}>
                <LearningPathNode locked icon="🔒" />
              </View>

              {/* Extra roadmap depth (for scroll feel) */}
              <View style={[styles.nodePos, { top: 844, left: 96 }]}>
                <LearningPathNode locked number={5} />
              </View>
              <View style={[styles.nodePos, { top: 1172, left: 238 }]}>
                <LearningPathNode locked number={1} />
              </View>
            </View>
          </ScrollView>
        </View>

        <Bouncy3DButton title="Try challenge" variant="orange" onPress={() => setOpen(true)} style={{ marginTop: 16 }} />
      </ScrollView>

      <GamifiedModal
        visible={open}
        title="Keep your momentum?"
        subtitle="You’re one lesson away from keeping your consistency alive."
        emoji="🔥"
        primaryTitle="STAY"
        secondaryTitle="LEAVE"
        onClose={() => setOpen(false)}
        onPrimary={() => setOpen(false)}
        onSecondary={() => setOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F9F6' },
  content: { paddingHorizontal: 20, paddingTop: 6, paddingBottom: 24 },
  heading: { color: '#4B4B4B', fontSize: 15, fontWeight: '900', letterSpacing: 1, marginBottom: 10 },
  terrainWrap: {
    height: 650,
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#BDEB92',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  nodePos: { position: 'absolute' },
});
