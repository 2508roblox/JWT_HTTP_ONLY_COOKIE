import React from 'react'
import Button from 'react-bootstrap/Button';
const HomeScreen = () => {
  return (
    <>
    <div className=" d-flex flex-column gap-2 align-center p-5 align-items-center m-5 border border-primary bg-light">
    <h1 className=''>Authentication</h1>
    <div className="">
    <Button variant="primary">Primary</Button>{' '}
    <Button variant="primary">Primary</Button>{' '}
    </div>
    </div>
    </>
  )
}

export default HomeScreen