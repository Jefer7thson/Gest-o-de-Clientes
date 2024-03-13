import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Alert, Container } from '@mui/material';

function ClienteForm({ onClienteAdded }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [coordenadaX, setCoordenadaX] = useState('');
  const [coordenadaY, setCoordenadaY] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/clientes', {
        nome,
        email,
        telefone,
        coordenada_x: coordenadaX,
        coordenada_y: coordenadaY,
      });
      setNome('');
      setEmail('');
      setTelefone('');
      setCoordenadaX('');
      setCoordenadaY('');
      onClienteAdded(); // Atualiza a lista de clientes no componente pai
      setMensagem('Cliente adicionado com sucesso!'); 
      setTimeout(() => setMensagem(''), 5000); 
    } catch (error) {
      console.error("Houve um erro ao adicionar o cliente:", error);
      setMensagem('Erro ao adicionar cliente.'); 
      setTimeout(() => setMensagem(''), 5000); 
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              required
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              required
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              required
              label="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              required
              label="Coordenada X"
              type="number"
              value={coordenadaX}
              onChange={(e) => setCoordenadaX(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              required
              label="Coordenada Y"
              type="number"
              value={coordenadaY}
              onChange={(e) => setCoordenadaY(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Adicionar Cliente
            </Button>
          </Grid>
        </Grid>
        {mensagem && (
          <Alert severity={mensagem.includes('sucesso') ? 'success' : 'error'} sx={{ mt: 2 }}>
            {mensagem}
          </Alert>
        )}
      </form>
    </Container>
  );
}

export default ClienteForm;
