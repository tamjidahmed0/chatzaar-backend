import User from "../schema/user.js";
import jwt from 'jsonwebtoken'

const validateToken = async (req, res, next) => {
    try {
        // Extract the token from Authorization header
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided or incorrect format' });
        }

     
        const token = authHeader.split(' ')[1];

        // Get user ID from headers
        const userIdFromHeader = req.headers['user_id'];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const emailFromToken = decoded.email;

        

        // Find user by email
        const user = await User.findOne({ email: emailFromToken });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user ID matches the one in the header
        if (user._id.toString() !== userIdFromHeader) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        // Attach user to request and proceed
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
};

export default validateToken;