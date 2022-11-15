import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Homepage } from './src/pages/Homepage/Homepage';
import { RestaurantSessionJoinScreen } from './src/pages/PreSession/RestaurantSessionJoinScreen';
import { UserSessionRestaurants } from './src/pages/UserSessionRestaurants/RestaurantSession';

export type RootStackParamList = {
  Home: undefined
  CreateSession: undefined
  Session: { sessionId: string }
}

const Stack = createNativeStackNavigator()

export default function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
              <Stack.Screen name="Homepage" component={Homepage} />
              <Stack.Screen name="CreateSession" component={RestaurantSessionJoinScreen} />
              <Stack.Screen name="Session" component={UserSessionRestaurants}/>
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

