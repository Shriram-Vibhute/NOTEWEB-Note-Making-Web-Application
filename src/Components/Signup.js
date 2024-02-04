import React, { useState } from 'react'
import '../index.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  // useHistory hook is deprycated
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  })

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    const { name, email, password } = credentials;
    if (document.getElementById('password').value !== document.getElementById('cpassword').value) {
      alert("Values are not same");
      return;
    }
    event.preventDefault();
    const response = await fetch('http://127.0.0.1:5000/api/auth/createuser', {
      'method': "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password })
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
      <h2 style={{color:'white'}} className='my-3 text-center'>Create an Account</h2>
      <div id='signup-style' className='container my-3'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" name="name" className="form-control" id="name" aria-describedby="emailHelp" onChange={handleChange} value={credentials.name} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleChange} value={credentials.email} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" className="form-control" id="password" onChange={handleChange} value={credentials.password} />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" name="cpassword" className="form-control" id="cpassword" onChange={handleChange} value={credentials.cpassword} />
          </div>
          <button type="submit" className="btn btn-dark">Signup</button>
        </form>
      </div></>
  )
}

export default Signup;
