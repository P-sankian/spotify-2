import TopBar from "@/components/TopBar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { useUser } from "@clerk/clerk-react";

const HomePage = () => {
  const {user} = useUser();
  const {featuredSongs,trendingSongs,madeForYouSongs,fetchFeaturedSongs,fetchTrendingSongs,fetchMadeForYouSongs,isLoading} = useMusicStore();
  useEffect(()=> {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs,fetchMadeForYouSongs,fetchTrendingSongs])
  console.log("made for you: ",madeForYouSongs);
  console.log("trending: ",trendingSongs);
  console.log("featured: ", featuredSongs)


  return (
    <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <TopBar/>
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold m-b6 ">Good afternoon, {user?.firstName}</h1>
          <FeaturedSection/>
        
        <div className="space-y-8 ">
          {<SectionGrid title="Made for you" songs={madeForYouSongs} isLoading={isLoading} />}
          <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading}/>

          
        </div>
        </div>

      </ScrollArea>
    </div>
  )
}

export default HomePage