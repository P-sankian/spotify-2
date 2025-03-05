import { clerkClient } from "@clerk/express";
// do we need to import dotenv?
export const protectRoute = async(req, res, next) => { 
    if(!req.auth.userId) {
         return res.status(401).json({message: "unauthorized"});
       
    }
    next(); //madly important

}

export const requireAdmin = async(req,res,next) => {
    try{
      const currentUser = await clerkClient.users.getUser(req.auth.userId);
      const isAdmin= process.env.ADMIN_EMAIL ===   currentUser.primaryEmailAddress?.emailAddress;
      if (!isAdmin) {
          return res.status(403).json({message: "anuthorized, you're not the admin"})
         
      }
      next();

    }
    catch(error) {
        next(error)
    }
}

