"use client";

import { motion } from "framer-motion";
import { BadgeCheck, MapPin, Mail, ArrowRight } from "lucide-react";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Profile, Contact, Skills } from "@/types/portfolio";

interface HeroProps {
  profile: Profile;
  contact: Contact[];
  skills: Skills;
}

export function Hero({ profile, contact, skills }: HeroProps) {
  // Helper to map platform name to its icon
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
      case "x":
        return <FaXTwitter className="w-5 h-5" />;
      case "instagram":
        return <FaInstagram className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <section className="relative w-full py-24 lg:py-32 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container px-4 md:px-6 max-w-4xl flex flex-col items-center space-y-10"
      >
        {/* Availability indicator */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-xs font-medium uppercase tracking-widest text-muted-foreground"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          {profile.availability}
        </motion.div>

        {/* Name & Title */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            {profile.name}
            <BadgeCheck className="inline-block ml-3 w-8 h-8 md:w-10 md:h-10 text-primary -translate-y-2" />
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
            {profile.bio}
          </p>
        </div>

        {/* Details (Location, Niches) */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-1.5 font-medium">
            <MapPin className="w-4 h-4" />
            <span>{profile.location}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-border hidden sm:block" />
          <div className="flex flex-wrap gap-2">
            {skills.niches.map((niche) => (
              <Badge key={niche} variant="secondary" className="bg-transparent border border-border hover:bg-secondary">
                {niche}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 pt-8 w-full sm:w-auto items-center"
        >
          <Button size="lg" className="h-14 px-8 text-base font-medium rounded-full group">
            Hire Me
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="flex gap-2">
            {contact.map((c) => (
              <a 
                key={c.platform}
                href={c.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={c.platform}
                className="inline-flex items-center justify-center shrink-0 h-14 w-14 rounded-full border border-border bg-transparent hover:bg-secondary text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {getSocialIcon(c.platform)}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
