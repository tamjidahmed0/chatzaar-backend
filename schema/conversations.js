import mongoose from "mongoose";



const conversationSchema = new mongoose.Schema({
 data:{
    conversationId:{
      type: mongoose.Schema.ObjectId,
      default: () => new mongoose.Types.ObjectId(), 
      unique: true
    },
    userId:{
      type: mongoose.Types.ObjectId,
    },
    content:{
      type:String
    }
 }
}, { timestamps: true })




const Conversation = mongoose.model('conversation', conversationSchema)

export default Conversation