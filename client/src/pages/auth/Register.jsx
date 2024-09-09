import Form from '@/components/common/Form'
import { registerFormControls } from '@/config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const initialState = {
  userName : '',
  emial: '',
  password: ''
}

export const Register = () => {
  
  const [formData, setFormData] = useState(initialState)
  const onSubmit = ()=>{}

  return (
    <div className='mx-auto w-full max-w-md space-y-6 '>
    <div className="text-center">
      <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>
      <p className='mt-2'>
        Alredy have an account
        <Link to='/auth/login' className='font-medium text-primary hover:underline ml-2'>Login</Link>
      </p>
    </div>
    <Form 
      formControls={registerFormControls}
      buttonText={'Sign Up'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
    />
  </div>
  )
}
