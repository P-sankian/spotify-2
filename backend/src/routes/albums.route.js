import { Router } from "express";
import { getAllAlbums, getAlbumsById } from "../controllers/album.controller.js";

const router = Router();

router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumsById);



export default router;