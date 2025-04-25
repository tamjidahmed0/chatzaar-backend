import Credit from "../schema/credit.js";



const credit = async(req, res) => {
    const userIdFromHeader = req.headers['user_id'];
    try {
        const userCredit = await Credit.findOne({ userId: userIdFromHeader });
        if (userCredit) {
            return res.status(201).json({ msg:userCredit.credits });
        }
     
    } catch (error) {
        console.log(error);
        
    }

}

export default credit