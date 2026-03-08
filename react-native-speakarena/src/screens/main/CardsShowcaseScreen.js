import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Plus, Flame, Sparkles, X } from 'lucide-react-native';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function PageHeader() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>CARD LAB</Text>
        <Text style={styles.title}>Front-facing card concepts</Text>
      </View>
      <View style={styles.headerBadge}>
        <Sparkles size={16} color="#F59E0B" strokeWidth={2.2} />
        <Text style={styles.headerBadgeText}>Preview</Text>
      </View>
    </View>
  );
}

function StudyBadgeIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Circle cx="11" cy="11" r="10" fill="#FFE6D2" />
      <Path d="M11.8 4.6 C9.6 6.5, 9.6 8.1, 10.3 9.2 C8.7 9.1, 7.3 10.3, 7.3 12.1 C7.3 14.5, 9.1 16.3, 11.4 16.3 C14 16.3, 15.8 14.4, 15.8 11.9 C15.8 9.9, 14.7 8.2, 13.2 7.2 C13.2 6.4, 12.8 5.4, 11.8 4.6 Z" fill="#F28A2E" />
      <Path d="M11.3 8.2 C10.5 9.1, 10.4 9.8, 10.9 10.4 C9.9 10.3, 9.1 11.1, 9.1 12.2 C9.1 13.6, 10.1 14.6, 11.4 14.6 C12.8 14.6, 13.8 13.5, 13.8 12.1 C13.8 11 13.2 10.1, 12.3 9.5 C12.3 9 12 8.4, 11.3 8.2 Z" fill="#FFF7F0" />
    </Svg>
  );
}

function PackBadgeIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Rect x="2.5" y="3.5" width="17" height="15" rx="4.5" fill="#FFE7D1" />
      <Rect x="6.5" y="2" width="9" height="5" rx="2.5" fill="#FFB15C" />
      <Path d="M11 7.5 V15.5" stroke="#F28A2E" strokeWidth="2" strokeLinecap="round" />
      <Path d="M7.2 11.5 H14.8" stroke="#F28A2E" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function MomentumBadgeIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Circle cx="11" cy="11" r="10" fill="#FF9D55" />
      <Path d="M12.2 4.5 C9.8 6.6, 9.8 8.3, 10.6 9.5 C8.8 9.3, 7.3 10.6, 7.3 12.7 C7.3 15.4, 9.3 17.4, 11.9 17.4 C14.8 17.4, 16.8 15.2, 16.8 12.4 C16.8 10.1, 15.5 8.2, 13.8 7 C13.8 6.1, 13.3 5.1, 12.2 4.5 Z" fill="#FFF7F0" />
      <Path d="M11.8 8.3 C10.9 9.3, 10.8 10.1, 11.3 10.8 C10.2 10.7, 9.2 11.5, 9.2 12.8 C9.2 14.4, 10.4 15.5, 11.9 15.5 C13.5 15.5, 14.7 14.3, 14.7 12.7 C14.7 11.4, 14 10.4, 13.1 9.7 C13.1 9.1, 12.7 8.5, 11.8 8.3 Z" fill="#FF9D55" />
    </Svg>
  );
}

