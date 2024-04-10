import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddBookScreen = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const addBook = async () => {
    try {
      const response = await fetch('http://192.168.1.65:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author }),
      });
      if (!response.ok) {
        throw new Error('Error adding book');
      }
      // Clear the form
      setTitle('');
      setAuthor('');
      alert('Book added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
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
      <Button title="Add Book" onPress={addBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
  },
});

export default AddBookScreen;