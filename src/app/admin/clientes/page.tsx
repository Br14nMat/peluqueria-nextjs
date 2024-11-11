"use client";

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchAllUsers, getClients, setSelectedClient } from '@/store/user/userSlice';
import { useRouter } from "next/navigation";
import { IUser } from '@/services/user.service';


const ClientsTable = () => {
  const clients = useAppSelector(getClients);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  const filteredClients = search
    ? clients.filter(client =>
        client.name.toLowerCase().includes(search.toLowerCase())
      )
    : clients;

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
    console.log(clients)
  }, [totalPages]);


  const handleReservas = (c : IUser) => {
    dispatch(setSelectedClient(c))
    router.push('/admin/reservas-cliente')
  }

  return (
    <div className="p-4">
      <h2 className="text-azulOscuro text-xl font-semibold mb-4">Clientes</h2>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-azulOscuro border p-2 rounded mb-4 w-full border-azulOscuro"
      />
      <table className="text-azulOscuro w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedClients.map(client => (
            <tr key={client.id}>
              <td className="border p-2">{client.name}</td>
              <td className="border p-2">{client.email}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleReservas(client)}
                  className="bg-rosado text-white p-2 rounded"
                >
                  Ver Reservas
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="bg-rosadoOscuro text-white p-2 rounded"
        >
          Anterior
        </button>
        <span className='text-azulOscuro'>Página {currentPage} de {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-rosadoOscuro text-white p-2 rounded"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ClientsTable;
