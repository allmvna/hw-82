import {Avatar, Box, Button, Container, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from "@mui/material/Grid2";
import * as React from "react";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {register, selectErrorRegister} from "./sliceRegister.ts";
import {NavLink, useNavigate} from "react-router-dom";


const RegisterUser = () => {
    const dispatch = useAppDispatch();
    const registerError  = useAppSelector(selectErrorRegister);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setForm(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await dispatch(register(form)).unwrap();
            navigate("/");
        } catch (e){
            console.error(e);
        }
    };

    const getFieldError = (fieldName: string) => {
        try {
            return registerError?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: "2px solid",
                        borderColor: "white",
                        borderRadius: "10px",
                        padding: "15px",
                        backgroundColor: "white",
                    }}
                >
                    <Avatar sx={{ m: 1, backgroundColor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{color: "black"}}>
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={submitFormHandler} sx={{ mt: 3 }}>
                        <Grid size={12} direction={'column'} container spacing={2}>
                            <Grid size={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    value={form.username}
                                    onChange={inputChangeHandler}
                                    error={Boolean(getFieldError('username'))}
                                    helperText={getFieldError('username')}
                                    sx={{
                                        backgroundColor: "white",
                                    }}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={form.password}
                                    onChange={inputChangeHandler}
                                    error={Boolean(getFieldError('password'))}
                                    helperText={getFieldError('password')}
                                    sx={{
                                        backgroundColor: "white",
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid>
                                <NavLink to={'/login'}>
                                    Already have an account? Sign in
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default RegisterUser;