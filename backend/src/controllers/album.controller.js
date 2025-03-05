import { Albums } from "../models/album.model.js";
export const getAllAlbums = async (req, res, next) => {
    try {
        const albums = await Albums.find({});
        return res.status(200).json(albums);
    } catch (error) {
        next(error);
    }

}

export const getAlbumsById = async (req, res, next) => {
    try {
        const {albumId} = req.params;
        const album = await Albums.findById(albumId).populate("songs"); //ts soooooo coool
        if (!album) {
            return res.status(404).json({message: "album not found"});
        }
        res.status(200).json(album);
    } catch (error) {
        next(error);
    }

}