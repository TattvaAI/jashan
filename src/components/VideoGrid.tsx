"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface Video {
  id: string;
  type: string;
  category?: string;
}

interface VideoGridProps {
  title: string;
  videos: Video[];
  aspectRatio?: "video" | "portrait";
}

export function VideoGrid({ title, videos, aspectRatio = "video" }: VideoGridProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="py-12 w-full max-w-6xl mx-auto px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex items-center gap-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground/90">
          {title}
        </h2>
        <div className="h-[1px] flex-1 bg-border/50"></div>
      </motion.div>

      <div className={`grid gap-6 ${aspectRatio === "portrait" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"}`}>
        {videos.map((video, idx) => (
          <Dialog key={video.id + idx}>
            <DialogTrigger render={
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative group overflow-hidden rounded-xl cursor-pointer glass border-white/5 ${aspectRatio === "portrait" ? "aspect-[9/16]" : "aspect-video"}`}
              />
            }>
                {/* Thumbnail */}
                <img 
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} 
                  alt={`${title} Video`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to hqdefault if maxresdefault is missing
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30 transform scale-75 group-hover:scale-100 transition-all duration-500 ease-out">
                    <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Category Badge */}
                {video.category && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-md border border-white/10">
                      {video.category}
                    </span>
                  </div>
                )}
            </DialogTrigger>
            
            {/* Modal Content */}
            <DialogContent className="max-w-5xl w-full p-0 bg-black border-white/10 overflow-hidden">
              <div className="relative w-full aspect-video">
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
        ))}
      </div>
    </section>
  );
}
