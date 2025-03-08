import passport from "passport";
import User from "../schema/user.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
    
      const token = jwt.sign(
        { email: profile.emails[0].value },
        process.env.JWT_SECRET, 
        { expiresIn: "1d" } 
      );
    
      const check_user = await User.findOne({email:profile.emails[0].value})

      if(check_user === null){
      const newUser =  await new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            photo:profile.photos[0].value
          }).save()

          return done(null, { profile, token, id: newUser._id });
      }else{
        return done(null, { profile, token , id: check_user._id});
      }

    

      
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
