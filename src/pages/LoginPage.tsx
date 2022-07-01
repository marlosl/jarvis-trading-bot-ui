import React, { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Alert, Collapse, Grid, Typography } from '@mui/material';
import { Auth } from '../store/auth/types';
import { doLogin, getStoreUser } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider';

const LoginPage: FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isFormError, setFormError] = useState<boolean | undefined>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const providerAuth = useAuth();
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name == 'username') {
            setUsername(event.target.value);
        } else if (event.target.name == 'password') {
            setPassword(event.target.value);
        }
    };    

    const login = async () => {
        let from = "/";
        
        setFormError(false);

        if (username && password) {
            try {
                const auth = new Auth();
                auth.username = username;
                auth.password = password;

                let response = await doLogin(auth);
                console.log("RESPONSE:", response);
                let checkAuth = getStoreUser();
                console.warn("-- checkAuth: %s --", checkAuth);
                if (checkAuth) {
                    console.info("-- USER LOGGED IN USERNAME: %s, PASSWORD: %s --", auth.username, auth.password);
                } else {
                    console.warn("-- USER NOT LOGGED IN USERNAME: %s --", username);
                }

                if (response != null && !response.success) {
                    setFormError(true);
                    let message = String(response.error);
                    if (message.indexOf('401') > -1) {
                        setErrorMessage('Invalid username ou password.');
                    } else {
                        setErrorMessage(message);
                    }
                } else if (response != null && response.success) {
                    //props.onLogin(auth);
                    console.info("navegate to:", from);
                    providerAuth.signin(auth.username, () => {
                        navigate(from, { replace: true });
                    });
                }
                
            } catch(error) {
                console.error("------------------------- START FORM LOGIN ERROR -------------------------");
                console.error(error);
                console.error("-------------------------- END FORM LOGIN ERROR --------------------------");
                setFormError(true);
                setErrorMessage(String(error));
            }
        } else {
            setFormError(true);
            setErrorMessage("Missing fileds.");
        }
    }
    
    return (
        <Grid
            container
            component="form"
            rowSpacing={1}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
            Login
            </Typography>            
            <Grid item xs={12}>
                <TextField
                    required
                    error={isFormError}
                    id="outlined-required"
                    label="Username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    helperText={isFormError && 'Please inform the username.'}
                    sx={{ m: 1, width: '30ch' }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    error={isFormError}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handleChange}
                    helperText={isFormError && 'Please inform the password.'}
                    sx={{ m: 1, width: '30ch' }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" component="span" onClick={login}>
                    Sign In
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Collapse in={isFormError}>
                        <Alert variant="filled" severity="error">{errorMessage}</Alert>
                </Collapse>
            </Grid>
        </Grid>
    );
}

export default LoginPage;