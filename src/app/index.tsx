import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const sections = [
  { title: 'Daily Tasks', desc: 'What needs to get done today', route: '/tasks' },
  { title: 'Projects', desc: 'Active work in progress', route: '/projects' },
  { title: 'Notes', desc: 'Quick thoughts and ideas', route: '/notes' },
  { title: 'AI Assistant', desc: 'Ask VaultOS anything', route: '/assistant' },
];

export default function Dashboard() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>VaultOS</Text>
      <Text style={styles.subheader}>Run your day. Build your future.</Text>

      {sections.map((section) => (
        <Pressable
          key={section.title}
          style={styles.card}
          onPress={() => router.push(section.route as any)}
        >
          <Text style={styles.cardTitle}>{section.title}</Text>
          <Text style={styles.cardDesc}>{section.desc}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1117' },
  content: { padding: 20, paddingTop: 60 },
  header: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  subheader: { fontSize: 14, color: '#8b949e', marginBottom: 24 },
  card: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 4 },
  cardDesc: { fontSize: 13, color: '#8b949e' },
});
