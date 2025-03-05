import { User } from "../models/user.model.js";
import { Albums } from "../models/album.model.js";
import { Songs } from "../models/songs.model.js";


export const getStats = async (req,res, next)=> {
    try {
        // const totalSongs = await Songs.countDocuments();
        // const totalAlbums = await Albums.countDocuments();
        // const totalUsers = await User.countDocuments();
        const [totalSongs, totalAlbums, totalUsers,uniqueArtists]  = await Promise.all([
            Songs.countDocuments(),
            Albums.countDocuments(),
            User.countDocuments(),
            Songs.aggregate([
                {
                    $unionWith: {
                        coll:"albums",
                        pipeline: []
  
                    }
                },
                {
                    $group: {_id:"$artist" }
                },
                {
                    $count: "count"
                }
            ])
        ]); // optimized 

        return res.status(200).json({totalSongs, totalAlbums, totalUsers, totalArtists: uniqueArtists[0]?.count || 0});
        
    } catch (error) {
        next(error);
    }
  
}