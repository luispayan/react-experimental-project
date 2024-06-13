import { useState } from 'react';
import { login, register } from '../services/api';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Logo from '../assets/logo.png';
import '../styles/UserForm.css';

const LoginForm = ({ type = 'login' }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const action = type == 'login' ? 'Login' : 'Register';

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = type == 'login' ? await login(username, password) : await register(username, password);
            localStorage.setItem('token', response.token);
            window.location.href = '/';
        } catch (error) {
            console.error('Error trying to log in:', error);
        }
    };

    return (
        <div className='login-form w-12/12 flex align-middle justify-center'>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={10} sm={6} md={4} lg={3} className="!w-6/12 mx-auto h-fit bg-white p-4">
                    <form onSubmit={handleSubmit}>
                        <img src={Logo} alt="Logo" className="h-20 mx-auto" align="center" gutterBottom/>
                        <TextField
                            label="Username"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            className='!w8/12'
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            type="password"
                            label="Password"
                            variant="outlined"
                            margin="normal"
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                            className='!w8/12'
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="error"
                            fullWidth
                            size="large"
                            className='!w8/12'
                            style={{ marginTop: '1rem' }}
                            >
                            {action}
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
};

export default LoginForm;