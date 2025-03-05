import {create} from "zustand";
import { Songs } from "@/types";

interface PlayerStore {
    currentSong: Songs | null;
    isPlaying: boolean;
    queue: Songs[];
    currentIndex: number;
    initializeQueue: (songs: Songs[])=> void;
    playAlbum: (songs: Songs[], startIndex?: number) => void;
    setCurrentSong: (song: Songs | null) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void; 
}


export const usePlayerStore = create<PlayerStore>((set,get) => ({
      





}));