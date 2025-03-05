export interface Songs {
    _id : string,
    title : string,
    artist : string,
    imageURL : string,
    audioURL : string,
    duration : number,
    albumID : string | null,
    createdAt: string,
    updatedAt: string

}

export interface Albums {
    _id : string,
    title : string,
    artist : string,
    imageURL : string,
    releaseYear : number,
    songs : Songs[],
    createdAt: string,
    updatedAt: string
}