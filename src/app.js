const express = require('express');

const app = express();
app.use(express.json());

// Zona de rutas por definir.

// Ruta para manejar endpoints no encontrados.
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    title: 'not-found',
    message: 'Endpoint no encontrado'
  });
});

// Manejador de errores global, para capturar errores no controlados.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    code: 500,
    title: 'internal-error',
    message: 'Error interno del servidor'
  });
});

const { config } = require('./configuration/config');
const PORT = config.service.port || 8080;
app.listen(PORT, () => {
    console.log(`Backend iniciado en el puerto: ${PORT}`);
});