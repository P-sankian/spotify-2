import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react"



const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const previousSongRef=  useRef<string | null>(null);
  const {currentSong,isPlaying,playNext} = usePlayerStore();
  //handle play and pause logic
  useEffect(()=> {
    if(isPlaying) {
      audioRef.current?.play();
      
    }else audioRef.current?.pause();
  }, [isPlaying])
  //hadnle song end
  useEffect(()=> {
    const handleEnded = () => {
      playNext();
    }
    const audio = audioRef.current
    audio?.addEventListener('ended', handleEnded)
    return () => audio?.removeEventListener("ended", handleEnded)

  }, [playNext])

  //handle song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong ) return;
    const audio = audioRef.current
    // is this a new song?
    const isSongChange = previousSongRef.current !== currentSong?.audioURL
    if (isSongChange) {
      audio.src =currentSong?.audioURL
      //reset the playback
      audio.currentTime= 0
      previousSongRef.current = currentSong?.audioURL //neat trick
      if (isPlaying) audio.play();
    }
  },[currentSong,isPlaying])
  return (
     <audio ref={audioRef}/>
  )
}

export default AudioPlayer