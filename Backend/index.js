// File BACKEND_index.js

const express = require('express');
const cors = require('cors');
const clienteRoutes = require('./src/routes/clienteRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/clientes', clienteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
