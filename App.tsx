import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD
import { UserSessionRestaurants } from './src/pages/UserSessionRestaurants/restaurants';
import { UserSessionWaitLobby } from './src/pages/UserSessionWaitLobby/waitlobby';
=======
import { Homepage } from './src/pages/Homepage/Homepage';
import { UserSessionRestaurants } from './src/pages/UserSessionRestaurants/RestaurantSession';
>>>>>>> initialized state machine

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
<<<<<<< HEAD
      <UserSessionWaitLobby/>
=======
      <Homepage />
>>>>>>> initialized state machine
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
