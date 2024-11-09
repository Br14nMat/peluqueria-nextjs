import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getReservations, deleteReservation, getReservationsByClient } from '@/services/reservation.service';
import { ReservationDTO } from '@/services/reservation.service';

interface ReservationsState {
  list: ReservationDTO[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ReservationsState = {
  list: [],
  status: 'idle',
  error: null,
};

export const fetchReservations = createAsyncThunk<ReservationDTO[], string | undefined>(
  'reservations/fetchReservations',
  async (token) => {
    return await getReservations(token);
  }
)

export const fetchReservationsByClient = createAsyncThunk<
  ReservationDTO[], 
  { clientId: string; token: string | undefined }
>(
  'reservations/fetchReservationsByClient',
  async ({ clientId, token }) => {
    if (!token) throw new Error('Token is required');
    const reservations = await getReservationsByClient(clientId, token);
    console.log(reservations);
    return reservations;
  }
);



export const removeReservation = createAsyncThunk<string, { id: string; token?: string }>(
  'reservations/removeReservation',
  async ({ id, token }) => {

    await deleteReservation(id, token);
    return id;
  }
);

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservationsByClient.fulfilled, (state, action: PayloadAction<ReservationDTO[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(removeReservation.fulfilled, (state, action: PayloadAction<string>) => {
        state.list = state.list.filter(reservation => reservation.id !== action.payload);
      });
     
  },
});

export default reservationsSlice.reducer;