function StudyDayFlameIcon({ active, focus }) {
  if (!active && !focus) {
    return (
      <Svg width={24} height={24} viewBox="0 0 24 24">
        <Circle cx="12" cy="12" r="11" fill="#FFF5E7" />
        <Path d="M12.3 6.7 C10.3 8.4, 10.2 9.9, 10.9 10.9 C9.5 10.8, 8.4 11.9, 8.4 13.4 C8.4 15.5, 10 17.1, 12 17.1 C14.3 17.1, 15.9 15.4, 15.9 13.2 C15.9 11.5, 14.9 10.1, 13.6 9.3 C13.6 8.5, 13.2 7.5, 12.3 6.7 Z" fill="#F5C88A" />
      </Svg>
    );
  }

  return (
    <Svg width={focus ? 30 : 26} height={focus ? 30 : 26} viewBox="0 0 30 30">
      <Circle cx="15" cy="15" r="14" fill={focus ? '#FFF2E2' : '#FFB233'} />
      <Path d="M15.8 7.6 C13.2 9.8, 13.2 11.6, 14 12.9 C12.1 12.7, 10.5 14.1, 10.5 16.2 C10.5 19, 12.6 21.1, 15.3 21.1 C18.3 21.1, 20.5 18.9, 20.5 15.9 C20.5 13.5, 19.1 11.5, 17.3 10.3 C17.3 9.4, 16.8 8.3, 15.8 7.6 Z" fill="#FFFFFF" />
      <Path d="M15.3 12.1 C14.2 13.2, 14.1 14.1, 14.7 14.9 C13.4 14.8, 12.4 15.8, 12.4 17.1 C12.4 18.8, 13.7 20.1, 15.2 20.1 C17 20.1, 18.2 18.7, 18.2 17 C18.2 15.6, 17.4 14.4, 16.4 13.6 C16.4 12.9, 16 12.3, 15.3 12.1 Z" fill={focus ? '#F39C34' : '#FFB233'} />
    </Svg>
  );
}

function EventIconArt() {
  return (
    <Svg width={112} height={112} viewBox="0 0 112 112">
      <Rect x="0" y="0" width="112" height="112" rx="26" fill="#F8CF36" />
      <Circle cx="84" cy="28" r="9" fill="#FBE88C" />
      <Path d="M17 86 C37 77, 63 75, 96 83" stroke="#E2A90A" strokeWidth="6" strokeLinecap="round" />
      <Circle cx="57" cy="52" r="22" fill="#63D347" />
      <Circle cx="46" cy="46" r="8.5" fill="#FFFFFF" />
      <Circle cx="69" cy="46" r="8.5" fill="#FFFFFF" />
      <Circle cx="48" cy="47" r="3.2" fill="#253041" />
      <Circle cx="67" cy="47" r="3.2" fill="#253041" />
      <Path d="M55 52 C58 55, 63 55, 66 52" stroke="#2F8440" strokeWidth="3.5" strokeLinecap="round" />
      <Path d="M57 49 L62 52 L57 55 Z" fill="#F28E1C" />
      <Path d="M41 29 C38 16, 48 9, 61 16" fill="#46B649" />
      <Path d="M67 28 C74 16, 87 14, 93 25" fill="#53C95A" />
      <Path d="M31 60 L39 60 L39 52 C39 49, 41 47, 44 47 C47 47, 49 49, 49 52 L49 60 L57 60 L57 65 L49 65 L49 73 C49 76, 47 78, 44 78 C41 78, 39 76, 39 73 L39 65 L31 65 Z" fill="#FF8DA1" />
      <Path d="M43 47 C45 47, 46.5 48.5, 46.5 50.5 L46.5 74.5 C46.5 76.5, 45 78, 43 78" stroke="#FFDDE5" strokeWidth="2.4" strokeLinecap="round" />
    </Svg>
  );
}

function FreezeCrystalIcon() {
  return (
    <Svg width={92} height={92} viewBox="0 0 92 92">
      <Ellipse cx="46" cy="76" rx="24" ry="8" fill="#CFE7FF" opacity="0.7" />
      <Path d="M50 12 L69 24 L62 49 L41 54 L27 35 L35 17 Z" fill="#3EA3FF" />
      <Path d="M34 18 L51 12 L47 31 L30 35 Z" fill="#8CCBFF" />
      <Path d="M47 31 L69 24 L62 49 L44 54 Z" fill="#2D86EA" />
      <Path d="M30 35 L47 31 L44 54 L27 35 Z" fill="#74BDFF" />
      <Path d="M24 33 L36 25 L43 37 L30 48 L18 41 Z" fill="#DDEEFF" />
      <Path d="M43 37 L58 30 L68 43 L56 54 L30 48 Z" fill="#B7DBFF" />
      <Path d="M36 25 L52 20" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <Circle cx="71" cy="18" r="3" fill="#5CB9FF" />
      <Circle cx="76" cy="14" r="2" fill="#9BD7FF" />
    </Svg>
  );
}

