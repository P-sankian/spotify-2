import {create} from "zustand";
import { axiosInstance } from "@/lib/axios";
import { Songs, Albums } from "@/types";

interface MusicStore {
    songs : Songs[],
    albums : Albums[],
    isLoading : boolean,
    error : string | null,
    fetchAlbums : () => Promise<void>,
    fetchAlbumById : (id: string ) => Promise<void>
    currentAlbum : Albums | null;
}

export const useMusicStore = create<MusicStore>((set) => ({
    albums : [],
    songs : [],
    isLoading: false,
    error : null,
    currentAlbum: null,

    fetchAlbums: async ()=> {
        set({isLoading: true,error: null});
        try {
            const response = await axiosInstance.get("/albums");
            set({albums: response.data})

            
        } catch (error:any) {
            set({error: error.response.data.message})
            
        } finally {
            set({isLoading: false})
        }

    },
    fetchAlbumById: async (id) => {
        set({isLoading: true,error: null});
        try {
            const response = await axiosInstance.get(`/albums/${id}`); // get album details by id
            set({currentAlbum: response.data})
        }
        catch(error:any) {
            set({error: error.response.data.message})
        } finally {
            set({isLoading: false})
        }
  

}

}))