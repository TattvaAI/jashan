"use client";

import { motion } from "framer-motion";
import { BadgeCheck, MapPin, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroProps {
  profile: {
    name: string;
    bio: string;
    location: string;
    availability: string;
  };
  contact: { platform: string; href: string; text: string }[];
  skills: {
    niches: string[];
    languages: string[];
    software: string[];
  };
}

export function Hero({ profile, contact, skills }: HeroProps) {
  return (
    <section className="relative w-full py-24 lg:py-32 overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Cinematic background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container px-4 md:px-6 max-w-4xl flex flex-col items-center space-y-8"
      >
        {/* Availability Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          {profile.availability}
        </motion.div>

        {/* Name & Title */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">
            {profile.name}
            <BadgeCheck className="inline-block ml-3 w-10 h-10 text-primary -translate-y-2" />
          </h1>
          <p className="mx-auto max-w-[600px] text-lg md:text-xl text-muted-foreground leading-relaxed">
            {profile.bio}
          </p>
        </div>

        {/* Details (Location, Niches) */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-5 h-5" />
            <span>{profile.location}</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-border hidden sm:block" />
          <div className="flex flex-wrap gap-2">
            {skills.niches.map((niche) => (
              <Badge key={niche} variant="secondary" className="glass bg-transparent hover:bg-white/10">
                {niche}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto"
        >
          <Button size="lg" className="h-14 px-8 text-lg font-semibold rounded-full group relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors z-10"></div>
            <span className="relative z-20 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Hire Me
            </span>
          </Button>
          
          <div className="flex gap-2">
            {contact.map((c) => (
              <a 
                key={c.platform}
                href={c.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={c.platform}
                className={`inline-flex items-center justify-center shrink-0 h-14 w-14 rounded-full glass hover:bg-white/10 border border-white/10 text-foreground transition-all focus-visible:outline-none focus-visible:ring-2`}
              >
                {c.platform === "Email" ? <Mail className="w-5 h-5" /> : c.text[0]}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
