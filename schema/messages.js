import mongoose from "mongoose";




const messageSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: false,

  },

  data: {
    type: Object
  }, 
  userId: { 
    type: mongoose.Types.ObjectId
  }

}, { timestamps: true })




const Message = mongoose.model('message', messageSchema)

export default Message