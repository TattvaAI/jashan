"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { Video } from "@/types/portfolio";

interface FilterableGridProps {
  videos: Video[];
}

export function FilterableGrid({ videos }: FilterableGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    videos.forEach(v => v.tags.forEach(t => tags.add(t)));
    return ["All", ...Array.from(tags)];
  }, [videos]);

  // Filter videos
  const filteredVideos = useMemo(() => {
    if (activeFilter === "All") return videos;
    return videos.filter(v => v.tags.includes(activeFilter));
  }, [videos, activeFilter]);

  if (!videos || videos.length === 0) return null;

  return (
    <section className="py-16 w-full max-w-6xl mx-auto px-4 md:px-6">
      <div className="mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b-8 border-black pb-4">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase">
          Projects
        </h2>
        
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 border-4 border-black font-black uppercase text-sm tracking-wider transition-all brutal-shadow ${
                activeFilter === tag 
                  ? "bg-primary text-black" 
                  : "bg-white text-black hover:bg-black hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredVideos.map((video, idx) => (
            <motion.div
              key={video.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={video.format === "portrait" ? "row-span-2" : "col-span-1 md:col-span-2 lg:col-span-2"}
            >
              <Dialog>
                <DialogTrigger render={
                  <button 
                    type="button"
                    className={`relative w-full h-full group overflow-hidden bg-white border-4 border-black brutal-shadow transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary text-left cursor-pointer ${video.format === "portrait" ? "aspect-[9/16]" : "aspect-video"}`}
                  />
                }>
                  {/* Thumbnail */}
                  <img 
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} 
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover filter grayscale-[100%] group-hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300 mix-blend-multiply" />
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-black flex items-center justify-center border-4 border-white transform scale-50 group-hover:scale-100 transition-all duration-300 brutal-shadow">
                      <Play className="w-8 h-8 text-white ml-2" fill="currentColor" />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex gap-2 flex-wrap max-w-[80%]">
                    {video.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-black bg-white border-2 border-black text-black uppercase brutal-shadow">
                        {tag}
                      </span>
                    ))}
                  </div>
                </DialogTrigger>
                
                {/* Modal Content */}
                <DialogContent className="max-w-6xl w-[95vw] p-0 bg-black border-8 border-black rounded-none brutal-shadow overflow-hidden">
                  <div className="relative w-full aspect-video bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
