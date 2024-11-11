import { getAllUsers, IUser } from '@/services/user.service';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface UsersState {
  list: IUser[];
  hairdressers: IUser[];
  clients: IUser[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedClient: IUser | null;
  selectedHairdresser: IUser | null;
}

const initialState: UsersState = {
  list: [],
  hairdressers: [],
  clients: [],
  status: 'idle',
  error: null,
  selectedClient: null,
  selectedHairdresser: null
};

export const fetchAllUsers = createAsyncThunk<IUser[]>(
  'users/fetchAllUsers',
  async () => {
    const users = await getAllUsers();
    console.log(users);
    return users;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedClient(state, action: PayloadAction<IUser | null>) {
      state.selectedClient = action.payload;
    },
    setSelectedHairdresser(state, action: PayloadAction<IUser | null>) {
      state.selectedHairdresser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
        state.hairdressers = action.payload.filter(user => user.roles.includes('hairdresser'));
        state.clients = action.payload.filter(user => user.roles.includes('client'));
      });
  },
});

export const getHaidressers = (state: { users: UsersState }) => state.users.hairdressers;
export const getClients = (state: { users: UsersState }) => state.users.clients;

export const { setSelectedClient, setSelectedHairdresser } = userSlice.actions;


export default userSlice.reducer;