function PenguinCardArt() {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 140 90">
      <Rect x="0" y="0" width="140" height="90" rx="18" fill="#4CB3FF" />
      <Circle cx="112" cy="18" r="10" fill="#8FD5FF" opacity="0.85" />
      <Path d="M18 77 C36 60, 62 56, 120 61" stroke="#A8E4FF" strokeWidth="6" strokeLinecap="round" />
      <Ellipse cx="70" cy="53" rx="23" ry="26" fill="#163B73" />
      <Ellipse cx="70" cy="58" rx="15" ry="19" fill="#F4FAFF" />
      <Circle cx="62" cy="46" r="3.3" fill="#14213A" />
      <Circle cx="79" cy="46" r="3.3" fill="#14213A" />
      <Path d="M67 50 L75 53 L67 57 Z" fill="#FDBA35" />
      <Path d="M50 51 C40 44, 37 35, 42 28 C49 19, 63 20, 67 33" fill="#FFD54B" />
      <Path d="M50 70 C40 76, 35 79, 30 82" stroke="#FF9E1A" strokeWidth="5" strokeLinecap="round" />
      <Path d="M89 69 C100 75, 106 78, 112 81" stroke="#FF9E1A" strokeWidth="5" strokeLinecap="round" />
      <Path d="M89 51 C99 45, 103 36, 98 29 C91 20, 77 20, 73 33" fill="#FFD54B" />
      <Path d="M63 24 C69 16, 80 14, 89 19" stroke="#D7F1FF" strokeWidth="4" strokeLinecap="round" />
    </Svg>
  );
}

function GreenMascotArt() {
  return (
    <Svg width={120} height={84} viewBox="0 0 120 84">
      <Ellipse cx="60" cy="72" rx="34" ry="8" fill="#DCEFD8" />
      <Path d="M18 70 C38 57, 70 56, 102 67" stroke="#7CD36A" strokeWidth="6" strokeLinecap="round" />
      <Path d="M50 18 C58 5, 76 7, 81 23" fill="#38B84F" />
      <Path d="M38 22 C35 9, 46 2, 58 11" fill="#56C85F" />
      <Circle cx="59" cy="38" r="23" fill="#5AD05C" />
      <Circle cx="68" cy="35" r="18" fill="#63D867" />
      <Ellipse cx="64" cy="48" rx="17" ry="13" fill="#F5FFF2" />
      <Circle cx="55" cy="39" r="5" fill="#FFFFFF" />
      <Circle cx="73" cy="39" r="5" fill="#FFFFFF" />
      <Circle cx="56" cy="40" r="2.3" fill="#243030" />
      <Circle cx="72" cy="40" r="2.3" fill="#243030" />
      <Path d="M61 44 L66 46 L61 49 Z" fill="#F29C2E" />
      <Path d="M54 54 C59 58, 68 58, 73 54" stroke="#2CA354" strokeWidth="3.5" strokeLinecap="round" />
      <Rect x="34" y="48" width="12" height="22" rx="4" fill="#FFD647" />
      <Rect x="43" y="48" width="16" height="22" rx="4" fill="#2E8FF6" />
    </Svg>
  );
}

