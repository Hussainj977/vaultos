import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export default function AIScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hi! I'm your VaultOS AI assistant. How can I help you today?", sender: 'ai', timestamp: 'Just now' },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showPausePrompt, setShowPausePrompt] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Debounce: when user stops typing for 1.5s, show "What are you thinking?"
  useEffect(() => {
    if (input.length > 0) {
      // Clear previous timeout
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Hide prompt immediately while typing
      if (showPausePrompt) {
        setShowPausePrompt(false);
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        setShowPausePrompt(true);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      }, 1500);
    } else {
      // Input empty: hide prompt
      if (showPausePrompt) {
        setShowPausePrompt(false);
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [input]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
      timestamp: 'Just now',
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setShowPausePrompt(false);

    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm processing your request. This is a demo response. Connect me to your backend API to make me truly intelligent! 🚀",
        sender: 'ai',
        timestamp: 'Just now',
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="chatbubble-ellipses" size={28} color={Theme.primary} />
        </View>
        <Text style={styles.title}>AI Assistant</Text>
        <Text style={styles.subtitle}>Powered by VaultOS Intelligence</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageRow, item.sender === 'user' ? styles.userRow : styles.aiRow]}>
            <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
              <Text style={[styles.messageText, item.sender === 'user' ? styles.userText : styles.aiText]}>
                {item.text}
              </Text>
              <Text style={styles.messageTime}>{item.timestamp}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      />

      {isTyping && (
        <View style={styles.typingIndicator}>
          <Text style={styles.typingText}>AI is thinking</Text>
          <View style={styles.typingDots}>
            <View style={[styles.dot, styles.dot1]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
          </View>
        </View>
      )}

      <View style={styles.inputContainer}>
        {/* Pause prompt (animated) */}
        {showPausePrompt && (
          <Animated.View style={[styles.pausePrompt, { opacity: fadeAnim }]}>
            <Ionicons name="bulb-outline" size={16} color={Theme.textMuted} />
            <Text style={styles.pauseText}>What are you thinking?</Text>
          </Animated.View>
        )}

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Ask VaultOS anything..."
            placeholderTextColor={Theme.textMuted}
            value={input}
            onChangeText={setInput}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
            multiline={false}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Ionicons name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.background, paddingHorizontal: 20, paddingTop: 20 },
  header: { marginBottom: 24, alignItems: 'center' },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Theme.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Theme.primary,
  },
  title: { fontSize: 28, fontWeight: '700', color: Theme.text, letterSpacing: -0.5 },
  subtitle: { fontSize: 12, color: Theme.textSecondary, marginTop: 2 },
  chatContent: { paddingBottom: 12 },
  messageRow: { marginBottom: 14, flexDirection: 'row' },
  userRow: { justifyContent: 'flex-end' },
  aiRow: { justifyContent: 'flex-start' },
  messageBubble: { maxWidth: '80%', padding: 16, borderRadius: 18, borderWidth: 1 },
  userBubble: {
    backgroundColor: Theme.primary,
    borderColor: Theme.primary,
    borderTopRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: Theme.surface,
    borderColor: Theme.border,
    borderTopLeftRadius: 4,
  },
  messageText: { fontSize: 15, lineHeight: 22 },
  userText: { color: '#fff' },
  aiText: { color: Theme.text },
  messageTime: { fontSize: 10, color: Theme.textMuted, marginTop: 4, textAlign: 'right' },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    gap: 8,
  },
  typingText: { color: Theme.textSecondary, fontSize: 14 },
  typingDots: { flexDirection: 'row', gap: 4 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Theme.primary, opacity: 0.6 },
  dot1: { opacity: 0.4 },
  dot2: { opacity: 0.6 },
  dot3: { opacity: 0.9 },
  inputContainer: {
    paddingVertical: 8,
    backgroundColor: Theme.background,
  },
  pausePrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Theme.surface,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
    gap: 6,
  },
  pauseText: {
    color: Theme.textSecondary,
    fontSize: 13,
    fontStyle: 'italic',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: Theme.surface,
    borderRadius: 20,
    padding: 16,
    color: Theme.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Theme.border,
  },
  sendBtn: {
    backgroundColor: Theme.primary,
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});