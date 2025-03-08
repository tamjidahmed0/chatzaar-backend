import mongoose from "mongoose";



const UserSchema = new mongoose.Schema({
   name:{
    type:String
   },
   email:{
    type: String
   },
   photo:{
    type: String
   }
})




const User = mongoose.model('user', UserSchema)

export default User