import mongoose from "mongoose";




const messageSchema = new mongoose.Schema({
 data:{
    type: Object
 },

 conversationId:{
   type: mongoose.Types.ObjectId
 }


})




const Message = mongoose.model('message', messageSchema)

export default Message