import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Por ahora, devolvemos datos mock para pruebas
    const mockPeluquero = {
      nombre: "Juan Pérez",
      email: "juan@ejemplo.com",
      foto_perfil: "/profile-placeholder.jpg",
      calificacion: 4.5,
      servicios: [
        { nombre: "Corte de cabello", cantidad: 50 },
        { nombre: "Barba", cantidad: 30 },
        { nombre: "Tinte", cantidad: 20 }
      ]
    };

    return NextResponse.json(mockPeluquero);
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener datos del peluquero' },
      { status: 500 }
    );
  }
} 