import {Button, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';

import FloatingLabel from "react-bootstrap/FloatingLabel";

import '../App.css';

function Login() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;

        setCredentials(prev => {
            return {
                ...prev,
                [name]: value,
            }
        });
    }

    useEffect(() => {
        console.log(credentials);
    }, [credentials]);

    const handleClick = async (event) => {
        event.preventDefault();
        console.log(credentials);

        const loginData = await fetch('http://localhost:3001/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...credentials
            })
        })
        .then(res => res.json());
        console.log(loginData);
    }

    return (
        <>
            <div id='bodyTest' style={{width:"100%", margin:"auto auto", textAlign:"center"}}>
                <h2>Login</h2>
                
                <Form>
                    <Form.Group>
                        <FloatingLabel
                            controlId="username"
                            name="userName"
                            label="User Name"
                            className="mb-3"
                        >
                        <Form.Control
                            name='username'
                            value={credentials.username} 
                            placeholder='User Name' 
                            style={{marginBottom: '1rem'}} 
                            onChange={handleChange}
                        />
                        </FloatingLabel>
                        
                        <FloatingLabel
                            controlId="password"
                            name="password"
                            label="Password"
                            className="mb-3"
                        >
                        <Form.Control
                            name="password"
                            type='password'
                            value={credentials.password} 
                            placeholder='Password' 
                            onChange={handleChange}
                            className="mb-3"
                        />
                        </FloatingLabel>
                    </Form.Group>
                    <Button variant="outline-dark" style={{width:"100%", marginBottom:'1rem'}} onClick={handleClick}>Login</Button>
                </Form>
            </div>
        </>
    )

}

export default Login