import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createService, getServices, Service } from '@/services/services.service';

interface ServicesState {
  list: Service[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ServicesState = {
  list: [],
  status: 'idle',
  error: null,
};


export const fetchServices = createAsyncThunk<
  Service[], 
  { token: string | undefined }
>(
  'service/fetchServices',
  async ({ token }) => {
    if (!token) throw new Error('Token is required');
    const feedbacks = await getServices(token);
    return feedbacks;
  }
);


export const addFeedback = createAsyncThunk<void, { s: Service; token?: string }>(
    'feedback/createFeedback',
    async ({ s, token }, { dispatch }) => {

      await createService(s, token);
  
      dispatch(fetchServices({token: token }));
    }
);
  

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
  },
});

export default servicesSlice.reducer;
