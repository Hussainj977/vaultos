import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Welcome – no header */}
      <Stack.Screen name="welcome" options={{ headerShown: false }} />

      {/* Dashboard – back button to Welcome */}
      <Stack.Screen
        name="dashboard"
        options={{
          headerShown: true,
          headerTitle: 'Dashboard',
          headerStyle: {
            backgroundColor: '#0A0A14',
          },
          headerTintColor: '#6C63FF', // Colors the back arrow + title
          headerBackTitle: 'Welcome', // Text on the back button
        }}
      />

      {/* Tabs – back button to Dashboard */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: true,
          headerTitle: 'VaultOS',
          headerStyle: {
            backgroundColor: '#0A0A14',
          },
          headerTintColor: '#6C63FF',
          headerBackTitle: 'Dashboard',
        }}
      />
    </Stack>
  );
}