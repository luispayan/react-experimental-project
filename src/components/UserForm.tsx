import { useState } from 'react';
import { login, register } from '../services/api';
import * as Form from '@radix-ui/react-form';
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
            <Form.Root onSubmit={handleSubmit} className="FormRoot self-center !w-3/12 mx-auto h-fit bg-white p-4">
                <img src={Logo} alt="Logo" className="h-20 mx-auto" align="center"/>
                <Form.Field className="FormField" name="email">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Form.Label className="FormLabel text-black">Username</Form.Label>
                        <Form.Message className="FormMessage text-red-500" match="valueMissing">
                            Please enter your username
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input
                            className="Input bg-white text-black"
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="FormField" name="question">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Form.Label className="FormLabel text-black">Password</Form.Label>
                        <Form.Message className="FormMessage text-red-500" match="valueMissing">
                            Please enter your password
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input
                            type="password"
                            className='Input bg-white text-black'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Submit asChild>
                    <button className="Button bg-red-500 hover:bg-red-700 text-white" style={{ marginTop: 10 }}>
                        {action}
                    </button>
                </Form.Submit>
            </Form.Root>
        </div>
    );
};

export default LoginForm;