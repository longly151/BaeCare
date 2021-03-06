import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
    <ThemeProvider useDark={colorScheme === 'dark'}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </ThemeProvider>
    );
  }
}
