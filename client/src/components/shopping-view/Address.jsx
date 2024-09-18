import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Form from '../common/Form'
import { addressFormControls } from '@/config'

const initialAddressFormData = {
    address: '',
    city: '',
    phone: '',
    pincode: '',
    notes: ''
}

const Address = () => {

    const [formData, setFormData] = useState(initialAddressFormData)

    function handleManageAddress(e){
        e.preventDefault()
    }

    function isFormValid(){
        return Object.keys(formData).map(key=> formData[key] !== '').every((item) => item)
    }

  return (
    <Card>
        <div>Address List</div>
        <CardHeader>
            <CardTitle>Add New Address</CardTitle>
        </CardHeader>
        <CardContent calssNsme="space-y-3">
            <Form 
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Add"}
            onSubmit={handleManageAddress}
            isBtnDisabled={isFormValid}
            />
        </CardContent>
    </Card>
  )
}

export default Address