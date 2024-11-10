import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createService, deleteService, getServices, Service, updateService } from '@/services/services.service';

interface ServicesState {
  list: Service[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedService: Service | null;
}

const initialState: ServicesState = {
  list: [],
  status: 'idle',
  error: null,
  selectedService: null,
};


export const fetchServices = createAsyncThunk<
  Service[], 
  { token: string | undefined }
>(
  'service/fetchServices',
  async ({ token }) => {
    if (!token) throw new Error('Token is required');
    const services = await getServices(token);
    return services;
  }
);


export const addService = createAsyncThunk<Service, { s: Service; token?: string }>(
  'service/createService',
  async ({ s, token }) => {
    const newService = await createService(s, token);
    return newService;
  }
);


export const updateServiceAsync = createAsyncThunk<
  Service,
  { id: string; updatedData: Partial<Omit<Service, 'id'>>; token?: string }
>(
  'service/updateService',
  async ({ id, updatedData, token }) => {
    const updatedService = await updateService(id, updatedData, token);
    return updatedService;
  }
);


export const removeService = createAsyncThunk<string, { id: string; token?: string }>(
  'service/removeService',
  async ({ id, token }) => {
    await deleteService(id, token);
    return id;
  }
);
  

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setSelectedService(state, action: PayloadAction<Service | null>) {
      state.selectedService = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(addService.fulfilled, (state, action: PayloadAction<Service>) => {
        state.list.push(action.payload);
      })
      .addCase(removeService.fulfilled, (state, action: PayloadAction<string>) => {
        state.list = state.list.filter(service => service.id !== action.payload);
      })
      .addCase(updateServiceAsync.fulfilled, (state, action: PayloadAction<Service>) => {
        const index = state.list.findIndex(service => service.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
  },
});

export const { setSelectedService } = servicesSlice.actions;
export default servicesSlice.reducer;
