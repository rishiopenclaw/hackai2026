import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

const SPRITE_SOURCE = require('../../../assets/updateImages.png');
const SPRITE_SOURCE_FIVE = require('../../../assets/updateFive.png');
const SPRITE_WIDTH = 1152;
const SPRITE_HEIGHT = 768;
const LOGO_SPRITES_PRIMARY = [
  { key: 'orange-cat', label: 'Orange Cat', subtitle: 'Playful alt', x: 229, y: 149, size: 206, source: SPRITE_SOURCE },
  { key: 'blue-owl', label: 'Blue Owl', subtitle: 'Bookish alt', x: 568, y: 84, size: 210, source: SPRITE_SOURCE },
  { key: 'dog', label: 'Dog Hero', subtitle: 'Primary mascot', x: 429, y: 289, size: 291, source: SPRITE_SOURCE },
  { key: 'robot', label: 'Robot Bot', subtitle: 'Friendly tech', x: 789, y: 295, size: 208, source: SPRITE_SOURCE },
  { key: 'panda', label: 'Panda Pal', subtitle: 'Formal alt', x: 226, y: 437, size: 206, source: SPRITE_SOURCE },
  { key: 'orange-kid', label: 'Orange Kid', subtitle: 'Bright energy', x: 627, y: 526, size: 208, source: SPRITE_SOURCE },
];
const LOGO_SPRITES_SECONDARY = [
  { key: 'green-lizard', label: 'Green Lizard', subtitle: 'Bright mascot', x: 111, y: 75, size: 248, source: SPRITE_SOURCE_FIVE },
  { key: 'pink-rabbit', label: 'Pink Rabbit', subtitle: 'Sweet alt', x: 441, y: 79, size: 248, source: SPRITE_SOURCE_FIVE },
  { key: 'red-bird', label: 'Red Bird', subtitle: 'Cheerful alt', x: 757, y: 79, size: 248, source: SPRITE_SOURCE_FIVE },
  { key: 'brown-beaver', label: 'Brown Beaver', subtitle: 'Warm friend', x: 112, y: 408, size: 248, source: SPRITE_SOURCE_FIVE },
  { key: 'winter-penguin', label: 'Winter Penguin', subtitle: 'Cozy alt', x: 443, y: 409, size: 248, source: SPRITE_SOURCE_FIVE },
  { key: 'pink-owl', label: 'Pink Owl', subtitle: 'Soft owl alt', x: 773, y: 409, size: 248, source: SPRITE_SOURCE_FIVE },
];

function PageHeader() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>LOGO LAB</Text>
        <Text style={styles.title}>Mascot logo concepts</Text>
      </View>
      <View style={styles.headerBadge}>
        <Sparkles size={16} color="#F59E0B" strokeWidth={2.2} />
        <Text style={styles.headerBadgeText}>Preview</Text>
      </View>
    </View>
  );
}

function LogoCircle({ size = 120, children }) {
  return (
    <View style={[styles.logoWrap, { width: size + 12, height: size + 12 }]}>
      <View style={[styles.logoRing, { width: size, height: size, borderRadius: size / 2 }]}>
        <View style={[styles.logoInner, { borderRadius: (size - 12) / 2 }]}>{children}</View>
      </View>
    </View>
  );
}

function ExactLogoSprite({ crop, displaySize }) {
  const scale = displaySize / crop.size;
  const sourceWidth = crop.source === SPRITE_SOURCE_FIVE ? 1152 : SPRITE_WIDTH;
  const sourceHeight = crop.source === SPRITE_SOURCE_FIVE ? 768 : SPRITE_HEIGHT;

  return (
    <View style={[styles.exactLogoFrame, { width: displaySize, height: displaySize, borderRadius: displaySize / 2 }]}>
      <Image
        source={crop.source}
        style={{
          position: 'absolute',
          width: sourceWidth * scale,
          height: sourceHeight * scale,
          left: -crop.x * scale,
          top: -crop.y * scale,
        }}
      />
    </View>
  );
}

