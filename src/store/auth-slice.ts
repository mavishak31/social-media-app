import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser } from '@/types/auth';

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isReady: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isReady: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Saat pertama kali buka website, token diambil dari localStorage
    hydrateSession(
      state,
      action: PayloadAction<{ token: string | null; user?: AuthUser | null }>
    ) {
      state.token = action.payload.token;
      state.user = action.payload.user ?? null;
      state.isReady = true;
    },
    // Setelah login berhasil
    setSession(
      state,
      action: PayloadAction<{ token: string; user?: AuthUser | null }>
    ) {
      state.token = action.payload.token;
      state.user = action.payload.user ?? null;
      state.isReady = true;
    },
    // Untuk logout
    clearSession(state) {
      state.token = null;
      state.user = null;
      state.isReady = true;
    },
  },
});

export const { hydrateSession, setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;
