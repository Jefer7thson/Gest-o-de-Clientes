// File FRONTEND_MostrarRotaModal.js

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { Link } from 'react-router-dom';

const MostrarRotaModal = ({ mostrar, rota, fecharModal }) => {
  return (
    <Dialog open={mostrar} onClose={fecharModal} scroll="paper" maxWidth="sm" fullWidth>
      <DialogTitle>Ordem de Visitação dos Clientes</DialogTitle>
      <DialogContent dividers>
        <List>
          {rota.map((cliente, index) => (
            <ListItem key={index} divider>
              <ListItemText primary={`${index + 1}. ${cliente.nome}`} secondary={`Coordenadas: (${cliente.coordenada_x}, ${cliente.coordenada_y})`} />
              <ListItemSecondaryAction>
                <Button
                  component={Link}
                  to={`/clientes/${cliente.id}`} 
                  color="primary"
                  variant="outlined"
                  size="small"
                >
                  Ver Detalhes
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={fecharModal}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MostrarRotaModal;
