import AdminProductTile from '@/components/admin-view/AdminProductTile'
import ImageUpload from '@/components/admin-view/ImageUpload'
import Form from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElement } from '@/config'
import { toast, useToast } from '@/hooks/use-toast'
import { addNewProduct, deleteProduct, editProduct, fertchAllProduct } from '@/store/admin/product-slice'
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
  const [currentEditId, setCurrentEditId] = useState(null)
  const { toast } = useToast();
  const dispatch = useDispatch()
  const {productList} = useSelector(state=> state.adminProduct)

  function onSubmit(event){
    event.preventDefault();

    currentEditId !== null ? dispatch(editProduct({
      id: currentEditId,
      formData,
    })).then((data)=> {
      if(data?.payload?.success){
        dispatch(fertchAllProduct())
        setFormData(initialFormData)
        setOpenCreateProductDialog(false)
        setCurrentEditId(null)
      }
    }) :
    dispatch(addNewProduct({
      ...formData, 
      image: uploadedImageUrl
    }))
    .then((data)=>{
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

  function handleDelete(getCurrentProductId){
    dispatch(deleteProduct(getCurrentProductId)).then((data)=>{
      if(data?.payload?.succes){
        dispatch(fertchAllProduct())
      }
    })
  }

  function isFormValid(){
    return Object.keys(formData)
    .map(key =>formData[key] !== "")
    .every(item => item)
  }  

  return (
    <>
    <div className="mb-5 w-full flex flex-col">
      <div className='w-full flex justify-end'>
        <Button className="w-fit" onClick={()=>{setOpenCreateProductDialog(true)}}>Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0 ? 
          productList.map(productItem => <AdminProductTile product={productItem} 
            setCurrentEditId={setCurrentEditId} setOpenCreateProductDialog={setOpenCreateProductDialog} 
            setFormData={setFormData} handleDelete={handleDelete}
          />) : null
        }
      </div>
      <Sheet open={openCreateProductDialog} onOpenChange={()=>{
        setOpenCreateProductDialog(false)
        setCurrentEditId(null)
        setFormData(initialFormData)
        }}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {
                currentEditId !== null ? 'Edit Product' : 'Add new product'
              }
            </SheetTitle>
          </SheetHeader>
          <ImageUpload imageFile={imageFile} setImageFile={setImageFile} 
          uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} isEditMode = {currentEditId !== null}
          setImageLoadingState={setImageLoadingState} imageLoadingState={imageLoadingState}/>
          <div className='py-5'>
            <Form 
              formControls={addProductFormElement}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditId !== null ? 'Edit' : 'Add'}
              onSubmit={onSubmit}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
    </>
  )
}

export default AdminProducts