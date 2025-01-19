import {GlobalError, LoginMutation, RegisterMutation, RegisterResult, User, ValidationError} from "../../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import axiosAPI from "../../axiosAPI.ts";
import {isAxiosError} from "axios";

interface UsersState{
    user: User | null;
    isLoadingRegister: boolean;
    isErrorRegister: ValidationError | null;
    loginLoading: boolean;
    loginError: GlobalError | null;
}

const initialState: UsersState = {
    user: null,
    isLoadingRegister: false,
    isErrorRegister: null,
    loginLoading: false,
    loginError: null,
};

export const selectUser = (state: RootState) => state.users.user;
export const selectLoadingRegister =(state: RootState) => state.users.isLoadingRegister;
export const selectErrorRegister =(state: RootState) => state.users.isErrorRegister;

export const register = createAsyncThunk<
    RegisterResult,
    RegisterMutation,
    { rejectValue: ValidationError }
>(
    'users/register',
    async (registerMutation, { rejectWithValue }) => {
        try {
            const response = await axiosAPI.post<RegisterResult>('/users', registerMutation);
            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

export const login = createAsyncThunk<User, LoginMutation, {rejectValue: GlobalError}>(
    'users/login',
    async (loginMutation, {rejectWithValue}) => {
        try {
            const response = await axiosAPI.post<RegisterResult>('/users/sessions', loginMutation);
            return response.data.user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as GlobalError);
            }
            throw e;
        }
    }
);

export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;


export const sliceRegister = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoadingRegister = true;
            state.isErrorRegister = null;
        })
            .addCase(register.fulfilled, (state, {payload: registerResult}) => {
                state.isLoadingRegister = false;
                state.user = registerResult.user;
            })
            .addCase(register.rejected, (state, {payload: error}) => {
                state.isLoadingRegister = false;
                state.isErrorRegister = error || null;
            });
        builder.addCase(login.pending, (state) => {
            state.loginLoading = true;
            state.loginError = null;
        });
        builder.addCase(login.fulfilled, (state, {payload: user}) => {
            state.loginLoading = false;
            state.user = user;
        });
        builder.addCase(login.rejected, (state, {payload: error}) => {
            state.loginLoading = false;
            state.loginError = error || null;
        });
    }
});

export const registerReducer = sliceRegister.reducer;