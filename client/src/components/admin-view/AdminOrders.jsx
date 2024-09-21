import React, { useEffect, useState } from 'react'
import { Card, CardHeader,CardContent, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import AdminOrderDetailsView from './AdminOrderDetailsView'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrderForAdmin, getOrderDetailsForAdmin, resetOrderDetailsAdmin } from '@/store/admin/order-slice'
import { Badge } from 'lucide-react'


const AdminOrders = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

  const {orderList, orderDetails} = useSelector(state=>state.adminOrder)

  const dispatch = useDispatch()

  function handleFetchOrderDetails(id){
    dispatch(getOrderDetailsForAdmin(id))
  }

  useEffect(()=>{
    if(orderDetails !== null){
      setOpenDetailsDialog(true)
    }
  },[orderDetails])

  useEffect(()=>{
    dispatch(getAllOrderForAdmin())
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
                  <Badge className={`py-1 px-3 ${orderItem?.orderStatus === 'confirmed' ? 'bg-green-500' :
                  orderItem?.orderStatus === 'rejected' ? 'bg-red-600' : 'bg-black'}`}>{orderItem?.orderStatus}</Badge>
                </TableCell>
                <TableCell>{orderItem?.totalAmount}</TableCell>
                <TableCell>
                  <Dialog open={openDetailsDialog} onOpenChange={()=>{
                    setOpenDetailsDialog(false)
                    dispatch(resetOrderDetailsAdmin())
                  }}>
                    <Button 
                    onClick={()=>handleFetchOrderDetails(orderItem?._id)}
                    >
                      View Details
                    </Button>
                    <AdminOrderDetailsView orderDetails={orderDetails}/>
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

export default AdminOrders