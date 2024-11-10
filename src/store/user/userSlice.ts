import { getAllUsers, IUser } from '@/services/user.service';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface UsersState {
  list: IUser[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  list: [],
  status: 'idle',
  error: null,
};

export const fetchAllUsers = createAsyncThunk<
  IUser[],
  { token?: string }
>(
  'users/fetchAllUsers',
  async ({ token }) => {
    const users = await getAllUsers(token);
    return users;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      });
  },
});

export const getHaidressers = (state: { users: UsersState }) => 
  state.users.list.filter(user => user.roles.includes('haidresser'));

export const getClients = (state: { users: UsersState }) => 
  state.users.list.filter(user => user.roles.includes('client'));

export default userSlice.reducer;
