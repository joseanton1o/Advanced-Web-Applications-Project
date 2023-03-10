import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Register component, similar to the login component
const Register = () => {
    // Here we store userData to send in the login
    const [userData, setUserData] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const submit = (e) => {
        e.preventDefault();
        console.log(userData);
        if (userData === {})
            console.log('empty')
        //
        if (userData.email === undefined || userData.username === undefined || userData.password === undefined) {
            setError('Please fill in all fields');
            return;
        }

        /* POST request using fetch with error handling */
        fetch("/users/register", {
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify(userData),
            mode:"cors" 
        })
            .then(response => {
                if (response.status === 403) {
                    setError('Email or username already exists');
                }else if  (response.status === 400)
                {
                    // Access the response body and parse it as JSON using a promise
                    response.json().then(data => {
                        console.log(data);
                        setError(data.message);
                    }); // This is done because response.json() returns a promise and we need to wait for it to resolve
                }
                if (response.status === 200){
                    navigate('/login');
                }
            })

    }

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }


    return (
        <div>
            <h2>Register</h2>
            {error && <h5 className='error-msg'>{error}</h5>}
            <form onSubmit={submit} onChange={handleChange}>
                <input type="email" name="email" placeholder='Email' />
                <input type="text" name="username" placeholder='Username' />
                <input type="password" name="password" placeholder='Password' />
                <input type="submit" className='btn' value="Submit"/>
            </form>
        </div>
    )

}

export default Register