import { Albums } from "../models/album.model.js";
import { Songs } from "../models/songs.model.js";
import cloudinary from "../lib/cloudinary.js";
// helper function
const uploadToCloudinary = async(file) => {
   try{
     const result = await cloudinary.uploader.upload(file.tempFilePath, {
        resource_type: "auto",

     })
     return result.secure_url;
   }
   
   catch(error) {
    console.log("error in upload ", error);
    throw new Error("error uploading to cloudinary"); // craaaazy error handling lwk

   }
}

export const createSong = async (req,res, next) => {
    try{
         if (!req.files || req.files.audioFile || req.files.imageFile) {
            return res.status(400).json({message: "please upload all files"})

         }
         const {title, artist, albumID, duration} = req.body;
         const audioFile =req.files.audioFile;
         const imageFile = req.files.imageFile;

         const audioURL = await uploadToCloudinary(audioFile);
         const imageURL = await uploadToCloudinary(imageFile);


         const song = new Songs({
            title,
            artist,
            audioURL,
            imageURL,
            duration,
            albumID: albumID || null //names and links


         })
         await song.save();
         //if song is linked with an album
         if (albumID) {
            await Albums.findByIdAndUpdate(albumID, {
                $push: {songs: song._id}
            })
         }
         res.status(201).json(song)
    

    }
    catch(error){
        console.log("error in creating song ", error);
        next(error);

        




    }
    
    
       

}

export const deleteSong = async( req, res, next) => {
    try {
        const {id} = req.params
        const song = await Songs.findById(id)
        //if song belongs to an album
        if(song.albumID) {
            await Albums.findByIdAndUpdate(song.albumID, {
                $pull : {songs: song._id} // tuff
            })
        }
        await Songs.findByIdAndDelete(id)
        return res.status(200).json({message: "song deleted"});

    } catch (error) {
        console.log("error in deleting song", error)
        next(error);
        
    }
}

export const createAlbum = async( req, res, next) => {
   try {
    const {title, artist, releaseYear} = req.body
    const {imageFile} = req.files
    const imageURL = await uploadToCloudinary(imageFile)
    const album = new Albums({
        title,
        artist,
        imageURL,
        releaseYear
         })
    await album.save()
    res.status(201).json(album);

   } 
   catch (error) {

    console.log("error making the album ", error);
    next(error);

   }
}


export const deleteAlbum = async( req, res, next) => {
    try {
        const {id} = req.params;
        await Songs.deleteMany({albumID: id});
        await Albums.findByIdAndDelete(id);
        res.status(200).json({message: "album deleted succesfully"});


        
    } catch (error) {
        console.log("error while deleting album ", error );
        next(error);
        
    }
    
}

export const checkAdmin = async (req, res, next) => {
    res.status(200).json({admin: true})

}