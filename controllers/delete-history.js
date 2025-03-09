import Conversation from "../schema/conversations.js"
import Message from "../schema/messages.js"

const deleteHistory = async (req, res) => {
    const conversationId = req.params.id
    const userId = req.headers['user_id'];  
    try {
        await Conversation.findOneAndDelete({ 'data.conversationId': conversationId });
        await Message.deleteMany({ conversationId })
        const updatedConversations = await Conversation.find({ "data.userId": userId });

        res.status(200).json({ msg: 'Delete successful', conversations: updatedConversations });
    } catch (error) {
        console.log(error)
    }

}

export default deleteHistory