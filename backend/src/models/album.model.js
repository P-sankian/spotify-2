import mongoose from "mongoose";

const albumsSchema = new mongoose.Schema({
   title: {type: String, required: true},
   artist: {type: String, required: true},
   imageURL: {type: String, required: true},
   releaseYear: {type: Number, required: true},
   songs: [{type: mongoose.Schema.Types.ObjectId, ref: "Songs"}],
}, {timestamps: true})


export const Albums = mongoose.model("Albums",albumsSchema);