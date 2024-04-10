import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BooksScreen from './BooksScreen'; 
import AddBookScreen from './AddBookScreen'; 
import EditBookScreen from './EditBookScreen';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ marginBottom: 10 }}>
        <Button
          title="Mostrar Libros"
          onPress={() => navigation.navigate('Books')}
        />
      </View>
      <View>
        <Button
          title="Añadir Libro"
          onPress={() => navigation.navigate('AddBook')}
        />
      </View>
    </View>
  );
}

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Books" component={BooksScreen} />
        <Stack.Screen name="AddBook" component={AddBookScreen} />
        <Stack.Screen name="EditBookScreen" component={EditBookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;