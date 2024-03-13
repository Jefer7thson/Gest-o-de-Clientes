// File FRONTEND_ClientesListaComRota.js

import React, { useState } from 'react';
import axios from 'axios';

const MostrarRotaModal = ({ mostrar, rota, fecharModal }) => {
  if (!mostrar) return null;

  return (
    <div className="modal">
      <h2>Ordem de Visitação dos Clientes</h2>
      <ul>
        {Array.isArray(rota) && rota.map((cliente, index) => (
          <li key={index}>{cliente.nome} - ({cliente.coordenada_x}, {cliente.coordenada_y})</li>
        ))}
      </ul>
      <button onClick={fecharModal}>Fechar</button>
    </div>
  );
};

const ListaClientes = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [rota, setRota] = useState([]);

  const buscarRota = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/clientes/calcular-rota');
      setRota(response.data);
      setMostrarModal(true);
    } catch (error) {
      console.error('Erro ao buscar a rota', error);
    }
  };

  return (
    <div>
      <button onClick={buscarRota}>Calcular Rota</button>
      <MostrarRotaModal mostrar={mostrarModal} rota={rota} fecharModal={() => setMostrarModal(false)} />
    </div>
  );
};
export default ListaClientes;
