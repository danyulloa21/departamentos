// app.js

const express = require('express');
const app = express();
const cors = require('cors'); // Importa el middleware CORS
const session = require('express-session'); // Importa otros módulos necesarios
const loginCmd = require('./loginController');
// Configura Express y otros middleware
app.use(express.json()); // Agrega esta línea para analizar JSON en las solicitudes


// Configura CORS
app.use(cors());

// Otras rutas y configuraciones

app.use('/api', loginCmd);

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
