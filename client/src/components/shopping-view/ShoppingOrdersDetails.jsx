import React, { useState } from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'


const ShoppingOrdersDetails = () => {
  return (
    <DialogContent className="sm:max-w-[600px]">
        <div className='grid gap-6'>
            <div className="grid gap-2">
                <div className="flex mt-4 items-center justify-between">
                    <div className="font-medium">Order Id</div>
                    <Label>123456</Label>
                </div>
                <div className="flex mt-1 items-center justify-between">
                    <div className="font-medium">Order Date</div>
                    <Label>20/07/24</Label>
                </div>
                <div className="flex mt-1 items-center justify-between">
                    <div className="font-medium">Order Status</div>
                    <Label>In Process</Label>
                </div>
                <div className="flex mt-1 items-center justify-between">
                    <div className="font-medium">Order Price</div>
                    <Label>₹ 500</Label>
                </div>
            </div>
            <Separator />
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <div className='font-medium'>Order Details</div>
                    <ul className="grid gap-3">
                        <li className='flex items-center justify-between'>
                            <span>Product One</span>
                            <span>₹500</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <div className='font-medium'>Shipping Info</div>
                    <div className="grid gap-0.5 text-muted-foreground ">
                        <span>John doe</span>
                        <span>Address</span>
                        <span>City</span>
                        <span>Pincode</span>
                        <span>Phone</span>
                        <span>Notes</span>
                    </div>
                </div>
            </div>
        </div>
    </DialogContent>
  )
}

export default ShoppingOrdersDetails