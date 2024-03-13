// File FRONTEND_ClientDetails.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Container, Card, CardContent, CardActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importando o ícone de volta

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchClienteDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/clientes/${id}`);
        setCliente(response.data);
      } catch (error) {
        console.error('Erro ao buscar os detalhes do cliente:', error);
        setErro('Erro ao buscar os detalhes do cliente');
      }
    };

    fetchClienteDetails();
  }, [id]);

  const removerCliente = async () => {
    if (window.confirm("Tem certeza que deseja remover este cliente?")) {
      try {
        await axios.delete(`http://localhost:3000/api/clientes/${id}`);
        navigate('/'); // Navega de volta à lista de clientes após a remoção
      } catch (error) {
        console.error("Erro ao remover o cliente", error);
        setErro('Erro ao remover o cliente.');
      }
    }
  };

  const editarCliente = () => {
    navigate(`/clientes/editar/${id}`);
  };

  const voltar = () => {
    navigate('/'); // Alterado para a rota de cadastro de clientes/lista de clientes
  };

  if (erro) {
    return (
      <Container>
        <Typography color="error">{erro}</Typography>
      </Container>
    );
  }

  if (!cliente) {
    return (
      <Container>
        <Typography>Carregando...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">Detalhes do Cliente</Typography>
          <Typography color="textSecondary">Nome: {cliente.nome}</Typography>
          <Typography color="textSecondary">Email: {cliente.email}</Typography>
          <Typography color="textSecondary">Telefone: {cliente.telefone}</Typography>
          <Typography color="textSecondary">Coordenada X: {cliente.coordenada_x}</Typography>
          <Typography color="textSecondary">Coordenada Y: {cliente.coordenada_y}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={voltar} startIcon={<ArrowBackIcon />}>Voltar</Button>
          <Button size="small" onClick={editarCliente}>Editar</Button>
          <Button size="small" color="error" onClick={removerCliente}>Remover</Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default ClientDetails;
