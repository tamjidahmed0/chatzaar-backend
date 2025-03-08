import Conversation from "../schema/conversations.js"


const historyController = async (req, res) => {

    const userId = req.params.id


    try {
        const get_conversation = await Conversation.find({
            "data.userId": userId
        }).sort({ _id: -1 });
        res.status(201).send(get_conversation)

    } catch (error) {

    }

}

export default historyController