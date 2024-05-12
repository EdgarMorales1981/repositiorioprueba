'use strict';
import Express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import multer from "multer";
import {
  agregarUsuario,
  obtenerUsuarios,
  obtenerUsuariosId,
  enviarPost,
  obtenerPosts,
    obtenerPostsTitulo,
  obtenerUsuariosPorNombre
} from './controladores.js';
const app = Express();


app.use(Express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(Express.urlencoded({ extended: true }));
const upload = multer({ dest: "uploads/" });
// Configuración de MongoDB
const url = "mongodb+srv://proyectosfirebase090:colpodifulmine@bandejadedatos.rwqqrga.mongodb.net/?retryWrites=true&w=majority&appName=bandejadedatos";

mongoose.connect(url)
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));


app.post('/login', (req, res) => {
  return res.send({ message: 'Hola mundo' });
});

app.post('/register', upload.single('imageUrl'),agregarUsuario);

app.get('/profile',obtenerUsuarios)

app.get('/profile/:id', obtenerUsuariosId)

app.get('/usuariosnombre/:nombre', obtenerUsuariosPorNombre)

app.put('/profile/:id', (req, res) => {
  return res.send({ message: 'Hola mundo profile edicion' });
});

app.post('/post', upload.single('imagen'), enviarPost);

app.get('/post',obtenerPosts)

app.get('/post/:titulo', obtenerPostsTitulo)


app.listen(5000, () => {
  console.log('Servidor corriendo en el puerto 5000');
});


export default app;
