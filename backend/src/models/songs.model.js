import mongoose from "mongoose";

const songsShema = new mongoose.Schema({
   title : {
    type: String,
    required: true
   },
   artist : {
    type : String,
    required: true
   },
   imageURL : {
    type : String,
    required: true
   },
   audioURL : {
    type : String,
    required: true
   },
   duration: {
    type: Number,
    required: true
   },
   albumID : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Albums', // this is how you reference stuff in mongoose db
    required: false
   }




}, { timestamps: true});


export const Songs = mongoose.model("Songs",songsShema);