function ExactLogoTile({ crop, displaySize }) {
  return (
    <View style={styles.logoTile}>
      <View style={[styles.exactLogoWrap, { width: displaySize + 8 }]}>
        <ExactLogoSprite crop={crop} displaySize={displaySize} />
      </View>
      <Text style={styles.logoLabel}>{crop.label}</Text>
      <Text style={styles.logoSubtitle}>{crop.subtitle}</Text>
    </View>
  );
}

function GreenLogo() {
  return (
    <Svg width={118} height={118} viewBox="0 0 118 118">
      <Defs>
        <LinearGradient id="greenBg" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#DDF8BF" />
          <Stop offset="60%" stopColor="#B8EE93" />
          <Stop offset="100%" stopColor="#9BE173" />
        </LinearGradient>
        <LinearGradient id="greenHead" x1="0.18" y1="0.08" x2="0.84" y2="0.9">
          <Stop offset="0%" stopColor="#87E67B" />
          <Stop offset="55%" stopColor="#5CCB62" />
          <Stop offset="100%" stopColor="#3CA850" />
        </LinearGradient>
        <LinearGradient id="greenBelly" x1="0.4" y1="0" x2="0.6" y2="1">
          <Stop offset="0%" stopColor="#F8FFF4" />
          <Stop offset="100%" stopColor="#DDF7DB" />
        </LinearGradient>
        <LinearGradient id="greenOveralls" x1="0.2" y1="0" x2="0.8" y2="1">
          <Stop offset="0%" stopColor="#FFD93A" />
          <Stop offset="100%" stopColor="#F3BD1E" />
        </LinearGradient>
      </Defs>
      <Rect width="118" height="118" rx="59" fill="url(#greenBg)" />
      <Ellipse cx="62" cy="104" rx="31" ry="7" fill="#8CD980" opacity="0.35" />
      <Path d="M30 91 C30 57, 39 33, 59 33 C79 33, 88 57, 88 91 V108 H30 Z" fill="url(#greenHead)" />
      <Path d="M35 88 C40 66, 55 49, 79 41 C84 51, 87 66, 87 88 Z" fill="#69D670" opacity="0.38" />
      <Path d="M36 48 C31 34, 38 24, 49 26 C50 37, 45 45, 36 48 Z" fill="#4ABB54" />
      <Path d="M48 39 C44 25, 54 16, 65 21 C65 31, 59 38, 48 39 Z" fill="#56C95C" />
      <Path d="M63 36 C66 21, 79 16, 89 25 C86 35, 77 39, 63 36 Z" fill="#63D66A" />
      <Path d="M30 87 C33 80, 38 76, 44 75" stroke="#33A74D" strokeWidth="7" strokeLinecap="round" />
      <Path d="M29 83 C31 72, 36 63, 43 58" stroke="#80E17D" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
      <Path d="M79 76 C85 77, 89 80, 92 87" stroke="#389A4C" strokeWidth="7" strokeLinecap="round" />
      <Path d="M50 79 C52 71, 58 67, 67 67 C76 67, 82 72, 82 80 C76 87, 69 90, 60 90 C52 90, 46 86, 43 81 Z" fill="url(#greenBelly)" />
      <Path d="M47 72 C55 76, 68 76, 77 70" stroke="#E5F9E4" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
      <Circle cx="46" cy="57" r="12" fill="#FFFFFF" />
      <Circle cx="72" cy="56" r="12" fill="#FFFFFF" />
      <Ellipse cx="48" cy="58" rx="7" ry="8.2" fill="#5E2C0D" />
      <Ellipse cx="70" cy="57" rx="7.2" ry="8.4" fill="#5E2C0D" />
      <Circle cx="50" cy="60" r="4" fill="#1D222F" />
      <Circle cx="72" cy="59" r="4.1" fill="#1D222F" />
      <Circle cx="47.6" cy="55.2" r="2.1" fill="#FFFFFF" />
      <Circle cx="69.7" cy="54.5" r="2.1" fill="#FFFFFF" />
      <Path d="M38 46 C41 43, 46 42, 52 44" stroke="#2D8C42" strokeWidth="3.2" strokeLinecap="round" />
      <Path d="M66 43 C71 41, 76 42, 80 46" stroke="#2D8C42" strokeWidth="3.2" strokeLinecap="round" />
      <Ellipse cx="41" cy="70" rx="6.3" ry="5" fill="#FF9EB2" />
      <Ellipse cx="78.5" cy="70" rx="6.3" ry="5" fill="#FF9EB2" />
      <Path d="M56 67 L64 71 L56 75 Z" fill="#FF9829" />
      <Path d="M54 76 C58 73, 64 73, 68 76 L67 81 C64 85, 60 85, 56 81 Z" fill="#1B1E27" />
      <Rect x="58" y="76.5" width="3" height="5.2" rx="1.2" fill="#FFFFFF" />
      <Rect x="62.2" y="76.5" width="3" height="5.2" rx="1.2" fill="#FFFFFF" />
      <Path d="M57.5 82.8 C59.6 84.6, 62.5 84.6, 64.7 82.8" stroke="#FF9BB4" strokeWidth="2.4" strokeLinecap="round" />
      <Path d="M31 89 C41 83, 53 81, 67 81 C76 81, 84 83, 89 87 V108 H31 Z" fill="url(#greenOveralls)" />
      <Rect x="48" y="83" width="8" height="26" rx="4" fill="#2F89E8" />
      <Rect x="68" y="83" width="8" height="26" rx="4" fill="#2F89E8" />
      <Rect x="55" y="86" width="17" height="22" rx="5" fill="#F6D31A" />
      <Circle cx="52" cy="86" r="2.1" fill="#FFF1A6" />
      <Circle cx="72" cy="86" r="2.1" fill="#FFF1A6" />
      <Circle cx="60" cy="95" r="2.2" fill="#E5B918" />
      <Circle cx="67" cy="95" r="2.2" fill="#E5B918" />
    </Svg>
  );
}

