"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { Video } from "@/types/portfolio";

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
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex items-center gap-6"
      >
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground uppercase">
          {title}
        </h2>
        <div className="h-[1px] flex-1 bg-border"></div>
      </motion.div>

      <div className={`grid gap-6 ${aspectRatio === "portrait" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"}`}>
        {videos.map((video, idx) => (
          <Dialog key={video.id + idx}>
            <DialogTrigger render={
              <button 
                type="button"
                className={`relative group overflow-hidden bg-muted cursor-pointer border border-border transition-all hover:border-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-left ${aspectRatio === "portrait" ? "aspect-[9/16]" : "aspect-video"}`}
              />
            }>
              {/* Thumbnail */}
              <img 
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} 
                alt={`${title} Video`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center transform scale-75 group-hover:scale-100 transition-all duration-500 ease-out shadow-xl">
                  <Play className="w-6 h-6 text-background ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Category Badge */}
              {video.category && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-medium bg-background text-foreground uppercase tracking-wider">
                    {video.category}
                  </span>
                </div>
              )}
            </DialogTrigger>
            
            {/* Modal Content */}
            <DialogContent className="max-w-5xl w-full p-0 bg-black border-border overflow-hidden rounded-none">
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
