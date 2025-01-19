import React, {useState} from 'react';
import {LoginMutation} from '../../types';
import {Alert, Avatar, Box, Button, Container, TextField, Typography} from '@mui/material';
import Grid from "@mui/material/Grid2";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {login, selectLoginError} from "./sliceRegister.ts";


const LoginUser = () => {
    const dispatch = useAppDispatch();
    const loginError = useAppSelector(selectLoginError);
    const navigate = useNavigate();
    const [state, setState] = useState<LoginMutation>({
        username: '',
        password: '',
    });

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState(prevState => ({...prevState, [name]: value}));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        try{
            await dispatch(login(state)).unwrap();
            navigate("/");
        } catch (e){
            console.error(e);
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
                     backgroundColor: "white"
                 }}
             >
                 <Avatar sx={{ m: 1, backgroundColor: 'secondary.main' }}>
                     <LockOpenIcon />
                 </Avatar>
                 <Typography component="h1" variant="h5" sx={{color: "black"}}>
                     Sign up
                 </Typography>
                 {loginError && (
                     <Alert
                         severity="error"
                         sx={{mt: 3, width: '100%'}}
                     >
                         {loginError.error}
                     </Alert>
                 )}
                 <Box component="form" noValidate onSubmit={submitFormHandler} sx={{ mt: 3 }}>
                     <Grid size={12} direction={'column'} container spacing={2}>
                         <Grid size={12}>
                             <TextField
                                 required
                                 fullWidth
                                 id="username"
                                 label="Username"
                                 name="username"
                                 value={state.username}
                                 onChange={inputChangeHandler}
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
                                 value={state.password}
                                 onChange={inputChangeHandler}
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
                         Sign In
                     </Button>
                     <Grid container justifyContent="flex-end">
                         <Grid>
                             <NavLink to={'/users'} >
                                 Don't have an account yet? Sign Up
                             </NavLink>
                         </Grid>
                     </Grid>
                 </Box>
             </Box>
         </Container>
     </>
    );
};

export default LoginUser;