import { User } from "../models/user.model.js";
export const getAllUsers = async (req, res, next) => {
     try {
          const currentUserId = req.auth.userId;
          const users = await User.find({clerkID: {$ne: currentUserId}}); //all user except the curent one
          return res.status(200).json(users);
        
     } catch (error) {
        next(error);
     }
}