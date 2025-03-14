import Message from "../schema/messages.js"

const getAllMessage = async (req, res) => {
    const conversationId = req.params.id
    try {
        const get_all = await Message.findById(conversationId)
        res.status(201).send(get_all.data.messages)
    } catch (error) {
        console.log(error)
    }

}

export default getAllMessage