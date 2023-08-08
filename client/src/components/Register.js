import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';


function Register() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = () => {
        console.log(username, password)
        axios.post("http://localhost:5000/register", { username, password }).then(user => {
            console.log(user);
            navigate('/login')
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <input type="text" placeholder="Enter Username" value={username} onChange={event => setUsername(event.target.value)} />
            <input type="password" placeholder="Enter Password" value={password} onChange={event => setPassword(event.target.value)} />
            <button onClick={submit}>Submit</button>
        </div>
    )
}

export default Register