import ImageUpload from '@/components/admin-view/ImageUpload'
import { Button } from '@/components/ui/button'
import { addFeatureImages, getFeatureImages } from '@/store/common-slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AdminDashboard = () => {

  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const dispatch=  useDispatch()
  const {featureImageList} = useSelector(state=> state.commonFeature)
  console.log(featureImageList);
  

  function handleUploadFeatureImage(){
    dispatch(addFeatureImages(uploadedImageUrl)).then((data)=>{
      if(data?.payload?.success){
        dispatch(getFeatureImages())
      }
    })
  }

  useEffect(()=>{
    dispatch(getFeatureImages())
  },[dispatch])

  return (
    <div>
      <ImageUpload imageFile={imageFile} setImageFile={setImageFile} 
          uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} 
          // isEditMode = {currentEditId !== null}
          setImageLoadingState={setImageLoadingState} isCustomStyling={true} imageLoadingState={imageLoadingState}/>
          <Button onClick={handleUploadFeatureImage} className='mt-4 w-full'>Upload</Button>
    </div>
  )
}

export default AdminDashboard