function EventMascotArt() {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 160 120">
      <Rect x="0" y="0" width="160" height="120" rx="24" fill="#FFD43B" />
      <Circle cx="136" cy="20" r="10" fill="#FFF1A8" />
      <Path d="M16 102 C42 90, 88 88, 143 98" stroke="#F5BE19" strokeWidth="7" strokeLinecap="round" />
      <Circle cx="79" cy="58" r="29" fill="#6AD354" />
      <Circle cx="64" cy="52" r="11" fill="#FFFFFF" />
      <Circle cx="94" cy="52" r="11" fill="#FFFFFF" />
      <Circle cx="66" cy="53" r="4.5" fill="#20293A" />
      <Circle cx="92" cy="53" r="4.5" fill="#20293A" />
      <Path d="M77 61 C81 65, 87 65, 91 61" stroke="#2D7F39" strokeWidth="4" strokeLinecap="round" />
      <Path d="M80 56 L86 59 L80 63 Z" fill="#F28E1C" />
      <Path d="M57 32 C52 17, 63 8, 79 15" fill="#44B851" />
      <Path d="M93 31 C101 16, 116 14, 123 27" fill="#57C84E" />
      <Rect x="42" y="80" width="18" height="16" rx="5" fill="#FF5A73" />
      <Rect x="48" y="72" width="6" height="28" rx="3" fill="#FFD7DE" />
      <Rect x="36" y="86" width="30" height="6" rx="3" fill="#FFD7DE" />
    </Svg>
  );
}

function FreezeStreakCard() {
  return (
    <View style={[styles.card, styles.largeCard]}>
      <View style={styles.cardTopRow}>
        <View style={styles.iceBadge}>
          <FreezeCrystalIcon />
        </View>
        <View style={styles.iconButton}>
          <Plus size={18} color="#9CA3AF" strokeWidth={2.2} />
        </View>
      </View>

      <Text style={styles.cardTitle}>Try Freeze Streak</Text>
      <Text style={styles.cardBody}>Pause your streak loss for one day and keep your lesson progress intact.</Text>

      <View style={styles.actionRow}>
        <View style={[styles.pillButton, styles.ghostButton]}>
          <Text style={styles.ghostButtonText}>No, thanks</Text>
        </View>
        <View style={[styles.pillButton, styles.successButton]}>
          <Text style={styles.successButtonText}>Use</Text>
        </View>
      </View>
    </View>
  );
}

function StudyStreakCard() {
  return (
    <View style={[styles.card, styles.studyCard]}>
      <View style={styles.studyHeader}>
        <View style={styles.inlineHeader}>
          <View style={styles.giftBadge}>
            <StudyBadgeIcon />
          </View>
          <Text style={styles.inlineTitle}>Consecutive study days</Text>
        </View>
        <View style={styles.studyPill}>
          <Text style={styles.studyPillText}>4 day run</Text>
        </View>
      </View>

      <Text style={styles.studySubtitle}>Keep the chain alive by finishing one quick lesson each day this week.</Text>

      <View style={styles.weekCardRow}>
        {weekDays.map((day, index) => {
          const active = index < 4;
          const focus = day === 'Thu';
          return (
            <View key={day} style={styles.dayCard}>
              <Text style={styles.dayLabelTop}>{day}</Text>
              <View style={[styles.dayDotLarge, active && styles.dayDotActive, focus && styles.dayDotFocusLarge]}>
                <StudyDayFlameIcon active={active} focus={focus} />
              </View>
              <View style={[styles.dayBar, active && styles.dayBarActive, focus && styles.dayBarFocus]} />
            </View>
          );
        })}
      </View>

      <View style={styles.studyFooter}>
        <Text style={styles.studyFooterLabel}>Next reward</Text>
        <Text style={styles.studyFooterValue}>Streak Freeze unlock</Text>
      </View>
    </View>
  );
}

function LibraryCard() {
  return (
    <View style={[styles.card, styles.mediumCard]}>
      <View style={styles.courseTag}>
        <Text style={styles.courseTagText}>New set</Text>
      </View>

      <Text style={styles.courseCode}>Card Pack</Text>
      <Text style={styles.courseMeta}>8 new layouts</Text>

      <View style={styles.libraryArt}>
        <View style={[styles.stackSheet, styles.stackSheetBack]} />
        <View style={[styles.stackSheet, styles.stackSheetMid]} />
        <View style={styles.stackSheetFront}>
          <PackBadgeIcon />
        </View>
      </View>
    </View>
  );
}

