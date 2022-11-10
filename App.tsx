import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Homepage } from './src/pages/Homepage/Homepage';
import { UserSessionRestaurants } from './src/pages/UserSessionRestaurants/RestaurantSession';

export default function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <UserSessionRestaurants sessionId='5a35f0bd-a829-4de9-88fd-6b32c7e373f2' />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
