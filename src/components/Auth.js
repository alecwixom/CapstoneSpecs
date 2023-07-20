import axios from "axios";
import React, { useState, useContext } from "react";
import AuthContext from "../store/authContext";
import './auth.css'

const Auth = () => {
    const [register, setRegister] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [display, setDisplay] = useState('none')

    const authCtx = useContext(AuthContext)

    const submitHandler = e => {
        e.preventDefault()

        setDisplay('none')

        const body = {
            username,
            password
        }


        axios.post(register ? `http://localhost:4001/register` : `http://localhost:4001/login`, body)
            .then((res) => {
                console.log('AFTER AUTH', res.data)
                authCtx.login(res.data.token, res.data.exp, res.data.userId)
            })
            .catch(err => {
                setMessage(err.response.data)
                setDisplay('block')
                setPassword('')
                setUsername('')
            })
    }

    return (
        <main>
            <h4>Welcome!</h4>
            <form className='form auth-form' onSubmit={submitHandler}>
                <input 
                    type='text' 
                    placeholder='username' 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className='form-input'/>
                <input 
                    type='password' 
                    placeholder='password' 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='form-input'/>
                <button className='form-btn'>
                    {register ? 'Sign Up' : 'Login'}
                </button>
            </form>
            <p style={{display: display}} className='auth-msg'>{message}</p>
            <button className='form-btn' onClick={() => setRegister(!register)}>
                Need to {register ? 'Login' : 'Sign Up'}?
            </button>
        </main>
    )
}

export default Auth