function CourseCard() {
  return (
    <View style={[styles.card, styles.mediumCard]}>
      <View style={styles.courseTag}>
        <Text style={styles.courseTagText}>Studying</Text>
      </View>

      <Text style={styles.courseCode}>A1-C1</Text>
      <Text style={styles.courseMeta}>1539 lessons</Text>

      <View style={styles.courseArt}>
        <PenguinCardArt />
      </View>
    </View>
  );
}

function LeaveCard() {
  return (
    <View style={[styles.card, styles.largeCard]}>
      <View style={styles.cardTopRow}>
        <View style={styles.mascotWrap}>
          <GreenMascotArt />
        </View>
        <View style={styles.iconButton}>
          <Plus size={18} color="#9CA3AF" strokeWidth={2.2} />
        </View>
      </View>

      <Text style={styles.cardTitle}>Oh, you want to leave?</Text>
      <Text style={styles.cardBody}>Before you go, save your current streak and come back to keep the momentum rolling.</Text>

      <View style={styles.actionRow}>
        <View style={[styles.pillButton, styles.ghostButton]}>
          <X size={14} color="#10B981" strokeWidth={2.4} />
          <Text style={styles.ghostButtonText}>Exit here</Text>
        </View>
        <View style={[styles.pillButton, styles.successButton]}>
          <Text style={styles.successButtonText}>Leave</Text>
        </View>
      </View>
    </View>
  );
}

function EventCard() {
  return (
    <View style={[styles.card, styles.mediumCard]}>
      <View style={styles.eventHero}>
        <EventIconArt />
      </View>

      <View style={styles.eventRow}>
        <Text style={styles.eventTitle}>Event Name</Text>
        <View style={styles.eventDatePill}>
          <Flame size={13} color="#FACC15" strokeWidth={2.4} />
          <Text style={styles.eventDateText}>12 - 15 Dec</Text>
        </View>
      </View>

      <Text style={styles.eventBody}>A focused challenge block for daily practice, streaks, and extra rewards.</Text>
    </View>
  );
}

function ProgressCard() {
  return (
    <View style={[styles.card, styles.mediumCard]}>
      <View style={styles.inlineHeader}>
        <View style={[styles.giftBadge, styles.progressBadge]}>
          <MomentumBadgeIcon />
        </View>
        <Text style={styles.inlineTitle}>Daily momentum</Text>
      </View>

      <Text style={styles.studySubtitle}>Your consistency meter grows when you finish any speaking session today.</Text>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: '74%' }]} />
      </View>

      <View style={styles.progressStats}>
        <View style={styles.progressStatChip}>
          <Text style={styles.progressStatLabel}>74%</Text>
          <Text style={styles.progressStatSub}>completed</Text>
        </View>
        <View style={styles.progressStatChip}>
          <Text style={styles.progressStatLabel}>3</Text>
          <Text style={styles.progressStatSub}>tasks left</Text>
        </View>
      </View>
    </View>
  );
}