function OrangeLogo({ wink = false }) {
  return (
    <Svg width={118} height={118} viewBox="0 0 118 118">
      <Defs>
        <LinearGradient id="orangeBg" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FFF0C8" />
          <Stop offset="100%" stopColor="#FFD983" />
        </LinearGradient>
        <LinearGradient id="orangeBody" x1="0.18" y1="0.05" x2="0.82" y2="0.9">
          <Stop offset="0%" stopColor="#FFC247" />
          <Stop offset="55%" stopColor="#FF9F1A" />
          <Stop offset="100%" stopColor="#EF780D" />
        </LinearGradient>
      </Defs>
      <Rect width="118" height="118" rx="59" fill="url(#orangeBg)" />
      <Ellipse cx="60" cy="104" rx="29" ry="6.5" fill="#F0C86A" opacity="0.42" />
      <Path d="M31 92 C31 52, 43 28, 60 28 C78 28, 89 52, 89 91 V108 H31 Z" fill="url(#orangeBody)" />
      <Path d="M38 88 C45 64, 59 48, 82 39 C86 49, 88 64, 88 88 Z" fill="#FFB126" opacity="0.36" />
      <Path d="M37 40 C30 28, 36 17, 49 20 C50 31, 46 38, 37 40 Z" fill="#F56213" />
      <Path d="M81 40 C89 29, 82 17, 69 20 C68 31, 72 38, 81 40 Z" fill="#FFB118" />
      <Path d="M53 30 C55 23, 62 20, 68 23 C67 31, 63 36, 57 38" stroke="#F5A413" strokeWidth="5" strokeLinecap="round" />
      <Path d="M58 29 C61 24, 68 22, 73 26 C71 33, 66 37, 61 39" stroke="#F1A11B" strokeWidth="4" strokeLinecap="round" />
      <Path d="M42 78 C44 69, 51 63, 61 63 C71 63, 78 68, 80 78 C75 86, 68 90, 59 90 C51 90, 45 86, 40 81 Z" fill="#FFF8F0" />
      <Circle cx="48" cy="57" r="12" fill="#FFFFFF" />
      {wink ? <Path d="M67 57 C71 53, 77 53, 82 57" stroke="#7A3C11" strokeWidth="4.3" strokeLinecap="round" /> : <Circle cx="72" cy="57" r="12.5" fill="#FFFFFF" />}
      <Ellipse cx="51" cy="59" rx="6.6" ry="7.8" fill="#222535" />
      <Circle cx="49.3" cy="56.7" r="1.9" fill="#FFFFFF" />
      {!wink ? <Ellipse cx="69.8" cy="59" rx="6.6" ry="7.8" fill="#222535" /> : null}
      {!wink ? <Circle cx="68.2" cy="56.7" r="1.9" fill="#FFFFFF" /> : null}
      <Path d="M40 46 C44 43, 50 42, 56 44" stroke="#8F4416" strokeWidth="3.2" strokeLinecap="round" />
      {!wink ? <Path d="M64 43 C70 42, 76 43, 81 47" stroke="#8F4416" strokeWidth="3.2" strokeLinecap="round" /> : null}
      <Path d="M57 68 L65 71 L57 75 Z" fill="#FF9422" />
      <Path d="M54 76 C58 73, 65 73, 69 76 L68 81 C65 85, 60 86, 56 82 Z" fill="#191C24" />
      <Rect x="58.1" y="76.5" width="2.8" height="5.2" rx="1.1" fill="#FFFFFF" />
      <Rect x="62.1" y="76.5" width="2.8" height="5.2" rx="1.1" fill="#FFFFFF" />
      <Path d="M58 83 C60.2 85.3, 63.3 85.4, 65.7 83" stroke="#FF9AB4" strokeWidth="2.3" strokeLinecap="round" />
      <Path d="M31 91 C39 87, 49 85, 61 85 C73 85, 82 87, 89 91 V108 H31 Z" fill="#36AF61" />
      <Path d="M31 95 C39 92, 49 90, 60 90 C72 90, 82 92, 89 95 V108 H31 Z" fill="#2A9A57" />
      <Path d="M36 88 C42 84, 48 82, 53 83 C56 84, 59 86, 61 89 C63 86, 67 84, 70 83 C76 82, 82 84, 88 88" stroke="#6BE58B" strokeWidth="3.5" strokeLinecap="round" />
      <Path d="M34 83 C38 80, 42 79, 46 80" stroke="#FF891A" strokeWidth="6" strokeLinecap="round" />
    </Svg>
  );
}

