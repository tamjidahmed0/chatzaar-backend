import mongoose from "mongoose";
import Credit from "./credit.js";


const UserSchema = new mongoose.Schema({
   name:{
    type:String
   },
   email:{
    type: String
   },
   password:{
    type: String
   },
   photo:{
    type: String
   }
},{ timestamps: true })

// Middleware to create default credit
UserSchema.post('save', async function (doc, next) {
   try {
     const existing = await Credit.findOne({ userId: doc._id });
     if (!existing) {
       await Credit.create({ userId: doc._id, credits: 10 });
     }
     next();
   } catch (err) {
     next(err);
   }
 });


const User = mongoose.model('user', UserSchema)

export default User