export default function CardsShowcaseScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator
        bounces
        alwaysBounceVertical
      >
        <PageHeader />

        <FreezeStreakCard />
        <StudyStreakCard />
        <View style={styles.row}>
          <CourseCard />
          <LibraryCard />
        </View>
        <LeaveCard />
        <View style={styles.row}>
          <EventCard />
          <ProgressCard />
        </View>
        <FreezeStreakCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EDF3EF',
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 110,
    gap: 16,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 4,
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
  row: {
    flexDirection: 'row',
    gap: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(34, 34, 34, 0.05)',
    shadowColor: '#8FA89A',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 4,
  },
  largeCard: {
    minHeight: 250,
  },
  mediumCard: {
    flex: 1,
    minHeight: 215,
  },
  studyCard: {
    minHeight: 272,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iceBadge: {
    width: 92,
    height: 92,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9F4FF',
    overflow: 'hidden',
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F5F7',
  },
  cardTitle: {
    marginTop: 16,
    fontSize: 31,
    lineHeight: 34,
    fontWeight: '900',
    color: '#1F1F1F',
  },
  cardBody: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: '#70757F',
    maxWidth: 280,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 'auto',
    paddingTop: 24,
  },
  pillButton: {
    flex: 1,
    minHeight: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  ghostButton: {
    backgroundColor: '#DDF7EA',
  },
  ghostButtonText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#20A96E',
  },
  successButton: {
    backgroundColor: '#20C96B',
  },
  successButtonText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  inlineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  studyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  giftBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF0E3',
  },
  inlineTitle: {
    flex: 1,
    fontSize: 21,
    lineHeight: 24,
    fontWeight: '800',
    color: '#222222',
  },
  studyPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#FFF4D6',
  },
  studyPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#B9770E',
  },
  studySubtitle: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    color: '#70757F',
  },
  weekCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 22,
  },
  dayCard: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderRadius: 18,
    backgroundColor: '#F8FAF7',
  },
  dayLabelTop: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9196A2',
  },
  dayDotLarge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5E7',
    borderWidth: 1,
    borderColor: '#FFE0B3',
  },
  dayDotActive: {
    backgroundColor: '#FDBA35',
    borderColor: '#FDBA35',
  },
  dayDotFocusLarge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFF8F1',
    borderColor: '#F3B363',
  },
  dayDotTextLarge: {
    fontSize: 14,
    fontWeight: '800',
    color: '#D18A18',
  },
  dayDotTextActive: {
    color: '#FFFFFF',
  },
  dayDotTextFocus: {
    color: '#F0A32C',
  },
  dayBar: {
    width: '76%',
    height: 6,
    borderRadius: 999,
    backgroundColor: '#E8EDF0',
  },
  dayBarActive: {
    backgroundColor: '#FDBA35',
  },
  dayBarFocus: {
    backgroundColor: '#F39C34',
  },
  studyFooter: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#EEF1F2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  studyFooterLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8B919B',
  },
  studyFooterValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F1F1F',
  },
  courseTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#FDBA35',
  },
  courseTagText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  courseCode: {
    marginTop: 16,
    fontSize: 28,
    fontWeight: '900',
    color: '#222222',
  },
  courseMeta: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '700',
    color: '#EF8C19',
  },
  courseArt: {
    marginTop: 'auto',
    height: 86,
    borderRadius: 20,
    backgroundColor: '#5EB7FF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  libraryArt: {
    marginTop: 'auto',
    height: 92,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stackSheet: {
    position: 'absolute',
    width: 86,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#F6F9FB',
    borderWidth: 1,
    borderColor: '#E7EDF0',
  },
  stackSheetBack: {
    transform: [{ rotate: '-10deg' }, { translateX: -14 }, { translateY: -4 }],
  },
  stackSheetMid: {
    transform: [{ rotate: '8deg' }, { translateX: 16 }, { translateY: 2 }],
  },
  stackSheetFront: {
    width: 92,
    height: 66,
    borderRadius: 20,
    backgroundColor: '#FFF1E3',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFD9B3',
  },
  mascotWrap: {
    width: 110,
    height: 82,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF9E8',
    overflow: 'hidden',
  },
  eventHero: {
    height: 132,
    borderRadius: 24,
    backgroundColor: '#FFD53D',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  eventRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  eventTitle: {
    flex: 1,
    fontSize: 22,
    lineHeight: 25,
    fontWeight: '900',
    color: '#222222',
  },
  eventDatePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#FFF6B8',
    borderRadius: 999,
  },
  eventDateText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#A28600',
  },
  eventBody: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#70757F',
  },
  progressBadge: {
    backgroundColor: '#FF8E3C',
  },
  progressTrack: {
    marginTop: 20,
    height: 16,
    borderRadius: 999,
    backgroundColor: '#EEF2F3',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#1FC96C',
  },
  progressStats: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 10,
  },
  progressStatChip: {
    flex: 1,
    minHeight: 86,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F7FAF8',
    justifyContent: 'center',
  },
  progressStatLabel: {
    fontSize: 17,
    lineHeight: 20,
    fontWeight: '900',
    color: '#1F1F1F',
  },
  progressStatSub: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    color: '#8B919B',
  },
});
