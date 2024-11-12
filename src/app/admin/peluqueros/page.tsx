"use client";

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchAllUsers, getHaidressers, setSelectedHairdresser } from '@/store/user/userSlice';
import { useRouter } from "next/navigation";
import { IUser } from '@/services/user.service';


const HairdressersTable = () => {
  const hairdressers = useAppSelector(getHaidressers);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const filteredHairdressers = search
    ? hairdressers.filter(hairdresser =>
        hairdresser.name.toLowerCase().includes(search.toLowerCase())
      )
    : hairdressers;

  const totalPages = Math.ceil(filteredHairdressers.length / itemsPerPage);
  const paginatedHairdressers = filteredHairdressers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  useEffect(() => {
    dispatch(fetchAllUsers());
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages]);

  const handleReseñas = (h: IUser) => {
    dispatch(setSelectedHairdresser(h))
    router.push('/admin/comentarios-peluquero')
  }

  return (
    <div className="p-4">
      <h2 className="text-azulOscuro text-xl font-semibold mb-4">Peluqueros</h2>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-azulOscuro border border-azulOscuro p-2 rounded mb-4 w-full"
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
          {paginatedHairdressers.map(hairdresser => (
            <tr key={hairdresser.id}>
              <td className="border p-2">{hairdresser.name}</td>
              <td className="border p-2">{hairdresser.email}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleReseñas(hairdresser)}
                  className="bg-rosado text-white p-2 rounded mr-2"
                >
                  Ver Reseñas
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
          className="bg-azulOscuro text-white p-2 rounded"
        >
          Anterior
        </button>
        <span className='text-azulOscuro'>Página {currentPage} de {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-azulOscuro text-white p-2 rounded"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default HairdressersTable;
