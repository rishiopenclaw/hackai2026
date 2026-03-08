import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Home, Search, User } from 'lucide-react-native';

const ICONS = { Home, Practice: Search, Profile: User };

export default function FloatingToolbar({ state, navigation }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.bar}>
        {state.routes.map((route) => {
          const Icon = ICONS[route.name] || Home;
          const active = state.index === state.routes.findIndex((r) => r.key === route.key);
          return (
            <Pressable key={route.key} style={styles.btn} onPress={() => navigation.navigate(route.name)}>
              <Icon size={20} color={active ? '#fff' : '#778093'} strokeWidth={2} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingBottom: 12, backgroundColor: 'transparent' },
  bar: {
    height: 60,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: '#0B0D13',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btn: { width: 64, height: 60, alignItems: 'center', justifyContent: 'center' },
});
