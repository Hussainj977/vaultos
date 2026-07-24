import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

const CARDS = [
  {
    title: 'Daily Tasks',
    subtitle: 'What needs to get done today',
    route: '/tasks',
  },
  {
    title: 'Projects',
    subtitle: 'Active work in progress',
    route: '/projects',
  },
  {
    title: 'Notes',
    subtitle: 'Quick thoughts and ideas',
    route: '/notes',
  },
  {
    title: 'AI Assistant',
    subtitle: 'Ask VaultOS anything',
    route: '/ai',
  },
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.heading}>
        VaultOS
      </ThemedText>
      <ThemedText type="subtitle" style={styles.tagline}>
        Run your day. Build your future.
      </ThemedText>

      <View style={styles.cardList}>
        {CARDS.map((card) => (
          <Pressable
            key={card.title}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => router.push(card.route)}>
            <ThemedText style={styles.cardTitle}>{card.title}</ThemedText>
            <ThemedText style={styles.cardSubtitle}>{card.subtitle}</ThemedText>
          </Pressable>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  heading: {
    marginBottom: 4,
  },
  tagline: {
    opacity: 0.7,
    marginBottom: 32,
  },
  cardList: {
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  cardPressed: {
    opacity: 0.6,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: '600',
  },
  cardSubtitle: {
    opacity: 0.6,
  },
});
