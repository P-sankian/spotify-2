import { Songs } from "../models/songs.model.js";
export const getAllSongs = async (req, res, next) => {
    try {
        const songs = await Songs.find({}).sort({createdAt: -1}); //-1 means newest to the oldest
        return res.status(200).json(songs);
    } catch (error) {
        next(error);
    }

}
// export const getSongsById = async (req, res, next) => {
//     try {
//         const {songId} = req.params;
//         const song = await Songs.findById(songId).populate("albumID");
//         if (!song) {
//             return res.status(404).json({message: "song not found"});
//         }
//         res.status(200).json(song);
//     } catch (error) {
//         next(error);
//     }

// }

export const getFeaturedSongs = async (req, res, next) => {
 try {
    //fetch 6 random songs
    const songs = await Songs.aggregate([    
        {$sample: {size: 6}},
        {$project: {
            _id:1,
            title: 1,
            artist: 1,
            imageURL: 1,
            audioURL: 1
        }}
    ])
    res.json(songs);
    
 } catch (error) {
    next(error);
 }
}

export const getMadeForYouSongs = async (req, res, next) => {
    
    try {
        //fetch 4 random songs
        const songs = await Songs.aggregate([    
            {$sample: {size: 4}},
            {$project: {
                _id:1,
                title: 1,
                artist: 1,
                imageURL: 1,
                audioURL: 1
            }}
        ])
        res.json(songs);
        
     } catch (error) {
        next(error);
     }
}

export const getTrendingSongs = async (req, res, next) => { 

     
    try {
        //fetch 4 random songs
        const songs = await Songs.aggregate([    
            {$sample: {size: 4}},
            {$project: {
                _id:1,
                title: 1,
                artist: 1,
                imageURL: 1,
                audioURL: 1
            }}
        ])
        res.json(songs);
        
     } catch (error) {
        next(error);
     }    //no fancy algorithms here lil bro, we rawdoggin ts



    
}