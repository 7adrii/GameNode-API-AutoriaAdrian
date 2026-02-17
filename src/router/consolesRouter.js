// Este archivo contiene la lista de todas las operaciones definidas en el /controller/consolesController.js

const express = require('express');
const router = express.Router();

const { getAllConsoles, getConsoleById, postConsole, putConsole } = require('../controller/consolesController.js');
const { validateConsoleId, validateAddConsole, validateUpdateConsole } = require('../validators/consoles.js');

// Rutas

router.get('/', getAllConsoles);
router.get('/:id', validateConsoleId, getConsoleById);
router.post('/', validateAddConsole, postConsole);
router.put('/:id', validateUpdateConsole, putConsole);

module.exports = router;