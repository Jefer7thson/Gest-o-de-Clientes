// File BACKEND_clienteRoutes.js

const express = require('express');
const { listarClientes, adicionarCliente, buscarClientePorId, calcularRota, atualizarCliente, removerCliente } = require('../controllers/clienteController');
const router = express.Router();

router.get('/calcular-rota', calcularRota);

router.get('/', listarClientes);
router.post('/', adicionarCliente);
router.get('/:id', buscarClientePorId);
router.put('/:id', atualizarCliente);
router.delete('/:id', removerCliente);



module.exports = router;

