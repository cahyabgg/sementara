import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
	isAuthenticated: boolean;
	isAdmin: boolean;
	isLoading: boolean;
	username: string;
	email: string;
}

const initialState = {
	isAuthenticated: false,
	isAdmin: false,
	isLoading: true,
	username: "",
	email: ""
} as AuthState;

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: state => {
			state.isAuthenticated = true;
		},
		setAdmin: state => {
			state.isAdmin = true;
		},
		logout: state => {
			state.isAuthenticated = false;
			state.email = ""
			state.username = ""
			state.isAdmin = false
		},
		finishInitialLoad: state => {
			state.isLoading = false;
		},
		setUsername: (state, action) => {
			state.username = action.payload;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		}

	},
});

export const { setAuth, setAdmin, logout, finishInitialLoad, setUsername, setEmail } = authSlice.actions;
export default authSlice.reducer;
