import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { UserSessionRestaurants } from './src/pages/UserSessionRestaurants/restaurants';
import { UserSessionWaitLobby } from './src/pages/UserSessionWaitLobby/waitlobby';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <UserSessionWaitLobby/>
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
