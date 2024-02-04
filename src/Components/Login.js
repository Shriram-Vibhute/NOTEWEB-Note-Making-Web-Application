import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css';

const Login = () => {

  // useHistory hook is deprycated

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
      'method': "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })
    const json = await response.json();
    console.log(json);
    if (json.sucess) {
      // Redirect to his account
      localStorage.setItem("token", json.authToken);
      navigate('/');
    }
    else {
      alert("No");
    }
  }

  return (
    <>
      <h2 style={{ color: 'white' }} className='my-3 text-center'>Login into your Account</h2>
      <div id='login-style' className='login-style container my-3'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={credentials.password} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-dark">Login</button>
        </form>
      </div></>
  )
}

export default Login
