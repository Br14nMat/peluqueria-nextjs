import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getReservations, deleteReservation, getReservationsByClient } from '@/services/reservation.service';
import { ReservationDTO } from '@/services/reservation.service';
import { createFeedback, deleteFeedback, Feedback, FeedbackDTO, getFeedbackByHairdresser } from '@/services/feedback.service';

interface FeedbacksState {
  list: Feedback[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FeedbacksState = {
  list: [],
  status: 'idle',
  error: null,
};


export const fetchFeedbackByHairdresser = createAsyncThunk<
  Feedback[], 
  { hairdresserId: string; token: string | undefined }
>(
  'feedback/fetchFeedbackByHairdresser',
  async ({ hairdresserId, token }) => {
    if (!token) throw new Error('Token is required');
    const feedbacks = await getFeedbackByHairdresser(hairdresserId, token);
    return feedbacks;
  }
);



export const removeFeedback = createAsyncThunk<string, { id: string; token?: string }>(
  'feedback/removeFeedback',
  async ({ id, token }) => {

    await deleteFeedback(id, token);
    return id;
  }
);


export const addFeedback = createAsyncThunk<void, { f: FeedbackDTO; token?: string }>(
    'feedback/createFeedback',
    async ({ f, token }, { dispatch }) => {

      await createFeedback(f, token);
  
      dispatch(fetchFeedbackByHairdresser({ hairdresserId: f.hairdresserId, token: token }));
    }
);
  

const feedbacksSlice = createSlice({
  name: 'feedbacks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbackByHairdresser.fulfilled, (state, action: PayloadAction<Feedback[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(removeFeedback.fulfilled, (state, action: PayloadAction<string>) => {
        state.list = state.list.filter(feedback => feedback.id !== action.payload);
      })
    
     
  },
});

export default feedbacksSlice.reducer;
