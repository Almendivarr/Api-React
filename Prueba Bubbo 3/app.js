
// Firestore
const admin = require('firebase-admin');
var serviceAccount = require('clavePrivada.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
// Express
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});


// Muestra todos los libros en la base de datos
app.get('/books', async (req, res) => {
  try {
    const booksRef = db.collection('books');
    const snapshot = await booksRef.get();

    if (snapshot.empty) {
      res.status(404).send('No se encontraron libros.');
      return;
    }

    let books = [];
    snapshot.forEach(doc => {
      books.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(books);
  } catch (error) {
    console.error('Error al obtener los libros:', error);
    res.status(500).send('Error al obtener los libros');
  }
});

// Muestra los datos de un libro 
app.get('/books/:id', async (req, res) => {
  const bookId = req.params.id; 
  try {
    const bookRef = db.collection('books').doc(bookId);
    const doc = await bookRef.get();

    if (!doc.exists) {
      res.status(404).send('Libro no encontrado.');
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    console.error('Error al obtener el libro:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Genera un nuevo libro con los datos obtenidos del req.body
app.post('/books', async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const docRef = await db.collection('books').add(data);
    res.status(201).send({ id: docRef.id, ...data });
  } catch (error) {
    console.error('Error al añadir el libro:', error);
    res.status(500).send('Error al crear el libro');
  }
});

// Modifica un libro existente
app.put('/books/:id', async (req, res) => {
  const bookId = req.params.id; 
  const newBookData = req.body; 

  try {
    const bookRef = db.collection('books').doc(bookId);
    const doc = await bookRef.get();

    if (!doc.exists) {
      res.status(404).send('Libro no encontrado para actualizar.');
    } else {
      await bookRef.update(newBookData);
      res.status(200).send({ id: bookId, ...newBookData });
    }
  } catch (error) {
    console.error('Error al actualizar el libro:', error);
    res.status(500).send('Error interno del servidor al actualizar el libro');
  }
});

// Elimina un libro específico segúin su ID
app.delete('/books/:id', async (req, res) => {
  const bookId = req.params.id; 
  const bookRef = db.collection('books').doc(bookId);
  try {
    const doc = await bookRef.get();
    if (!doc.exists) {
      res.status(404).send('Libro no encontrado.');
      return;
    }
    await bookRef.delete();
    res.status(200).send(`Libro con ID: ${bookId} ha sido eliminado.`);
  } catch (error) {
    console.error('Error al eliminar el libro:', error);
    res.status(500).send('Error interno del servidor');
  }
});


app.get('/inicio', (req, res) => {
  res.render('index.ejs')
});
