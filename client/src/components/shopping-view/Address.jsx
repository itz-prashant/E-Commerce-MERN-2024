import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Form from '../common/Form'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAddress, editAddress, fetchAllAddress } from '@/store/shop/address-slice'
import AddressCard from './AddressCard'
import { useToast } from '@/hooks/use-toast'

const initialAddressFormData = {
    address: '',
    city: '',
    phone: '',
    pincode: '',
    notes: ''
}

const Address = () => {

    const [formData, setFormData] = useState(initialAddressFormData)
    const [currentEditId, setCurrentEditId] = useState(null)
    const dispatch = useDispatch()
    const {user} = useSelector(state=> state.auth)
    const {addressList} = useSelector(state=> state.shopAddress)
    const {toast} = useToast()

    function handleManageAddress(e){
        e.preventDefault()

        if(addressList.length >= 3 && currentEditId === null){
            setFormData(initialAddressFormData)
            toast({
                title: 'Maximum added 3 addrtess',
                variant: 'destructive'
            })
            return ;
        }

        currentEditId !== null ? dispatch(editAddress({
            userId: user?.id,
            addressId: currentEditId,
            formData
        })).then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchAllAddress(user?.id))
                setCurrentEditId(null)
                setFormData(initialAddressFormData)
                toast({
                    title: 'Address Updated SuccessFully'
                })
            }
        }) : null

        dispatch(addNewAddress({
            ...formData,
            userId: user?.id
        })).then((data)=>{
            if(data?.payload?.success){
                setFormData(initialAddressFormData)
                dispatch(fetchAllAddress(user?.id))
                toast({
                    title: 'Address Added successfully',
                    variant: 'destructive'
                })
            }
        })
    }

    useEffect(()=>{
        dispatch(fetchAllAddress(user?.id))
    },[dispatch])


    function isFormValid(){
        return Object.keys(formData).map(key=> formData[key] !== '').every((item) => item)
    }

    function handleDeleteAddress(getCurrentAddress){
        dispatch(deleteAddress({userId: user?.id, addressId: getCurrentAddress?._id})).then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchAllAddress(user?.id))
                toast({
                    title: 'Address Deleted successfully',
                    variant: 'destructive'
                })
            }
        })
    }

    function handleEditAddress(getCurrentAddress){
        setCurrentEditId(getCurrentAddress?._id)
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            phone: getCurrentAddress?.phone,
            pincode: getCurrentAddress?.pincode,
            notes: getCurrentAddress?.notes,        
        })
    }

  return (
    <Card>
        <div className='mb-5 p-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
            {
                addressList && addressList.length > 0 ?
                addressList.map(addressItem=> <AddressCard setFormData={setFormData} handleEditAddress={handleEditAddress}
                    handleDeleteAddress={handleDeleteAddress} addressInfo={addressItem}/>) : null
            }
        </div>
        <CardHeader>
            <CardTitle>
                {
                    currentEditId !== null ? 'Edit Address' : "Add New Address"
                }
            </CardTitle>
        </CardHeader>
        <CardContent calssNsme="space-y-3">
            <Form 
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditId !== null ? 'Edit' : "Add"}
            onSubmit={handleManageAddress}
            isBtnDisabled={isFormValid}
            />
        </CardContent>
    </Card>
  )
}

export default Address