function PinkLogo() {
  return (
    <Svg width={118} height={118} viewBox="0 0 118 118">
      <Defs>
        <LinearGradient id="pinkBg" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FFEAF0" />
          <Stop offset="100%" stopColor="#FFC3D3" />
        </LinearGradient>
        <LinearGradient id="pinkBody" x1="0.3" y1="0" x2="0.8" y2="1">
          <Stop offset="0%" stopColor="#FFD0DB" />
          <Stop offset="100%" stopColor="#FF9FBB" />
        </LinearGradient>
      </Defs>
      <Rect width="118" height="118" rx="59" fill="url(#pinkBg)" />
      <Ellipse cx="60" cy="103" rx="28" ry="6.5" fill="#ECA8BB" opacity="0.32" />
      <Path d="M34 93 C34 61, 43 36, 59 36 C75 36, 84 60, 84 92 V108 H34 Z" fill="url(#pinkBody)" />
      <Path d="M40 89 C47 67, 58 51, 79 47 C83 60, 84 73, 84 90 Z" fill="#FFB8C9" opacity="0.34" />
      <Path d="M36 38 C32 25, 39 17, 50 19 C51 30, 47 37, 36 38 Z" fill="#F6B5C4" />
      <Path d="M82 38 C86 25, 79 17, 68 19 C67 30, 71 37, 82 38 Z" fill="#F6B5C4" />
      <Path d="M44 38 C39 22, 50 15, 61 26 C59 36, 52 40, 44 38 Z" fill="#FF8FB0" />
      <Path d="M74 38 C79 22, 68 15, 57 26 C59 36, 66 40, 74 38 Z" fill="#FFC8D6" />
      <Path d="M42 79 C44 69, 51 63, 60 63 C69 63, 76 68, 78 78 C73 87, 66 91, 59 91 C52 91, 46 88, 41 82 Z" fill="#FFF9FC" />
      <Circle cx="48" cy="57" r="11.5" fill="#FFFFFF" />
      <Circle cx="71" cy="57" r="11.5" fill="#FFFFFF" />
      <Ellipse cx="51" cy="59" rx="6.4" ry="7.4" fill="#5B2A11" />
      <Ellipse cx="68" cy="59" rx="6.4" ry="7.4" fill="#5B2A11" />
      <Circle cx="53" cy="60" r="3.8" fill="#1F232E" />
      <Circle cx="70" cy="60" r="3.8" fill="#1F232E" />
      <Circle cx="50.6" cy="56.8" r="1.7" fill="#FFFFFF" />
      <Circle cx="67.6" cy="56.8" r="1.7" fill="#FFFFFF" />
      <Path d="M41 46 C45 42, 50 41, 55 43" stroke="#C76586" strokeWidth="3.2" strokeLinecap="round" />
      <Path d="M63 43 C68 41, 73 42, 77 46" stroke="#C76586" strokeWidth="3.2" strokeLinecap="round" />
      <Ellipse cx="42" cy="69" rx="6.3" ry="5" fill="#FFA5B9" />
      <Ellipse cx="77" cy="69" rx="6.3" ry="5" fill="#FFA5B9" />
      <Path d="M56 67 L63 70 L56 74 Z" fill="#FF8C47" />
      <Path d="M54 76 C58 73, 64 73, 68 76 L67 81 C63 85, 59 85, 56 82 Z" fill="#241C22" />
      <Rect x="57.8" y="76.3" width="2.8" height="5" rx="1.1" fill="#FFFFFF" />
      <Rect x="61.8" y="76.3" width="2.8" height="5" rx="1.1" fill="#FFFFFF" />
      <Path d="M58 83 C60.2 85.1, 63.2 85.1, 65.4 83" stroke="#FF9AB6" strokeWidth="2.3" strokeLinecap="round" />
      <Path d="M34 92 C40 88, 48 85, 60 85 C72 85, 79 88, 84 92 V108 H34 Z" fill="#FF6C78" />
      <Path d="M39 90 C43 86, 48 84, 53 84" stroke="#FFD6DE" strokeWidth="4" strokeLinecap="round" />
      <Path d="M65 84 C70 84, 75 86, 79 90" stroke="#FFD6DE" strokeWidth="4" strokeLinecap="round" />
      <Path d="M50 84 C52 80, 56 78, 60 80 C64 78, 68 80, 70 84" stroke="#FFD7E5" strokeWidth="3.2" strokeLinecap="round" />
      <Circle cx="60" cy="84" r="2.2" fill="#FFF0F5" />
    </Svg>
  );
}

