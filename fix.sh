#!/bin/bash

# 1. Create (tabs) folder and move tab screens
mkdir -p app/(tabs)
mv app/tasks.tsx app/(tabs)/tasks.tsx 2>/dev/null
mv app/notes.tsx app/(tabs)/notes.tsx 2>/dev/null
mv app/projects.tsx app/(tabs)/projects.tsx 2>/dev/null
mv app/ai.tsx app/(tabs)/ai.tsx 2>/dev/null

# 2. Write the tabs layout file
cat > app/(tabs)/_layout.tsx << 'TABEOF'
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Theme = {
  background: '#0A0A14',
  primary: '#6C63FF',
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Theme.primary,
        tabBarInactiveTintColor: '#555577',
        tabBarStyle: {
          backgroundColor: Theme.background,
          borderTopWidth: 1,
          borderTopColor: '#1A1A2E',
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      }}
    >
      <Tabs.Screen name="tasks" options={{ title: 'Tasks', tabBarIcon: ({ color, size }) => <Ionicons name="checkbox-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="notes" options={{ title: 'Notes', tabBarIcon: ({ color, size }) => <Ionicons name="document-text-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="projects" options={{ title: 'Projects', tabBarIcon: ({ color, size }) => <Ionicons name="folder-open-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="ai" options={{ title: 'AI', tabBarIcon: ({ color, size }) => <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} /> }} />
    </Tabs>
  );
}
TABEOF

# 3. Write the root _layout.tsx
cat > app/_layout.tsx << 'LAYOUTEOF'
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen
        name="dashboard"
        options={{
          headerShown: true,
          headerTitle: 'Dashboard',
          headerStyle: { backgroundColor: '#0A0A14' },
          headerTintColor: '#6C63FF',
          headerBackTitle: 'Welcome',
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: true,
          headerTitle: 'VaultOS',
          headerStyle: { backgroundColor: '#0A0A14' },
          headerTintColor: '#6C63FF',
          headerBackTitle: 'Dashboard',
        }}
      />
    </Stack>
  );
}
LAYOUTEOF

# 4. Update welcome.tsx – change replace to push
sed -i 's/router.replace/router.push/g' app/welcome.tsx

# 5. Write a fresh dashboard.tsx with correct navigation routes
cat > app/dashboard.tsx << 'DASHBOARDEOF'
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Theme = {
  background: '#0A0A14',
  surface: '#14142A',
  primary: '#6C63FF',
  secondary: '#00D4FF',
  success: '#00E676',
  text: '#FFFFFF',
  textSecondary: '#8888BB',
  textMuted: '#555577',
  border: '#2A2A44',
};

const features = [
  { name: 'Daily Tasks', icon: 'checkbox-outline', route: '/(tabs)/tasks', color: Theme.primary, desc: 'What needs to get done today' },
  { name: 'Projects', icon: 'folder-open-outline', route: '/(tabs)/projects', color: Theme.secondary, desc: 'Active work in progress' },
  { name: 'Notes', icon: 'document-text-outline', route: '/(tabs)/notes', color: Theme.success, desc: 'Quick thoughts and ideas' },
  { name: 'AI Assistant', icon: 'chatbubble-ellipses-outline', route: '/(tabs)/ai', color: '#9B59B6', desc: 'Ask VaultOS anything' },
];

export default function Dashboard() {
  const [showFounderMessage, setShowFounderMessage] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {showFounderMessage && (
        <View style={styles.founderBanner}>
          <View style={styles.founderBannerHeader}>
            <Text style={styles.founderBannerTitle}>From the Founder</Text>
            <TouchableOpacity onPress={() => setShowFounderMessage(false)}>
              <Ionicons name="close-circle-outline" size={24} color={Theme.textMuted} />
            </TouchableOpacity>
          </View>
          <Text style={styles.founderBannerText}>
            "VaultOS exists to become the central operating system for ambitious individuals and teams, replacing fragmented productivity apps with a single AI-native workspace that thinks, remembers, plans, and executes alongside its users."
          </Text>
        </View>
      )}

      <Text style={styles.title}>VaultOS</Text>
      <Text style={styles.subtitle}>Run your day. Build your future.</Text>

      <View style={styles.grid}>
        {features.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.card}
            onPress={() => router.push(item.route)}
            activeOpacity={0.8}
          >
            <View style={[styles.iconBg, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon as any} size={32} color={item.color} />
            </View>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSub}>{item.desc}</Text>
            <View style={[styles.cardAccent, { backgroundColor: item.color }]} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.background },
  content: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 40 },
  founderBanner: {
    backgroundColor: Theme.surface,
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Theme.primary + '30',
  },
  founderBannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  founderBannerTitle: {
    fontSize: 13,
    color: Theme.textSecondary,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  founderBannerText: {
    fontSize: 15,
    color: Theme.text,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  title: { fontSize: 40, fontWeight: 'bold', color: Theme.text, letterSpacing: 1 },
  subtitle: { fontSize: 16, color: Theme.textSecondary, marginTop: 6, marginBottom: 32 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16 },
  card: {
    backgroundColor: Theme.surface,
    borderRadius: 20,
    padding: 20,
    width: '47%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Theme.border,
    position: 'relative',
    overflow: 'hidden',
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iconBg: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: Theme.text, marginBottom: 4 },
  cardSub: { fontSize: 12, color: Theme.textSecondary, lineHeight: 16 },
});
DASHBOARDEOF

chmod +x fix.sh
