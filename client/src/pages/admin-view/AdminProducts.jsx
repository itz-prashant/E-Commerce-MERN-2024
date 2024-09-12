import ImageUpload from '@/components/admin-view/ImageUpload'
import Form from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElement } from '@/config'
import { toast, useToast } from '@/hooks/use-toast'
import { addNewProduct, fertchAllProduct } from '@/store/admin/product-slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: '',
}

const AdminProducts = () => {

  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const { toast } = useToast();
  const dispatch = useDispatch()
  const {productList} = useSelector(state=> state.adminProduct)

  function onSubmit(event){
    event.preventDefault();
    dispatch(addNewProduct({
      ...formData, 
      image: uploadedImageUrl
    })).then((data)=>{
      console.log(data);
      if(data?.payload?.success){
        dispatch(fertchAllProduct())
        setOpenCreateProductDialog(false)
        setImageFile(null)
        setFormData(initialFormData)
        toast({
          title: 'Product add successfully'
        })
      }
    })
  }

  useEffect(()=>{
    dispatch(fertchAllProduct())
  },[dispatch])

  console.log(productList);
  

  return (
    <>
    <div className="mb-5 w-full flex justify-end">
      <Button onClick={()=>{setOpenCreateProductDialog(true)}}>Add New Product</Button>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet open={openCreateProductDialog} onOpenChange={()=>{setOpenCreateProductDialog(false)}}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ImageUpload imageFile={imageFile} setImageFile={setImageFile} 
          uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState} imageLoadingState={imageLoadingState}/>
          <div className='py-5'>
            <Form 
              formControls={addProductFormElement}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
    </>
  )
}

export default AdminProducts