import User from "../schema/user.js"
import Credit from "../schema/credit.js"


const credit = async() => {

    const users = await User.find({})

    for (const user of users) {
        const existing = await Credit.findOne({ userId: user._id });
        if (!existing) {
            await Credit.create({ userId: user._id, credits: 50 });
        }
    }
    console.log("Credit migration completed")

 
}

export default credit