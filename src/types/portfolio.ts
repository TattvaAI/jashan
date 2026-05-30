export interface Profile {
  name: string;
  bio: string;
  location: string;
  availability: string;
}

export interface Contact {
  platform: string;
  href: string;
  text: string;
}

export interface Skills {
  niches: string[];
  languages: string[];
  software: string[];
}

export interface Video {
  id: string;
  type: string;
  category?: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skills;
  videos: {
    showreel: Video[];
    longForm: Video[];
    shortForm: Video[];
  };
  contact: Contact[];
}
