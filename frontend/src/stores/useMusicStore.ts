import {create} from "zustand";
import { axiosInstance } from "@/lib/axios";
import { Songs, Albums } from "@/types";

interface MusicStore {
    songs : Songs[];
    albums : Albums[];
    error : string | null;
    isLoading : boolean;
    currentAlbum : Albums | null
    madeForYouSongs : Songs[];
    trendingSongs : Songs[];
    featuredSongs : Songs[]
    
    
   
    fetchAlbums : () => Promise<void>;
    fetchAlbumById : (id: string ) => Promise<void>;
    fetchFeaturedSongs : () => Promise<void>;
    fetchTrendingSongs : () => Promise<void>;
    fetchMadeForYouSongs : () => Promise<void>;
    
    
}

export const useMusicStore = create<MusicStore>((set) => ({
    albums : [],
    songs : [],
    madeForYouSongs: [],
   trendingSongs: [],
   featuredSongs: [],
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
  

},
   
   fetchFeaturedSongs: async () => {
      set({isLoading:true, error: null});
      try {
        const response = await axiosInstance.get("/songs/featured");
        set({featuredSongs: response.data});

      } catch (error:any) {
        set({error: error.response.data.message})
      }finally {
        set({isLoading: false})
      }
   },
   fetchTrendingSongs: async () => {
    set({isLoading:true, error: null});
    try {
      const response = await axiosInstance.get("/songs/trending");
      set({trendingSongs: response.data});

    } catch (error:any) {
      set({error: error.response.data.message})
    }finally {
      set({isLoading: false})
    }





   },
   fetchMadeForYouSongs: async () => {


    set({isLoading:true, error: null});
      try {
        const response = await axiosInstance.get("/songs/made-for-you");
        set({madeForYouSongs: response.data});

      } catch (error:any) {
        set({error: error.response.data.message})
      }finally {
        set({isLoading: false})
      }
   },


}))