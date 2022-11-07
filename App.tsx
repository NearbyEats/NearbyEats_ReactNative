import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Homepage } from './src/pages/Homepage/Homepage';
import { UserSessionRestaurants } from './src/pages/UserSessionRestaurants/RestaurantSession';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Homepage />
    </SafeAreaView>
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