function TanLogo() {
  return (
    <Svg width={118} height={118} viewBox="0 0 118 118">
      <Defs>
        <LinearGradient id="tanBg" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FFF0E1" />
          <Stop offset="100%" stopColor="#FFD6B0" />
        </LinearGradient>
        <LinearGradient id="tanBody" x1="0.2" y1="0" x2="0.75" y2="1">
          <Stop offset="0%" stopColor="#F8D6BA" />
          <Stop offset="100%" stopColor="#DDAE81" />
        </LinearGradient>
      </Defs>
      <Rect width="118" height="118" rx="59" fill="url(#tanBg)" />
      <Ellipse cx="59" cy="103" rx="28" ry="6" fill="#D8B18C" opacity="0.3" />
      <Path d="M36 92 C36 60, 44 36, 59 36 C74 36, 82 59, 82 92 V108 H36 Z" fill="url(#tanBody)" />
      <Path d="M42 88 C46 66, 56 51, 76 46 C80 57, 82 71, 82 89 Z" fill="#EDC9A1" opacity="0.28" />
      <Path d="M41 39 C38 26, 46 19, 55 25 C54 34, 49 39, 41 39 Z" fill="#B57B54" />
      <Path d="M77 39 C80 26, 72 19, 63 25 C64 34, 69 39, 77 39 Z" fill="#B57B54" />
      <Path d="M42 79 C44 69, 51 63, 59 63 C67 63, 74 68, 76 78 C72 86, 66 90, 59 90 C52 90, 46 87, 42 81 Z" fill="#FFF9F3" />
      <Circle cx="49" cy="58" r="11" fill="#FFFFFF" />
      <Circle cx="70" cy="58" r="11" fill="#FFFFFF" />
      <Ellipse cx="51" cy="60" rx="6.2" ry="7.2" fill="#5A3518" />
      <Ellipse cx="68" cy="60" rx="6.2" ry="7.2" fill="#5A3518" />
      <Circle cx="53" cy="61" r="3.5" fill="#1F2430" />
      <Circle cx="70" cy="61" r="3.5" fill="#1F2430" />
      <Circle cx="50.8" cy="57.8" r="1.5" fill="#FFFFFF" />
      <Circle cx="67.8" cy="57.8" r="1.5" fill="#FFFFFF" />
      <Path d="M45 46 C49 42, 53 41, 58 43" stroke="#7C4A29" strokeWidth="3.2" strokeLinecap="round" />
      <Path d="M61 43 C66 41, 70 42, 74 46" stroke="#7C4A29" strokeWidth="3.2" strokeLinecap="round" />
      <Ellipse cx="43" cy="70" rx="5.6" ry="4.4" fill="#F6B89E" />
      <Ellipse cx="76" cy="70" rx="5.6" ry="4.4" fill="#F6B89E" />
      <Path d="M56 68 L63 71 L56 75 Z" fill="#F29A36" />
      <Path d="M55 77 C58 74, 63 74, 67 77 L66 81 C63 84, 60 85, 56 82 Z" fill="#2A2020" />
      <Rect x="58" y="77" width="2.7" height="4.7" rx="1.1" fill="#FFFFFF" />
      <Rect x="61.8" y="77" width="2.7" height="4.7" rx="1.1" fill="#FFFFFF" />
      <Path d="M58 83.2 C60 84.9, 62.7 84.9, 64.8 83.2" stroke="#FFAFBF" strokeWidth="2.1" strokeLinecap="round" />
      <Path d="M36 92 C43 88, 50 86, 59 86 C68 86, 76 88, 82 92 V108 H36 Z" fill="#F1E79F" />
      <Path d="M38 88 C43 84, 48 82, 53 82 C56 82, 59 84, 60 87 C62 84, 66 82, 69 82 C74 82, 78 84, 81 88" stroke="#FFF3B8" strokeWidth="3.2" strokeLinecap="round" />
      <Path d="M46 73 C49 76, 53 77, 59 77 C66 77, 70 76, 73 73" stroke="#E9C96A" strokeWidth="3" strokeLinecap="round" />
      <Circle cx="60" cy="88" r="2.1" fill="#D8B140" />
    </Svg>
  );
}

