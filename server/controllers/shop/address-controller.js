const Address = require('../../models/address')

const addAddress = async (req, res)=>{
    try {
      const {userId, address, city, pincode,phone, notes} = req.body

      if(!userId || !address || !city || !pincode || !phone || !notes){
        return res.status(400).json({
            success: false,
            message: 'Invalid data provided'
        })
      }

      const newlyCreatedAddress = new Address({
        userId, address, city, pincode,phone, notes
      })

      await newlyCreatedAddress.save()
      res.status(200).json({
        success: true,
        data: newlyCreatedAddress
    })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some Error'
        })
    }
}
const fetchAddress = async (req, res)=>{
    try {
        const {userId} = req.params
        if(!userId){
            return res.status(400).json({
                success: false,
                message: 'User Id is required'
            })
        }

        const addressList = await Address.find({userId})

        res.status(200).json({
            success: true,
            data: addressList
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some Error'
        })
    }
}
const editAddress = async (req, res)=>{
    try {
        const {userId, addressId} = req.params
        const formData = req.body

      if(!userId || !addressId){
        return res.status(400).json({
            success: false,
            message: 'User and address id required'
        })
      }
    
      const address = await Address.findOneAndUpdate({
        _id: addressId, userId
      }, formData, {new: true})
      
      if(!address){
        return res.status(400).json({
            success: false,
            message: 'Address not found'
        })
      }

      res.status(200).json({
        success: true,
        data: address
    })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some Error'
        })
    }
}
const deleteAddress = async (req, res)=>{
    try {
        const {userId, addressId} = req.params

      if(!userId || !addressId){
        return res.status(400).json({
            success: false,
            message: 'User and address id required'
        })
      }

      const address = await Address.findOneAndDelete({_id:addressId, userId})

      if(!address){
        return res.status(400).json({
            success: false,
            message: 'Address not found'
        })
      }

      res.status(200).json({
        success: true,
        message: 'Address deleted Successfully'
    })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some Error'
        })
    }
}

module.exports = {
    addAddress,
    fetchAddress,
    deleteAddress,
    editAddress
}