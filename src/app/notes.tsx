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

const COLORS = ['#6C63FF', '#00D4FF', '#FFB300', '#00E676', '#FF5252', '#FF6B9D'];

export default function NotesScreen() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([
    { id: '1', title: 'VaultOS Architecture', content: 'Design system with AI agents...', color: COLORS[0], date: 'Today' },
    { id: '2', title: 'Meeting Notes', content: 'Discuss AI integration with team...', color: COLORS[1], date: 'Yesterday' },
    { id: '3', title: 'Project Ideas', content: 'Build a task automation engine...', color: COLORS[2], date: '2 days ago' },
  ]);

  const addNote = () => {
    if (note.trim()) {
      setNotes([...notes, { 
        id: Date.now().toString(), 
        title: 'New Note', 
        content: note.trim(), 
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        date: 'Just now'
      }]);
      setNote('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notes</Text>
        <Text style={styles.subtitle}>Capture your thoughts</Text>
      </View>

      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.noteCard, { borderLeftColor: item.color, borderLeftWidth: 4 }]}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteContent} numberOfLines={2}>{item.content}</Text>
            <Text style={styles.noteDate}>{item.date}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Write a quick note..."
          placeholderTextColor={Theme.textMuted}
          value={note}
          onChangeText={setNote}
          returnKeyType="done"          // ✅ Enter key triggers addNote
          onSubmitEditing={addNote}     // ✅ Called when Enter is pressed
          multiline={false}             // Single-line for quick notes
        />
        <TouchableOpacity style={styles.addBtn} onPress={addNote}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.background, paddingHorizontal: 20, paddingTop: 20 },
  header: { marginBottom: 24 },
  title: { fontSize: 32, fontWeight: '700', color: Theme.text, letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: Theme.textSecondary, marginTop: 2 },
  listContent: { paddingBottom: 12 },
  noteCard: { 
    backgroundColor: Theme.surface, 
    borderRadius: 16, 
    padding: 18, 
    marginBottom: 12, 
    borderWidth: 1,
    borderColor: Theme.border,
  },
  noteTitle: { fontSize: 16, fontWeight: '600', color: Theme.text, marginBottom: 6 },
  noteContent: { fontSize: 14, color: Theme.textSecondary, lineHeight: 20 },
  noteDate: { fontSize: 11, color: Theme.textMuted, marginTop: 10, textAlign: 'right' },
  inputRow: { flexDirection: 'row', gap: 12, paddingVertical: 12, backgroundColor: Theme.background },
  input: { 
    flex: 1, 
    backgroundColor: Theme.surface, 
    borderRadius: 16, 
    padding: 16, 
    color: Theme.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Theme.border,
  },
  addBtn: { 
    backgroundColor: Theme.primary, 
    borderRadius: 16, 
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});