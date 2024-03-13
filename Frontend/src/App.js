// File FRONTEND_App.js

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ClienteForm from './components/forms/ClienteForm';
import ClienteList from './components/lists/ClienteList';
import ClientDetails from './components/details/ClientDetails';
import AtualizarCliente from './components/updates/AtualizarCliente';
import ClientesListaComRota from './components/routes/ClientesListaComRota';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';


const AnimatedPaper = styled(Paper)({
  transition: 'box-shadow 0.3s',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0px 0px 30px rgba(0,0,0,0.5)',
  },
});

function App() {
  const [clientes, setClientes] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const fetchClientes = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error("Houve um erro ao buscar os clientes:", error);
      setMensagem('Erro ao buscar clientes.');
      setTimeout(() => setMensagem(''), 5000);
    }
  }, []);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  const handleClienteAdded = useCallback(() => {
    fetchClientes();
  }, [fetchClientes]);

  return (
    <Router>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <AnimatedPaper elevation={3} sx={{ p: 2, maxWidth: 700 }}>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            Sistema de Gerenciamento de Clientes
          </Typography>
        </AnimatedPaper>
      </Box>
      <div className="App">
        {mensagem && <div>{mensagem}</div>}
        <Routes>
          <Route path="/" element={
            <> 
              <ClienteForm onClienteAdded={handleClienteAdded} setMensagem={setMensagem} />
              <ClienteList clientes={clientes} fetchClientes={fetchClientes} />
            </>
          } exact />
          <Route path="/clientes/editar/:id" element={<AtualizarCliente />} />
          <Route path="/clientes/:id" element={<ClientDetails />} />
          <Route path="/clientes" element={<ClientesListaComRota />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
