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
        <UserSessionRestaurants sessionId='47c2a523-32cd-4f3a-9c9f-db02098aa2e8' />
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
