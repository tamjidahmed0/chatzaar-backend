import Conversation from "../schema/conversations.js"


const lastHistoryController = async (req, res) => {

    const userId = req.params.id


    try {
        const get_last_conversation = await Conversation.findOne({
            "data.userId": userId
        }).sort({ createdAt: -1 })
        res.status(201).send(get_last_conversation)
    } catch (error) {

    }

}

export default lastHistoryController