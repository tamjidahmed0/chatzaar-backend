import mongoose from "mongoose";




const creditSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId
    },
    credits: {
        type: mongoose.Schema.Types.Mixed,
        default: 10
    },
 
}, { timestamps: true })




const Credit = mongoose.model('credit', creditSchema)

export default Credit