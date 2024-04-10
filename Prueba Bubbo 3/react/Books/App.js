/*import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookList from './screens/BookList';
import BookDetail from './screens/BookDetail';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BookList" component={BookList} options={{ title: 'Lista de Libros' }} />
        <Stack.Screen name="BookDetail" component={BookDetail} options={{ title: 'Detalle del Libro' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
-------------------------------------------------
import React from 'react';
import {View, Text} from 'react-native';

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hello, World!</Text>
    </View>
  );
};

export default App;
*/
import React from 'react';
import AppNavigation from './AppNavigation';

const App = () => {
  return <AppNavigation />;
};

export default App;