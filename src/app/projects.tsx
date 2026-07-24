import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const Theme = {
  background: '#0A0A14',
  surface: '#14142A',
  surfaceLight: '#1C1C3A',
  primary: '#6C63FF',
  secondary: '#00D4FF',
  success: '#00E676',
  warning: '#FFB300',
  danger: '#FF5252',
  text: '#FFFFFF',
  textSecondary: '#8888BB',
  textMuted: '#555577',
  border: '#2A2A44',
};

export default function ProjectsScreen() {
  const [projects] = useState([
    { id: '1', title: 'VaultOS Core', tasks: 12, completed: 8, status: 'Active', color: Theme.primary },
    { id: '2', title: 'AI Assistant', tasks: 8, completed: 3, status: 'Active', color: Theme.secondary },
    { id: '3', title: 'Mobile App', tasks: 6, completed: 6, status: 'Completed', color: Theme.success },
    { id: '4', title: 'Backend API', tasks: 10, completed: 4, status: 'On Hold', color: Theme.warning },
  ]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return Theme.success;
      case 'Completed': return Theme.success;
      case 'On Hold': return Theme.warning;
      default: return Theme.textMuted;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Projects</Text>
        <Text style={styles.subtitle}>Track your progress</Text>
      </View>

      <FlatList
        data={projects}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.projectCard}>
            <View style={styles.projectHeader}>
              <View style={[styles.projectColor, { backgroundColor: item.color }]} />
              <Text style={styles.projectTitle}>{item.title}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
              </View>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${(item.completed / item.tasks) * 100}%`, backgroundColor: item.color }]} />
              </View>
              <Text style={styles.progressText}>{item.completed}/{item.tasks} tasks</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.background, paddingHorizontal: 20, paddingTop: 20 },
  header: { marginBottom: 24 },
  title: { fontSize: 32, fontWeight: '700', color: Theme.text, letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: Theme.textSecondary, marginTop: 2 },
  listContent: { paddingBottom: 12 },
  projectCard: { 
    backgroundColor: Theme.surface, 
    borderRadius: 16, 
    padding: 18, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Theme.border,
  },
  projectHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' },
  projectColor: { width: 4, height: 20, borderRadius: 2, marginRight: 12 },
  projectTitle: { fontSize: 16, fontWeight: '600', color: Theme.text, flex: 1 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  statusText: { fontSize: 11, fontWeight: '500' },
  progressContainer: { gap: 8 },
  progressBar: { height: 6, backgroundColor: Theme.background, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  progressText: { fontSize: 12, color: Theme.textSecondary, textAlign: 'right' },
});