import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const BooksScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://192.168.1.65:3000/books');
      const data = await response.json();
      setBooks(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // useEffect normal para buscar libros cuando el componente se monta
  useEffect(() => {
    fetchBooks();
  }, []);

  // useFocusEffect para buscar libros cada vez que la pantalla gana foco
  useFocusEffect(
    React.useCallback(() => {
      fetchBooks();
    }, [])
  );

  const deleteBook = async (id) => {
    try {
      await fetch(`http://192.168.1.65:3000/books/${id}`, { method: 'DELETE' });
      fetchBooks(); // Recargar la lista de libros después de borrar
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const confirmDeleteBook = (id) => {
    Alert.alert(
      'Delete Book',
      'Are you sure you want to delete this book?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => deleteBook(id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={({ item }) => (
          <View >
            <Text style={styles.itemText}>
              <Text style={{ textDecorationLine: 'underline' }}>Título:</Text> {item.title} {'\n'}
              <Text style={{ textDecorationLine: 'underline' }}>Autor:</Text> {item.author}
            </Text>
            <View style={styles.buttonsContainer}>
              <Button title="Edit" onPress={() => navigation.navigate('EditBookScreen', { bookId: item.id })} />
              <Button title="Delete" color="red" onPress={() => confirmDeleteBook(item.id)} />
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    flex: 1,
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
});

export default BooksScreen;