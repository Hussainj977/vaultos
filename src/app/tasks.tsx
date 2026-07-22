import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Task = { id: string; text: string; done: boolean };

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Review VaultOS design mockups', done: false },
    { id: '2', text: 'Set up GitHub Codespace', done: true },
    { id: '3', text: 'Build dashboard components', done: false },
  ]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: input.trim(), done: false }]);
    setInput('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Daily Tasks</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor="#8b949e"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTask}
        />
        <Pressable style={styles.addBtn} onPress={addTask}>
          <Text style={styles.addBtnText}>+</Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <Pressable onPress={() => toggleTask(item.id)} style={styles.checkbox}>
              {item.done && <Text style={styles.checkmark}>✓</Text>}
            </Pressable>
            <Text style={[styles.taskText, item.done && styles.taskDone]}>
              {item.text}
            </Text>
            <Pressable onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteBtn}>×</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1117', padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  inputRow: { flexDirection: 'row', marginBottom: 20 },
  input: {
    flex: 1,
    backgroundColor: '#161b22',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#30363d',
    padding: 12,
    color: '#fff',
    marginRight: 8,
  },
  addBtn: {
    backgroundColor: '#1f6feb',
    borderRadius: 8,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161b22',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#58a6ff',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: { color: '#58a6ff', fontWeight: 'bold' },
  taskText: { color: '#fff', flex: 1, fontSize: 15 },
  taskDone: { color: '#8b949e', textDecorationLine: 'line-through' },
  deleteBtn: { color: '#8b949e', fontSize: 20, paddingLeft: 10 },
});
