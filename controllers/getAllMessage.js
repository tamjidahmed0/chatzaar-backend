import Message from "../schema/messages.js"

const getAllMessage = async (req, res) => {
    const conversationId = req.params.id
    try {
        const get_all = await Message.find({
            conversationId
        })

      
        res.status(201).send(get_all)
    } catch (error) {

    }

}

export default getAllMessage