import { getAllSongs, getFeaturedSongs,getMadeForYouSongs,getTrendingSongs } from "../controllers/songs.controller.js";
import { Router } from "express";
import {protectRoute, requireAdmin} from "../middleware/auth.middleware.js";
const router = Router();

router.get("/", protectRoute, requireAdmin,getAllSongs);
//router.get("/:songId", getSongsById);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);


export default router;