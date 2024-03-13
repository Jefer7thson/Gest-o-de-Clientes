// File FRONTEND_ClienteList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MostrarRotaModal from '../modals/MostrarRotaModal';
import { TextField, Button, Box, List, ListItem, ListItemText, Divider, Container } from '@mui/material';

const ClientList = () => {
  const [filtroNome, setFiltroNome] = useState('');
  const [clientes, setClientes] = useState([]);
  const [rota, setRota] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    fetchClientes('');
  }, []);

  const handleFilterChange = (e) => {
    setFiltroNome(e.target.value);
  };

  const fetchClientes = async (filtro) => {
    try {
      const url = `http://localhost:3000/api/clientes?filtro=${encodeURIComponent(filtro)}`;
      const response = await axios.get(url);
      setClientes(response.data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleSearch = () => {
    fetchClientes(filtroNome);
  };

  const handleClearSearch = () => {
    setFiltroNome('');
    fetchClientes('');
  };

  const calcularRota = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/clientes/calcular-rota');
      if (Array.isArray(response.data)) {
        setRota(response.data);
      } else {
        setRota([]);
      }
      setMostrarModal(true);
    } catch (error) {
      console.error('Erro ao calcular a rota:', error);
      setRota([]);
    }
  };

  return (
    <Container maxWidth="md"> 
      <Box sx={{ padding: 2 }}>
        <TextField
          label="Digite o nome para buscar"
          variant="outlined"
          size="small"
          fullWidth
          value={filtroNome}
          onChange={handleFilterChange}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Buscar
          </Button>
          <Button variant="outlined" onClick={handleClearSearch}>
            Limpar Busca
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" color="secondary" onClick={calcularRota}>
            Calcular Rota de Atendimento
          </Button>
        </Box>

        <List>
          {clientes.map(cliente => (
            <React.Fragment key={cliente.id}>
              <ListItem>
                <ListItemText
                  primary={cliente.nome}
                  secondary={cliente.email}
                />
                <Button component={Link} to={`/clientes/${cliente.id}`} variant="outlined" size="small">
                  Ver Detalhes
                </Button>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>

        <MostrarRotaModal mostrar={mostrarModal} rota={rota} fecharModal={() => setMostrarModal(false)} />
      </Box>
    </Container>
  );
};

export default ClientList;
