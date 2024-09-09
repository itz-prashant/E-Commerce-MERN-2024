import Form from '@/components/common/Form'
import { loginFormControls } from '@/config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const initialState = {
  emial: '',
  password: ''
}

const Login = () => {
  const [formData, setFormData] = useState(initialState)

  function onSubmit(){

  }

  return (
     <div className='mx-auto w-full max-w-md space-y-6 '>
      <div className="text-center">
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign In to your Account</h1>
        <p className='mt-2'>
          Don't have an account
          <Link to='/auth/register' className='font-medium text-primary hover:underline ml-2'>Sign up</Link>
        </p>
      </div>
      <Form
        formControls={loginFormControls}
        buttonText={'Sign In'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default Login