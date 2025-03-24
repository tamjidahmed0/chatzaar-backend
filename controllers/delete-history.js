import Message from "../schema/messages.js"

const deleteHistory = async (req, res) => {
    const conversationId = req.params.id
    const userId = req.headers['user_id'];
    try {
         await Message.findOneAndDelete({
            _id: conversationId,
            userId
        });

        const updatedMessages = (await Message.find({ userId })).reverse();

        res.status(201).send(updatedMessages)

    } catch (error) { 
        console.log(error)
    }

}

export default deleteHistory