"use client";

import { motion } from "framer-motion";
import { BadgeCheck, MapPin, ArrowRight } from "lucide-react";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import type { Profile, Contact, Skills } from "@/types/portfolio";
import { Mail } from "lucide-react";

interface HeroProps {
  profile: Profile;
  contact: Contact[];
  skills: Skills;
}

export function Hero({ profile, contact, skills }: HeroProps) {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
      case "x":
        return <FaXTwitter className="w-6 h-6" />;
      case "instagram":
        return <FaInstagram className="w-6 h-6" />;
      default:
        return <Mail className="w-6 h-6" />;
    }
  };

  return (
    <section className="relative w-full py-24 lg:py-32 flex flex-col items-start justify-center border-b-4 border-black bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxwYXRoIGQ9Ik0wLDBIMjBWMjBIMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U1ZTVlNSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')]">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto flex flex-col items-start space-y-8">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 border-2 border-black bg-primary font-bold uppercase tracking-widest text-black brutal-shadow transition-all">
          <span className="w-3 h-3 bg-black rounded-none animate-pulse" />
          {profile.availability}
        </div>

        {/* Title */}
        <div className="space-y-6 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black uppercase leading-[0.9]">
            {profile.name.split(" ").slice(0, -1).join(" ")}
            {profile.name.split(" ").length > 1 && " "}
            <span className="whitespace-nowrap">
              {profile.name.split(" ").slice(-1)[0]}
              <BadgeCheck className="inline-block ml-4 w-12 h-12 md:w-16 md:h-16 text-primary fill-black -translate-y-2 shrink-0" />
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-black font-semibold max-w-3xl border-l-8 border-primary pl-6 py-2">
            {profile.bio}
          </p>
        </div>

        {/* Details (Location, Niches) */}
        <div className="flex flex-wrap items-center gap-6 text-black font-bold uppercase tracking-wider text-sm">
          <div className="flex items-center gap-2 border-2 border-black px-4 py-2 bg-white brutal-shadow">
            <MapPin className="w-5 h-5" />
            <span>{profile.location}</span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {skills.niches.map((niche) => (
              <div key={niche} className="border-2 border-black px-4 py-2 bg-white brutal-shadow">
                {niche}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 pt-10 w-full sm:w-auto">
          <a 
            href={contact.find(c => c.platform.toLowerCase() === "email")?.href || "#"}
            className="inline-flex items-center justify-center h-16 px-10 text-xl font-black uppercase tracking-wider bg-primary text-black border-4 border-black brutal-shadow hover:bg-primary transition-all group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black"
          >
            Hire Me
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
          </a>
          
          <div className="flex gap-4">
            {contact
              .filter(c => c.platform.toLowerCase() !== "email")
              .map((c) => (
              <a 
                key={c.platform}
                href={c.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={c.platform}
                className="inline-flex items-center justify-center h-16 w-16 border-4 border-black bg-white text-black brutal-shadow hover:bg-primary transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black"
              >
                {getSocialIcon(c.platform)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
