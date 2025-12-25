import express from 'express'
import cors from 'cors';
import router from './routes/route.js'
import passport from "passport";
import session from "express-session";
import connectDB from './database/db.config.js';
import dotenv from 'dotenv'
dotenv.config()
import './config/passport.js'






const app = express()
const PORT =  process.env.PORT || 4000

app.use(cors());
app.use(express.json());   
app.use(express.urlencoded({ extended: true }));  
app.disable('x-powered-by');


app.use(
    session({
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  ); 
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', router) 




app.listen(PORT, async()=>{
console.log(`server connected to port ${PORT}`)

const db_connection = await connectDB()


if (db_connection) {
  console.log('mongodb connected')

} else {
  console.log('mongodb not connected')
}

})