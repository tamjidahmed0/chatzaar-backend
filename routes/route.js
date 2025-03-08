import { Router } from "express";
import Chats from "../controllers/Chats.js";
import historyController from "../controllers/history-controller.js";
import lastHistoryController from "../controllers/last-history.js";
import getAllMessage from "../controllers/getAllMessage.js";
import passport from "passport";
import profile from "../controllers/profile.js";
import validateToken from "../middleware/validateToken.js";
import deleteHistory from "../controllers/delete-history.js";

const router = Router()


router.route('/chats').post(validateToken, Chats);
router.route('/history/:id').get(validateToken, historyController); 

router.route('/last-history/:id').get(validateToken, lastHistoryController)
router.route('/all-messages/:id').get(validateToken, getAllMessage);
router.route('/profile/:id').get(validateToken, profile);


router.route('/delete-history/:id').delete(validateToken, deleteHistory);

router.route('/auth/google').get(passport.authenticate("google", { scope: ["profile", "email"] }))
router.route('/auth/google/callback').get(passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {

    res.redirect(`${process.env.FRONTEND_REDIRECT_URL}/authenticate?token=${req.user.token}&&userId=${req.user.id}`)


})




export default router