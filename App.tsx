<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import React from 'react';
=======
>>>>>>> added state skeletons
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CurrentlyRatingScreen } from './src/pages/UserSessionRestaurants/components/CurrentlyRatingScreen';
import { UserSessionRestaurants } from './src/pages/UserSessionRestaurants/RestaurantSession';

export default function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <UserSessionRestaurants />
=======
        <UserSessionRestaurants sessionId={''} />
>>>>>>> added state skeletons
=======
        <UserSessionRestaurants sessionId={'ab7bf3b6-7f61-4fa5-a1dc-8a8bfb03406a'} />
>>>>>>> erik lungulescu
=======
        {/* <UserSessionRestaurants sessionId={'ab7bf3b6-7f61-4fa5-a1dc-8a8bfb03406a'} /> */}
        <CurrentlyRatingScreen />
>>>>>>> base animation
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
