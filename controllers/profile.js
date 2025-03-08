import User from "../schema/user.js"

const profile = async(req, res) => {
    const userId = req.params.id
    try {
        const searchUser = await User.findById(userId)
        res.status(201).send(searchUser)
    } catch (error) {
        console.log(error)
    }

}

export default profile