import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const AddressCard = ({addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress, selectedId}) => {

  return (
    <Card className={`cursor-pointer ${selectedId?._id === addressInfo?._id ? 'border-2 border-black' : ""}`}
    onClick={setCurrentSelectedAddress? ()=> setCurrentSelectedAddress(addressInfo): null}>
        <CardContent className={`grid py-4 gap-3 mb-2 `}>
            <Label>Address: {addressInfo?.address}</Label>
            <Label>City: {addressInfo?.city}</Label>
            <Label>Pincode: {addressInfo?.pincode}</Label>
            <Label>Phone: {addressInfo?.phone}</Label>
            <Label>Notes: {addressInfo?.notes}</Label>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button onClick={()=>handleEditAddress(addressInfo)}>Edit</Button>
          <Button onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>
        </CardFooter>
    </Card>
  )
}

export default AddressCard