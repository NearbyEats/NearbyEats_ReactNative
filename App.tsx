import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { UserSessionRestaurants } from './src/pages/UserSessionRestaurants/restaurants';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <UserSessionRestaurants />
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