function CoralLogo() {
  return (
    <Svg width={118} height={118} viewBox="0 0 118 118">
      <Defs>
        <LinearGradient id="coralBg" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FFE9E0" />
          <Stop offset="100%" stopColor="#FFC7B3" />
        </LinearGradient>
        <LinearGradient id="coralBody" x1="0.25" y1="0" x2="0.75" y2="1">
          <Stop offset="0%" stopColor="#FFC1A9" />
          <Stop offset="100%" stopColor="#FF8E73" />
        </LinearGradient>
      </Defs>
      <Rect width="118" height="118" rx="59" fill="url(#coralBg)" />
      <Ellipse cx="60" cy="103" rx="29" ry="6.5" fill="#E5A490" opacity="0.32" />
      <Path d="M33 92 C33 58, 42 35, 58 35 C77 35, 86 59, 86 92 V108 H33 Z" fill="url(#coralBody)" />
      <Path d="M39 89 C45 67, 56 51, 81 44 C84 57, 86 72, 86 90 Z" fill="#FFB49C" opacity="0.28" />
      <Path d="M47 36 C47 24, 58 19, 67 26 C65 35, 57 39, 47 36 Z" fill="#FF785A" />
      <Path d="M70 34 C76 25, 87 24, 92 35 C84 41, 76 41, 70 34 Z" fill="#FF9478" />
      <Path d="M42 79 C44 69, 50 63, 60 63 C70 63, 77 68, 79 78 C75 87, 68 91, 59 91 C51 91, 45 87, 41 81 Z" fill="#FFF8F4" />
      <Circle cx="48" cy="56" r="11" fill="#FFFFFF" />
      <Circle cx="71" cy="56" r="11" fill="#FFFFFF" />
      <Ellipse cx="51" cy="58" rx="6.3" ry="7.5" fill="#5A2B11" />
      <Ellipse cx="68" cy="58" rx="6.3" ry="7.5" fill="#5A2B11" />
      <Circle cx="53" cy="59.5" r="3.8" fill="#1F2430" />
      <Circle cx="70" cy="59.5" r="3.8" fill="#1F2430" />
      <Circle cx="50.8" cy="56.6" r="1.6" fill="#FFFFFF" />
      <Circle cx="67.8" cy="56.6" r="1.6" fill="#FFFFFF" />
      <Path d="M42 46 C46 42, 51 41, 57 43" stroke="#C05F4C" strokeWidth="3.2" strokeLinecap="round" />
      <Path d="M63 43 C69 41, 74 42, 78 46" stroke="#C05F4C" strokeWidth="3.2" strokeLinecap="round" />
      <Ellipse cx="42" cy="69" rx="5.7" ry="4.5" fill="#FFAB9B" />
      <Ellipse cx="77" cy="69" rx="5.7" ry="4.5" fill="#FFAB9B" />
      <Path d="M56 65 L64 68 L56 72 Z" fill="#FF932E" />
      <Path d="M54.8 74.8 C58.4 72.4, 64.2 72.4, 67.8 74.8 L67 80.2 C64 84.2, 59.6 84.2, 56.2 81 Z" fill="#251E22" />
      <Rect x="57.9" y="75.6" width="2.9" height="4.8" rx="1.1" fill="#FFFFFF" />
      <Rect x="61.9" y="75.6" width="2.9" height="4.8" rx="1.1" fill="#FFFFFF" />
      <Path d="M58.2 82.3 C60.3 84.1, 63.2 84.1, 65.3 82.3" stroke="#FF9DB0" strokeWidth="2.1" strokeLinecap="round" />
      <Path d="M33 92 C41 87, 50 84, 60 84 C71 84, 80 87, 86 92 V108 H33 Z" fill="#5DAFFF" />
      <Rect x="45" y="84" width="28" height="8" rx="4" fill="#CFE9FF" />
      <Rect x="40" y="88" width="38" height="4" rx="2" fill="#9ED0FF" />
      <Circle cx="51" cy="88" r="2.1" fill="#84BFFB" />
      <Circle cx="67" cy="88" r="2.1" fill="#84BFFB" />
    </Svg>
  );
}

