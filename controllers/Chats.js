import axios from "axios"
import Message from "../schema/messages.js"
import dotenv from 'dotenv'
import Credit from "../schema/credit.js"
import moment from "moment";
dotenv.config()

const Chats = async (req, res) => {
    const { conversationId } = req.query
    const data = req.body;
    const userIdFromHeader = req.headers['user_id'];


    try {
        const userCredit = await Credit.findOne({ userId: userIdFromHeader });
        const existingMessage = await Message.findOne({ _id: conversationId });

        const getAIResponse = async (payload) => {
            const response = await axios.post(process.env.AI_URI, payload, {
                headers: { authorization: process.env.AI_API_KEY }
            });
            return response.data.choices[0].message;
        };

        const resetCreditsIfNeeded = async () => {
            const lastUpdate = moment(userCredit.updatedAt).utc();
            const now = moment().utc();
            const diffInDays = now.diff(lastUpdate, 'days');

            if (diffInDays >= 1) {
                await Credit.findOneAndUpdate(
                    { userId: userIdFromHeader },
                    { $inc: { credits: 10 } }
                );
                return true;
            } else {
                const nextResetTime = lastUpdate.add(1, 'day').toISOString();
                res.status(403).json({ msg: `${nextResetTime}`, status: 403 });
                return false;
            }
        };

        const handleNewConversation = async () => {
            if (userCredit.credits === 0 && userCredit.credits !== 'unlimited') {
                const canReset = await resetCreditsIfNeeded();
                if (!canReset) return;
            }

            const message = await getAIResponse(data);
            const savedMessage = await new Message({
                _id: conversationId,
                data,
                userId: userIdFromHeader
            }).save();

            await Message.findOneAndUpdate(
                { _id: savedMessage._id },
                { $push: { "data.messages": message } }
            );

            if (userCredit.credits !== 'unlimited') {
                const reminingCredits = await Credit.findOneAndUpdate(
                    { userId: userIdFromHeader },
                    { $inc: { credits: -1 } },
                    { new: true }
                );

                res.status(201).send({message, credits:reminingCredits.credits});
            }
     
        }; 

        const handleExistingConversation = async () => {
            const preparePayload = {
                messages: [...existingMessage.data.messages, ...data.messages],
                model: data.model
            };

            if (userCredit.credits === 0 && userCredit.credits !== 'unlimited') {
                const canReset = await resetCreditsIfNeeded();
                if (!canReset) return;
            }

            const message = await getAIResponse(preparePayload);

            await Message.findOneAndUpdate(
                { _id: conversationId },
                { $push: { "data.messages": data.messages[0] } }
            );

            await Message.findOneAndUpdate(
                { _id: conversationId },
                { $push: { "data.messages": message } }
            );

            if (userCredit.credits !== 'unlimited') {
               const reminingCredits = await Credit.findOneAndUpdate(
                    { userId: userIdFromHeader },
                    { $inc: { credits: -1 } },
                    { new: true }
                );

                console.log(reminingCredits, 'line 101')
                res.status(201).send({message, credits:reminingCredits.credits});
            }

            
        };

        if (!existingMessage) {
            await handleNewConversation();
        } else {
            await handleExistingConversation();
        }

    } catch (error) {
        console.error("Error handling message:", error.message);
        res.status(500).json({ msg: "Server Error" });
    }

}

export default Chats