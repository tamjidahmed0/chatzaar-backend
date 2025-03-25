import axios from "axios"
import Message from "../schema/messages.js"
import dotenv from 'dotenv'
dotenv.config()

const Chats = async (req, res) => {
    const { conversationId } = req.query
    const data = req.body;
    const userIdFromHeader = req.headers['user_id'];
 
    try {
        if (!data) {
            return res.status(400).json({ error: "Content is required" });
        }
  
        const check_existence = await Message.findOne({ _id: conversationId });

        if (check_existence === null) {
            const response = await axios.post(`${process.env.AI_URI}`,
                data,
                { headers: { 'authorization': process.env.AI_API_KEY } } 
            );
            const save_message = await new Message({_id:conversationId, data, userId: userIdFromHeader }).save()
            await Message.findOneAndUpdate({ _id: save_message._id }, { $push: { "data.messages": response.data.choices[0].message } })
            res.status(201).send(response.data.choices[0].message)

        } else {

            const response = await axios.post(`${process.env.AI_URI}`,
                {
                    messages: [...check_existence.data.messages, ...data.messages],
                    model: data.model
                },

                { headers: { 'authorization': process.env.AI_API_KEY } }
            );

            const save_message = await Message.findOneAndUpdate({ _id: conversationId }, { $push: { "data.messages": data.messages[0] } })
            await Message.findOneAndUpdate({ _id: save_message._id }, { $push: { "data.messages": response.data.choices[0].message } })

            res.status(201).send(response.data.choices[0].message)


        }


    } catch (error) {
        console.log(error.message, 'error')
        res.status(500).send({ msg: "Error" })
    }

}

export default Chats