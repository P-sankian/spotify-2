import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useMusicStore } from "@/stores/useMusicStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Clock, Pause, Play } from "lucide-react";
import { usePlayerStore } from "@/stores/usePlayerStore";

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};


export const AlbumPage = () => {
  const {albumID} = useParams()
  const {fetchAlbumById,currentAlbum, isLoading} = useMusicStore();
  const {currentSong, isPlaying,playAlbum,togglePlay} = usePlayerStore();

  useEffect(()=>{
    if(albumID)fetchAlbumById(albumID);
  },[fetchAlbumById,albumID])
  if (isLoading) return null;

  const handlePlayAlbum = () => {
    if (!currentAlbum) return
    const isCurrentAlbumPlaying = currentAlbum?.songs.some(song => song._id === currentSong?._id);
    if (isCurrentAlbumPlaying) togglePlay();
    else {
      playAlbum(currentAlbum?.songs, 0);
    }
  }

  const handlePlaySong = (index : number) => {
    if (!currentAlbum) return
    playAlbum(currentAlbum.songs,index )
  }
   

  return (
    <div className="h-full">
      <ScrollArea className="h-full  rounded-md">
        {/* main content */}
        <div className="relative min-h-full ">
          {/* background gradient */}
          <div
						className=' absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
					 to-zinc-900 pointer-events-none'
						aria-hidden='true'
					/>
          {/* content */}
          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <img src={currentAlbum?.imageURL} alt={currentAlbum?.title}
              className="w-[240px] h-[240px] shadow-xl rounded"/>
              <div className="flex flex-col justify-center ">
                <p className="text-sm font-bold ">Album</p>
                <h1 className="text-7xl font-bold my-4">{currentAlbum?.title}</h1>
                <div className="flex items-center gap-2 text-sm text-zind-100">
                  <span className="font-medium text-white">{currentAlbum?.artist}</span>
                  <span>• {currentAlbum?.songs.length} Songs</span>
                  <span>• Released at {currentAlbum?.releaseYear}</span>
                  
                  </div>

              </div>

            </div>
            {/* play button */}
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
               onClick={handlePlayAlbum} 
               size='icon' className="size-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all">
                {isPlaying && currentAlbum?.songs.some(song=> song._id === currentSong?._id) ? (
                  <Pause className="size-7 text-black"/>
                ): (
                  <Play className="size-7 text-black" />
                )}

              </Button>
            </div>
            {/* table */}
            <div className="bg-black/20 backdrop-blur-sm">
            {/* table header */}
            <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                <div>#</div>
                <div>Title</div>
                <div>relased date</div>
                <div> <Clock className="size-4"/></div>
            </div>
            {/* table body(songs ) */}
            <div className="px-6 ">
              <div className="space-y-2 py-4 ">
                {currentAlbum?.songs.map((song,index)=> { 
                const isCurrentSong = currentSong?._id === song._id
                return (
                  <div key={song._id} 
                  onClick={()=> handlePlaySong(index)}
                  
                  className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                    text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
                    `}><div className="flex items-center justify-center ">
                      { isCurrentSong && isPlaying? (
                        <div className="size-4 text-green-500">♫</div>
                      ): (
                        <span className="group-over:hidden ">{index+1}</span>

                      )}
                      {!isCurrentSong && (
                        <Play className="h-4 w-4 hidden group-hover:block"/>
                      )}
                     </div> 
                     <div className="flex items-center gap-3 ">
                      <img src={song.imageURL} alt={song.title} className="size-10 rounded-md"/>
                      <div>
                        <div className="font-medium text-white">{song.title}</div>
                        <div className="text-xs text-zinc-400">{song.artist}</div>
                      </div>
                       

                     </div>
                     <div className="flex items-center ">{song.createdAt.split("T")[0]}</div>
                       <div className='flex items-center'>{formatDuration(song.duration)}</div>
                  </div>
                )
            }
            )}
              </div>
            </div>

            </div>

          </div>


        </div>

      </ScrollArea>
    </div>

  ) 
}