import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Theme = {
  background: '#0A0A14',
  surface: '#14142A',
  primary: '#6C63FF',
  secondary: '#00D4FF',
  text: '#FFFFFF',
  textSecondary: '#8888BB',
  textMuted: '#555577',
  border: '#2A2A44',
};

const { width, height } = Dimensions.get('window');

const principles = [
  { icon: 'apps-outline', text: 'One app instead of dozens' },
  { icon: 'brain-outline', text: 'AI is a partner, not just a chatbot' },
  { icon: 'save-outline', text: 'Knowledge never gets lost' },
  { icon: 'flag-outline', text: 'Every goal becomes an executable plan' },
  { icon: 'shield-checkmark-outline', text: 'Privacy and user ownership come first' },
];

export default function FounderWelcome() {
  const [showFounder, setShowFounder] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleTitlePress = () => {
    setShowFounder(!showFounder);
    Animated.spring(rotateAnim, {
      toValue: showFounder ? 0 : 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1.1, friction: 3, tension: 40, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }),
    ]).start();
  };

  const handleEnter = () => {
    router.replace('/dashboard');
  };

  const rotateY = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const rotateX = rotateAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '90deg', '0deg'],
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={handleTitlePress} activeOpacity={0.8}>
        <View style={styles.header}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <View style={styles.iconContainer}>
              <Ionicons name="cube-outline" size={48} color={Theme.primary} />
            </View>
          </Animated.View>
          <Animated.View style={{ transform: [{ rotateY }, { rotateX }] }}>
            <Text style={styles.title}>VaultOS</Text>
          </Animated.View>
          <Text style={styles.badge}>v1.0 • Tap to reveal founder</Text>
        </View>
      </TouchableOpacity>

      {showFounder && (
        <Animated.View
          style={[
            styles.founderCard,
            { transform: [{ rotateY }, { rotateX }, { scale: scaleAnim }] },
          ]}
        >
          <Text style={styles.founderName}>Hussain Jahanzaib</Text>
          <Text style={styles.founderTitle}>Founder & Creator</Text>
          <View style={styles.principlesDivider} />
          {principles.map((item, index) => (
            <View key={index} style={[styles.principleRow, index === principles.length - 1 && styles.principleRowLast]}>
              <Ionicons name={item.icon as any} size={18} color={Theme.secondary} />
              <Text style={styles.principleText}>{item.text}</Text>
            </View>
          ))}
        </Animated.View>
      )}

      <TouchableOpacity style={styles.enterBtn} onPress={handleEnter} activeOpacity={0.8}>
        <LinearGradient
          colors={[Theme.primary, Theme.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.btnGradient}
        >
          <Text style={styles.btnText}>Enter VaultOS</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.footer}>Built with 🧠 • Your productivity OS</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Theme.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Theme.primary + '40',
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Theme.text,
    letterSpacing: 2,
  },
  badge: {
    fontSize: 11,
    color: Theme.textMuted,
    marginTop: 4,
  },
  founderCard: {
    backgroundColor: Theme.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Theme.primary + '40',
    width: '100%',
    alignItems: 'center',
  },
  founderName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Theme.text,
    marginBottom: 2,
  },
  founderTitle: {
    fontSize: 16,
    color: Theme.secondary,
    fontWeight: '500',
    marginBottom: 14,
  },
  principlesDivider: {
    width: '100%',
    height: 1,
    backgroundColor: Theme.border,
    marginBottom: 14,
  },
  principleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Theme.border + '30',
    width: '100%',
  },
  principleRowLast: {
    borderBottomWidth: 0,
  },
  principleText: {
    fontSize: 14,
    color: Theme.text,
    marginLeft: 12,
    flex: 1,
  },
  enterBtn: {
    width: '100%',
    maxWidth: 280,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: Theme.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  btnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    gap: 12,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  footer: {
    fontSize: 12,
    color: Theme.textMuted,
    letterSpacing: 1,
  },
});