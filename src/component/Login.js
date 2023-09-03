import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        // const authToken = await response.text(); // Treat the response as text, not JSON
        const json=await response.json()
        // const tokenObject = { authToken }; // Create an object to hold the token
        console.log(json);
        if(json.success)
        {
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged in  Successfully","success") 
            history("/");
        }
        else{
            props.showAlert("Invalid Credentials","danger") 
        }
        // Handle authentication token here if needed

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='mt-3'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" value={credentials.password} onChange={onChange} id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Login;
