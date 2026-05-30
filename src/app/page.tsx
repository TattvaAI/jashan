import { Hero } from "@/components/Hero";
import { FilterableGrid } from "@/components/FilterableGrid";
import rawData from "@/data.json";
import type { PortfolioData } from "@/types/portfolio";

const data = rawData as unknown as PortfolioData;

export default function Page() {
  return (
    <main className="min-h-screen bg-transparent pb-24">
      <Hero 
        profile={data.profile}
        contact={data.contact}
        skills={data.skills}
      />
      
      <div className="space-y-12 md:space-y-24 mt-12">
        <FilterableGrid videos={data.videos} />
      </div>
    </main>
  );
}
