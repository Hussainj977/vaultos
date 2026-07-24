import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

export default function TasksScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Finalize VaultOS architecture', done: true },
    { id: '2', title: 'Design AI assistant flow', done: false },
    { id: '3', title: 'Setup backend API', done: false },
  ]);

  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const pending = total - completed;
  const progressPercent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: task.trim(), done: false }]);
      setTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Tasks</Text>
        <Text style={styles.subtitle}>Stay on track</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={[styles.statCard, { borderBottomColor: Theme.success }]}>
          <Text style={[styles.statNumber, { color: Theme.success }]}>{completed}</Text>
          <Text style={styles.statLabel}>Done</Text>
        </View>
        <View style={[styles.statCard, { borderBottomColor: Theme.primary }]}>
          <Text style={[styles.statNumber, { color: Theme.primary }]}>{pending}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { flex: progressPercent }]} />
          <View style={[styles.progressRemaining, { flex: 100 - progressPercent }]} />
        </View>
        <Text style={styles.progressText}>{progressPercent}% Complete</Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.taskItem} onPress={() => toggleTask(item.id)} activeOpacity={0.7}>
            <Ionicons
              name={item.done ? 'checkmark-circle' : 'ellipse-outline'}
              size={24}
              color={item.done ? Theme.success : Theme.textMuted}
            />
            <Text style={[styles.taskText, item.done && styles.taskDone]}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor={Theme.textMuted}
          value={task}
          onChangeText={setTask}
          returnKeyType="done"
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Theme.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: Theme.textSecondary,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: Theme.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: Theme.secondary,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: Theme.text,
  },
  statLabel: {
    fontSize: 12,
    color: Theme.textSecondary,
    marginTop: 2,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 6,
    backgroundColor: Theme.surface,
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Theme.primary,
    borderRadius: 4,
  },
  progressRemaining: {
    height: '100%',
    backgroundColor: 'transparent',
  },
  progressText: {
    fontSize: 12,
    color: Theme.textSecondary,
    marginTop: 6,
    textAlign: 'right',
  },
  listContent: {
    paddingBottom: 12,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.surface,
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
  },
  taskText: {
    color: Theme.text,
    fontSize: 16,
    marginLeft: 14,
    flex: 1,
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: Theme.textMuted,
  },
  inputRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: Theme.background,
  },
  input: {
    flex: 1,
    backgroundColor: Theme.surface,
    borderRadius: 16,
    padding: 16,
    color: Theme.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Theme.border,
    marginRight: 12,
  },
  addBtn: {
    backgroundColor: Theme.primary,
    borderRadius: 16,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
});