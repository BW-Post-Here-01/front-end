import React, { useContext } from 'react';
import { Form, FormGroup, FormText, Button } from 'reactstrap';
import {fetchUser,fetchPosts} from '../store/actions'
import {useState} from 'react'
import { useHistory } from "react-router-dom";
import {axiosWithAuth} from '../utils/axiosWithAuth'
import { connect } from 'react-redux';

import '../styles/Login.scss'; 

import { LoginContext } from '../App'; 

function LoginForm(props){

    const loginFunction = useContext(LoginContext); 
    
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
      })
    const history = useHistory()

    const handleChange = e=>{
        e.preventDefault()
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
      }

    const login = e=>{
        e.preventDefault()
        axiosWithAuth()
        .post('/login', credentials)
        .then(res=>{
            const user = res.data;
            localStorage.setItem('token', res.data.token); 
            loginFunction(user);
            props.fetchUser(res.data.user.id)
            props.fetchPosts(res.data.user.id)
            history.push("/dashboard"); 
        })
        .catch(res=>{
          console.log(res)
          alert('the username or password is incorrect')
        })
      }

    return(
        <>
            <Form className='auth-form' onSubmit = {login}>

                <FormGroup>
                    <FormText>Email:</FormText>
                    <label htmlFor = 'email'>
                        <input
                             type="text"
                             name="username"
                             value={credentials.username}
                             onChange={handleChange}
                        />
                    </label>
                </FormGroup>

                <FormGroup>
                    <FormText>Password:</FormText>
                    <label htmlFor = 'password'>
                        <input 
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </label>
                </FormGroup>

                <FormGroup>
                    <Button color='danger' type='submit' size="lg">
                        Submit
                    </Button>
                </FormGroup>
            </Form>
            {/* <p>don't have an account?</p>
            <Button onClick={sendToRegister}>Click here to make one!</Button> */}
        </>
    ); 
}; 

export default connect(null,{fetchUser,fetchPosts})(LoginForm);