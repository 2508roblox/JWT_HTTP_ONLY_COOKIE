import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../services/slices/userApiSlice';
import { setCredentiald } from '../services/slices/authSlice';

 
const ProfileScreen = () => {
    const {userInfo} = useSelector((state) => state.auth)
    const [updateData, setUpdateData] = useState({
      name: userInfo.name,
      email: userInfo.email,
      password: '',
      confirmPassword: '',

    })
    const handleChange =  (e) =>{
      setUpdateData((prev) => ({...prev, [e.target.name] : e.target.value}))
    }
    const [updateUser, {isLoading}] = useUpdateUserMutation() 
    const dispatch = useDispatch()
    const handleSubmit = async (e) =>{
     e.preventDefault()
    if (updateData.password !== updateData.confirmPassword || !updateData.email || !updateData.name ) {
      return false
    } 
     try {
    let data =  await updateUser(updateData).unwrap()
    console.log(data)
      dispatch(setCredentiald(data))

     } catch (error) {
      
     }
   
    }

  return (
    <div>

<Form className='p-5 m-4' onSubmit={(e) => handleSubmit(e)}>
      <Form.Group  className="mb-3" controlId="formBasicname">
        <Form.Label>Name</Form.Label>
        <Form.Control  onChange={(e) => handleChange(e)} value={updateData.name} name='name' type="text" placeholder="Enter name" />
        <Form.Text  className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e) => handleChange(e)} value={updateData.email} name='email' type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">   
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={(e) => handleChange(e)} value={updateData.pasword} name='password' type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">   
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control onChange={(e) => handleChange(e)} value={updateData.confirmPasword} name='confirmPassword' type="password" placeholder="Confirm Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>

    </div>
  )
}

export default ProfileScreen