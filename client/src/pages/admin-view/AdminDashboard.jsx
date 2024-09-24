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
  

  function handleUploadFeatureImage(){
    dispatch(addFeatureImages(uploadedImageUrl)).then((data)=>{
      if(data?.payload?.success){
        dispatch(getFeatureImages())
        setImageFile(null)
        setUploadedImageUrl('')
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
          <div className='flex flex-col gap-4 mt-5'>
            {
              featureImageList && featureImageList.length >0 ? 
              featureImageList.map(featureImage=> <div>
                <div className='relative'>
                <img src={featureImage.image} alt="" />
                </div>
              </div>) :null
            }
          </div>
    </div>
  )
}

export default AdminDashboard