function LogoTile({ label, subtitle, children, size }) {
  return (
    <View style={styles.logoTile}>
      <LogoCircle size={size}>{children}</LogoCircle>
      <Text style={styles.logoLabel}>{label}</Text>
      <Text style={styles.logoSubtitle}>{subtitle}</Text>
    </View>
  );
}

export default function LogosShowcaseScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <PageHeader />

        <View style={styles.heroGrid}>
          {LOGO_SPRITES_SECONDARY.slice(0, 4).map((logo) => (
            <ExactLogoTile key={logo.key} crop={logo} displaySize={126} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Uploaded references</Text>
        <View style={styles.logoGrid}>
          {[...LOGO_SPRITES_PRIMARY, ...LOGO_SPRITES_SECONDARY.slice(4)].map((logo) => (
            <ExactLogoTile key={`${logo.key}-small`} crop={logo} displaySize={112} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#E3F0EB',
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 110,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.4,
    color: '#22A06B',
  },
  title: {
    marginTop: 4,
    fontSize: 28,
    lineHeight: 31,
    fontWeight: '900',
    color: '#222222',
    maxWidth: 220,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFF8E8',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#FDE7B0',
  },
  headerBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#9A6700',
  },
  heroGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 18,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 32,
    backgroundColor: '#DBECE6',
    marginBottom: 22,
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  exactLogoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  exactLogoFrame: {
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#B3C9C0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 14,
    elevation: 3,
  },
  logoRing: {
    borderWidth: 6,
    borderColor: 'rgba(255,255,255,0.72)',
    backgroundColor: '#FCFEFB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#B3C9C0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 3,
  },
  logoInner: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '900',
    color: '#233035',
    marginBottom: 14,
  },
  logoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 20,
  },
  logoTile: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logoLabel: {
    marginTop: 4,
    fontSize: 17,
    lineHeight: 20,
    fontWeight: '800',
    color: '#263238',
  },
  logoSubtitle: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '600',
    color: '#78868B',
  },
});
