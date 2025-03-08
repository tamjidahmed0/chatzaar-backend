import axios from "axios"
import Message from "../schema/messages.js"
import Conversation from "../schema/conversations.js"
import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

const Chats = async (req, res) => {
    const { user_id, auth_token } = req.headers
    const { conversationId } = req.query
    const data = req.body;
    const content = data.messages[0].content


    try {
        if (!data) {
            return res.status(400).json({ error: "Content is required" });
        }

        const response = await axios.post(`${process.env.ECHOGGPT_URI}`,
            data,
            { headers: { 'x-api-key': process.env.ECHOGPT_API_KEY } }
        );
       


        const check_conversation = await Conversation.findOne({
            'data.conversationId': conversationId
        })



        if (check_conversation === null) {

            const save_conversation = await new Conversation({
                data: {

                    userId: user_id,
                    content: content
                }
            }).save()


            await new Message({ data, conversationId: save_conversation.data.conversationId }).save()
            await new Message({ data: response.data, conversationId: save_conversation.data.conversationId }).save()


        } else {

            await new Message({ data, conversationId: conversationId }).save()
            await new Message({ data: response.data, conversationId: conversationId }).save()



        }




        res.status(201).send(response.data)






    } catch (error) {
        res.status(500).send({ msg: "Error" })
    }

}

export default Chats