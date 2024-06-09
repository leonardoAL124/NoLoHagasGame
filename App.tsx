import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { Navigation } from './src/navigator/Navigation';
import { useFonts } from 'expo-font';

export default function App() {

  const [fontsLoaded] = useFonts({
    'Permanent': require('./assets/fonts/PermanentMarkerRegular.ttf'),
  });

  return (
    <NavigationContainer>
      <PaperProvider>
        <Navigation/>
      </PaperProvider>
    </NavigationContainer>
  );
}
