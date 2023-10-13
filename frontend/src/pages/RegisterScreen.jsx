import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../services/slices/userApiSlice';
import { setCredentiald } from '../services/slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RegisterScreen = () => {
  const [credential, setCredential] = useState({ name: '',email: '', password: '', confirmPassword: ''})
  const {userInfo} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setCredential((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo])

  const [registerApi, {isLoading, isError}] = useRegisterMutation()
  const dispatch = useDispatch()
  const handleSubmit = async(e) => {
    e.preventDefault()
   try {
      let userData = await registerApi(credential).unwrap()
      dispatch(setCredentiald(userData))
toast("Register successfully! ")

      console.log(res)

   } catch (error) {
   
toast(error.data.message)

   }
  }
  return (
    
     <Form onSubmit={(e) => handleSubmit(e)} className='p-3'>
      <ToastContainer />

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
        name='name'
        value={credential.name}
        onChange={(e) => handleChange(e)}
        type="name" placeholder="Enter name" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
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
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          name='confirmPassword'
          value={credential.confirmPassword}
          onChange={(e) => handleChange(e)}
        type="password" placeholder="confirmPassword" />
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

export default RegisterScreen