<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import React from 'react';
=======
>>>>>>> added state skeletons
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserSessionRestaurants } from './src/pages/UserSessionRestaurants/RestaurantSession';

export default function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
<<<<<<< HEAD
        <UserSessionRestaurants />
=======
        <UserSessionRestaurants sessionId={''} />
>>>>>>> added state skeletons
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
