import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path, Circle } from 'react-native-svg';
import TopHeaderStats from '../../components/TopHeaderStats';
import LearningPathNode from '../../components/LearningPathNode';
import GamifiedModal from '../../components/GamifiedModal';
import Bouncy3DButton from '../../components/Bouncy3DButton';

function MapArtwork() {
  return (
    <Svg style={StyleSheet.absoluteFill} viewBox="0 0 360 650" preserveAspectRatio="none">
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

      {/* Base field */}
      <Path d="M0 0 H360 V650 H0 Z" fill="url(#grassBase)" />

      {/* Organic terrain masses */}
      <Path d="M-40 40 C60 -20, 180 40, 240 90 C280 120, 330 160, 390 130 V-20 H-40 Z" fill="url(#hillShade)" opacity="0.65" />
      <Path d="M-30 250 C80 190, 160 250, 210 290 C250 320, 290 360, 390 330 V220 H-30 Z" fill="#94CE5E" opacity="0.55" />
      <Path d="M-40 460 C70 410, 160 470, 230 520 C280 560, 320 600, 390 580 V700 H-40 Z" fill="#87C650" opacity="0.58" />

      {/* Decorative bushes / flowers */}
      <Circle cx="48" cy="130" r="8" fill="#7FC345" />
      <Circle cx="60" cy="136" r="6" fill="#8BCF52" />
      <Circle cx="286" cy="248" r="7" fill="#7FC345" />
      <Circle cx="297" cy="255" r="5" fill="#8BCF52" />
      <Circle cx="74" cy="520" r="9" fill="#7FC345" />
      <Circle cx="89" cy="528" r="6" fill="#8BCF52" />
      <Circle cx="300" cy="560" r="3" fill="#FFD54F" />
      <Circle cx="307" cy="554" r="3" fill="#FF8A80" />
      <Circle cx="292" cy="548" r="3" fill="#81D4FA" />

      {/* Winding trail shadow */}
      <Path
        d="M278 72
           C205 104, 120 158, 92 232
           C72 284, 102 338, 178 390
           C235 430, 252 492, 210 548
           C184 584, 132 612, 96 632"
        stroke="#D9C894"
        strokeWidth="42"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
        fill="none"
      />

      {/* Winding trail main */}
      <Path
        d="M278 64
           C205 96, 120 150, 92 224
           C72 276, 102 330, 178 382
           C235 422, 252 484, 210 540
           C184 576, 132 604, 96 624"
        stroke="url(#trailFill)"
        strokeWidth="38"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Trail highlight */}
      <Path
        d="M286 62
           C214 94, 130 146, 101 219
           C82 269, 112 323, 186 374
           C241 412, 260 474, 219 530
           C194 564, 145 592, 110 611"
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

  return (
    <View style={styles.root}>
      <TopHeaderStats />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>YOUR PATH</Text>

        <View style={styles.terrainWrap}>
          <MapArtwork />

          {/* Nodes pinned to trail waypoints */}
          <View style={[styles.nodePos, { top: 70, left: 214 }]}>
            <LearningPathNode
              active
              number={1}
              onPress={() => navigation.navigate('Practice', { screen: 'SessionPreflight', params: { trackId: 'persuasive' } })}
            />
          </View>

          <View style={[styles.nodePos, { top: 232, left: 102 }]}>
            <LearningPathNode
              number={2}
              onPress={() => navigation.navigate('Practice', { screen: 'SessionPreflight', params: { trackId: 'fast' } })}
            />
          </View>

          <View style={[styles.nodePos, { top: 392, left: 164 }]}>
            <LearningPathNode
              number={3}
              onPress={() => navigation.navigate('Practice', { screen: 'SessionPreflight', params: { trackId: 'pressure' } })}
            />
          </View>

          <View style={[styles.nodePos, { top: 552, left: 100 }]}>
            <LearningPathNode locked icon="🔒" />
          </View>
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
    position: 'relative',
  },
  nodePos: { position: 'absolute' },
});
