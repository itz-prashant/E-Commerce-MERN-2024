import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import ShoppingOrdersDetails from './ShoppingOrdersDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrderByUser, getOrderDetails, resetOrderDetails } from '@/store/shop/order-slice'
import { Badge } from '../ui/badge'

const Orders = () => {

  const [openDetailsDialog ,setOpenDetailsDialog] = useState(false)
  const dispatch = useDispatch()
  const {user} = useSelector(state=> state.auth)
  const {orderList, orderDetails} = useSelector(state=> state.shopOrder)

  function handleFetchOrderDetails(id){
    dispatch(getOrderDetails(id))
  }

  useEffect(()=>{
    if(orderDetails !== null){
      setOpenDetailsDialog(true)
    }
  },[orderDetails])

  useEffect(()=>{
    dispatch(getAllOrderByUser(user?.id))
  },[dispatch])


  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className='sr-only'>Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              orderList && orderList.length > 0 ? 
              orderList.map(orderItem => <TableRow>
                <TableCell>{orderItem?._id}</TableCell>
                <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
                <TableCell>
                  <Badge className={`py-1 px-3 ${orderItem?.orderStatus === 'confirmed' ? 'bg-green-500': 'bg-red-500'}`}>{orderItem?.orderStatus}</Badge>
                </TableCell>
                <TableCell>{orderItem?.totalAmount}</TableCell>
                <TableCell>
                  <Dialog open={openDetailsDialog} onOpenChange={()=>{
                    setOpenDetailsDialog(false)
                    dispatch(resetOrderDetails())
                  }}>
                    <Button onClick={()=>handleFetchOrderDetails(orderItem?._id)}>View Details</Button>
                    <ShoppingOrdersDetails orderDetails={orderDetails}/>
                  </Dialog>
                </TableCell>
              </TableRow> ) : null
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default Orders