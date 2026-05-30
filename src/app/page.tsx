import { Hero } from "@/components/Hero";
import { VideoGrid } from "@/components/VideoGrid";
import data from "@/data.json";

export default function Page() {
  return (
    <main className="min-h-screen bg-transparent pb-24">
      <Hero 
        profile={data.profile}
        contact={data.contact}
        skills={data.skills}
      />
      
      <div className="space-y-12 md:space-y-24 mt-12">
        <VideoGrid 
          title="Showreel" 
          videos={data.videos.showreel} 
          aspectRatio="video"
        />
        <VideoGrid 
          title="Long-Form Content" 
          videos={data.videos.longForm} 
          aspectRatio="video"
        />
        <VideoGrid 
          title="Short-Form Content" 
          videos={data.videos.shortForm} 
          aspectRatio="portrait"
        />
      </div>
    </main>
  );
}
