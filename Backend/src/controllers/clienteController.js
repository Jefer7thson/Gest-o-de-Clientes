// File BACKEND_clienteController.js

const pool = require('../config/dbConfig');

// Função auxiliar para buscar todos os clientes com coordenadas válidas
const buscarClientesComCoordenadas = async () => {
  const query = 'SELECT id, nome, coordenada_x, coordenada_y FROM clientes WHERE coordenada_x IS NOT NULL AND coordenada_y IS NOT NULL';
  const { rows } = await pool.query(query);
  return rows;
};

// Listar clientes, possivelmente com filtro por nome
const listarClientes = async (req, res) => {
  try {
    const { filtro } = req.query; 
    let baseQuery = 'SELECT * FROM clientes';
    let params = [];

    if (filtro) {
      // Adicione os campos de e-mail e telefone na cláusula WHERE para a filtragem
      baseQuery += ` WHERE nome ILIKE $1 OR email ILIKE $1 OR telefone ILIKE $1`;
      params.push(`%${filtro}%`); // Use o mesmo termo de filtro para todas as colunas
    }

    const { rows } = await pool.query(baseQuery, params);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Erro ao listar clientes:', err);
    res.status(500).send(err.message);
  }
};
// Adicionar novo cliente
const adicionarCliente = async (req, res) => {
  const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, email, telefone, coordenada_x, coordenada_y]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Erro ao adicionar cliente:', err);
    res.status(500).send(err.message);
  }
};

// Atualizar cliente
const atualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE clientes SET nome = $1, email = $2, telefone = $3, coordenada_x = $4, coordenada_y = $5 WHERE id = $6 RETURNING *',
      [nome, email, telefone, coordenada_x, coordenada_y, id]
    );
    if (rows.length === 0) {
      return res.status(404).send('Cliente não encontrado');
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar cliente:', err);
    res.status(500).send(err.message);
  }
};

// Remover cliente
const removerCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
    if (rowCount === 0) {
      return res.status(404).send('Cliente não encontrado');
    }
    res.status(200).send('Cliente removido com sucesso');
  } catch (err) {
    console.error('Erro ao remover cliente:', err);
    res.status(500).send(err.message);
  }
};

// Buscar um cliente por ID
const buscarClientePorId = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).send('Cliente não encontrado');
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Erro ao buscar cliente por ID:', err);
    res.status(500).send(err.message);
  }
};

// Calcular rota
const calcularRota = async (req, res) => {
  try {
    const clientes = await buscarClientesComCoordenadas(); 
    if (!clientes || clientes.length === 0) {
      // Se não houver clientes ou o array estiver vazio, retorna uma mensagem apropriada
      return res.status(404).json({ message: "Nenhum cliente com coordenadas para calcular a rota." });
    }
    const rotaCalculada = clientes.sort((a, b) => {
      // Lógica de cálculo da rota
      const distA = Math.sqrt(a.coordenada_x ** 2 + a.coordenada_y ** 2);
      const distB = Math.sqrt(b.coordenada_x ** 2 + b.coordenada_y ** 2);
      return distA - distB;
    });
    res.json(rotaCalculada);
  } catch (error) {
    console.error('Erro ao calcular a rota:', error);
    res.status(500).send("Erro interno do servidor");
  }
};


module.exports = { listarClientes, adicionarCliente, atualizarCliente, removerCliente, buscarClientePorId, calcularRota };
