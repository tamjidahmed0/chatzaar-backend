import User from "../schema/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();



const loginController = async(req, res) => {

    try {
        const { email, password } = req.body;

        const userSchema = await User.findOne({
            email: email,
            password: password
        })

        if (userSchema !== null) {
            const token = jwt.sign(
                { email:userSchema.email, id: userSchema._id },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );
            res.status(201).json({ token, user: userSchema._id , status:201});
        }


    } catch (error) {
        console.log(error)
    }

}

export default loginController