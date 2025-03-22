import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()


const spinUp = () => {

    /*
    network request to always spin up the server every 10 minutes.
    This is to prevent the server from sleeping and to keep the server active
    only for free tier servers like render 
    */


    const spinUpServer = () => {
        axios.get(`${process.env.SPINUP_URL}/api/health`)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })



    }

    setInterval(spinUpServer, 600000);



}

export default spinUp