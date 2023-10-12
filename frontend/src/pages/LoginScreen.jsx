import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import {useLoginMutation} from '../services/slices/userApiSlice'
import { setCredentiald } from '../services/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
 
const LoginScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [credential, setCredential] = useState({email: '', password: ''})
  const {userInfo} = useSelector((state) => state.auth)
  const [login, {isLoading, isError, isSuccess}] = useLoginMutation()
  const handleChange = (e) => {
    setCredential((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
   try {
    //api
      let {data} = await login(credential) 
    //action
    dispatch(setCredentiald(data))

      console.log(data)
   } catch (error) {
    
   }
  }
  useEffect(() => {
   if (userInfo) {
    navigate('/')
   }
  }, [navigate, userInfo])
  return (
     <Form onSubmit={handleSubmit} className='p-3'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
        name='email'
        value={credential.email}
        onChange={(e) => handleChange(e)}
        type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name='password'
          value={credential.password}
          onChange={(e) => handleChange(e)}
        type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default LoginScreen