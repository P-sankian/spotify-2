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
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,
    initializeQueue: (songs: Songs[]) => {
        set({
            queue: songs,
            currentSong: get().currentSong || songs[0],
            currentIndex: get().currentIndex < 0 ? 0 : get().currentIndex


        })
    },
    playAlbum: (songs: Songs[], startIndex=0) => {
        if ( !songs.length) return
        const song = songs[startIndex]
        set({
            queue: songs,
            currentSong: song,
            currentIndex: startIndex,
            isPlaying: true
        })

    },
    setCurrentSong: (song: Songs | null) => {
        if (!song) return;
        const songIndex = get().queue.findIndex(s =>s._id ===song._id)
        set({currentSong: song, 
            isPlaying: true,
            currentIndex: songIndex
        })
    },
    togglePlay: () => {
        const willStartPlaying = !get().isPlaying;
        set({
            isPlaying: willStartPlaying,

        })
    },
    playNext: () => {
        const {currentIndex, queue} = get();
        const nextIndex = currentIndex + 1

        if (nextIndex < queue.length) {
            const nextSong = queue[nextIndex]
            set({
                currentSong: nextSong,
                currentIndex: nextIndex,
                isPlaying: true
            })
        }
        else {
            set({isPlaying: false})
        }
    },
    playPrevious : () => {
        const {currentIndex, queue} = get();
        const previousIndex = currentIndex - 1;
        if (previousIndex >= 0) {
            const previousSong = queue[previousIndex]
            set({
                currentSong: previousSong,
                currentIndex: previousIndex,
                isPlaying: true
            })
        }
        else {
            set({isPlaying: false})
        }

    }
}));