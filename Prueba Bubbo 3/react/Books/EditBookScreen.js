import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const EditBookScreen = ({ route, navigation }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const { bookId } = route.params;

  // Cargar la información actual del libro al iniciar la pantalla
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://192.168.1.65:3000/books/${bookId}`);
        const book = await response.json();
        setTitle(book.title);
        setAuthor(book.author);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  // Función para enviar los datos actualizados
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://192.168.1.65:3000/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          author: author,
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong with the update');
      }

      Alert.alert('Book updated', 'The book has been updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Error updating book:', error);
      Alert.alert('Error', 'Failed to update the book');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={styles.input}
      />
      <TextInput
        value={author}
        onChangeText={setAuthor}
        placeholder="Author"
        style={styles.input}
      />
      <Button title="Update Book" onPress={handleUpdate} />
    </View>
  );
};

export default EditBookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});