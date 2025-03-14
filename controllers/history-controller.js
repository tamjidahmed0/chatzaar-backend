import Message from "../schema/messages.js";


const historyController = async (req, res) => {
  const userIdFromHeader = req.headers['user_id'];


  try {
    const get_conversation =  (await Message.find({ userId: userIdFromHeader })).reverse()
   

    res.status(201).send(get_conversation) 




  } catch (error) {
    console.log(error)
  }

}

export default historyController