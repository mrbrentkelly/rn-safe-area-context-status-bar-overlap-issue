/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import {Text, useWindowDimensions, View} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App() {
  const orientation = useOrientation();
  const [statusBarHidden, setStatusBarHidden] = useState(false);

  useEffect(() => {
    setStatusBarHidden(orientation === 'landscape');
  }, [orientation]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            statusBarAnimation: 'none',
            statusBarHidden: statusBarHidden,
          }}>
          <Stack.Screen
            name="Screen1"
            component={Screen1}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function Screen1() {
  // Workaround
  /*const {top} = useSafeAreaInsets();
  const [originalTop, setOriginalTop] = useState(top);

  useEffect(() => {
    if (top > 0 && originalTop !== top) {
      setOriginalTop(top);
    }
  }, [originalTop, top]);*/

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{flex: 1 /*marginTop: top === 0 ? originalTop : undefined*/}}>
        <View style={{backgroundColor: 'blue'}}>
          <Text>Header</Text>
        </View>
        <View
          style={{flex: 1, backgroundColor: 'red', justifyContent: 'center'}}>
          <Text>Content</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export type Orientation = 'portrait' | 'landscape';

export function useOrientation(): Orientation {
  const dimensions = useWindowDimensions();
  return useMemo(
    () => (dimensions.height >= dimensions.width ? 'portrait' : 'landscape'),
    [dimensions],
  );
}
