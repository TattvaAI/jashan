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
    <section className="py-16 w-full max-w-6xl mx-auto px-4 md:px-6">
      <div className="mb-12 flex items-end gap-6 border-b-8 border-black pb-4">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase">
          {title}
        </h2>
      </div>

      <div className={`grid gap-8 ${aspectRatio === "portrait" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2"}`}>
        {videos.map((video, idx) => (
          <Dialog key={video.id + idx}>
            <DialogTrigger render={
              <button 
                type="button"
                className={`relative group overflow-hidden bg-white border-4 border-black brutal-shadow transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary text-left cursor-pointer ${aspectRatio === "portrait" ? "aspect-[9/16]" : "aspect-video"}`}
              />
            }>
              {/* Thumbnail */}
              <img 
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} 
                alt={`${title} Video`}
                className="w-full h-full object-cover filter grayscale-[100%] group-hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300 mix-blend-multiply" />
              
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-20 h-20 bg-black flex items-center justify-center border-4 border-white transform scale-50 group-hover:scale-100 transition-all duration-300 brutal-shadow">
                  <Play className="w-8 h-8 text-white ml-2" fill="currentColor" />
                </div>
              </div>

              {/* Category Badge */}
              {video.category && (
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 text-sm font-black bg-white border-4 border-black text-black uppercase brutal-shadow">
                    {video.category}
                  </span>
                </div>
              )}
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
        ))}
      </div>
    </section>
  );
}
