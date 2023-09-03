import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  let history = useNavigate();
    const [credentials, setCredentials] = useState({name:"", email: "", password: "" ,cpassword:"" });

    const handleSubmit = async (e) => {
        e.preventDefault();

       const  {name,email,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser ", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name,email,password })
        });

        // const authToken = await response.text(); // Treat the response as text, not JSON
        const json=await response.json()
        // const tokenObject = { authToken }; // Create an object to hold the token
        console.log(json);
        if(json.success)
        {
            localStorage.setItem('token',json.authtoken);
            history("/");
            props.showAlert("Account created Successfully","success") 
        }
        else{
          props.showAlert("Invalid details","danger") 
        }
        // Handle authentication token here if needed

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  return (
    <div className='container ht-2'>
      <h2 className='my-2'>Create an account to use iNotebook</h2>

      <form onSubmit={handleSubmit}>
        <div className="mt-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" />
          
        </div> 
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="emial" name='email' onChange={onChange} aria-describedby="emailHelp" />
          <div id="emial" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} name='password' id="password" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='cpassword' onChange={onChange} id="cpassword"  minLength={5} required/>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup