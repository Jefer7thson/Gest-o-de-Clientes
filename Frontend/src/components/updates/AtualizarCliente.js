import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const AtualizarCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    coordenada_x: '',
    coordenada_y: ''
  });
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchClienteDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/clientes/${id}`);
        setFormData({
          nome: response.data.nome,
          email: response.data.email,
          telefone: response.data.telefone,
          coordenada_x: response.data.coordenada_x,
          coordenada_y: response.data.coordenada_y
        });
      } catch (error) {
        console.error('Erro ao buscar os detalhes do cliente:', error);
        setErro('Erro ao buscar os detalhes do cliente');
      }
    };
    fetchClienteDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/clientes/${id}`, formData);
      navigate(`/clientes/${id}`);
    } catch (error) {
      console.error('Erro ao atualizar o cliente:', error);
      setErro('Erro ao atualizar o cliente.');
    }
  };

  const handleBack = () => {
    navigate(-1); // Isso levará o usuário para a última página visitada
  };

  if (erro) {
    return <Container><Typography color="error">{erro}</Typography></Container>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 4 }}>Atualizar Cliente</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          margin="normal"
          fullWidth
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          margin="normal"
          fullWidth
          label="Telefone"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          required
        />
        <TextField
          margin="normal"
          fullWidth
          label="Coordenada X"
          name="coordenada_x"
          type="number"
          value={formData.coordenada_x}
          onChange={handleChange}
          required
        />
        <TextField
          margin="normal"
          fullWidth
          label="Coordenada Y"
          name="coordenada_y"
          type="number"
          value={formData.coordenada_y}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          Salvar Alterações
        </Button>
        <Button variant="contained" color="secondary" sx={{ mt: 3, mb: 2 }} onClick={handleBack}>
          Voltar
        </Button>
      </Box>
    </Container>
  );
};

export default AtualizarCliente;
