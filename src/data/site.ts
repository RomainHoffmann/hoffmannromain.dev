export const site = {
  name: "Romain Hoffmann",
  initials: "RH",
  role: "Full-stack developer",
  tagline: "Building web and mobile products from idea to production",
  location: "Based in France",
  availability: "Available for work",
  email: "hoffmann.romain84@gmail.com",
  resumePath: "/resume.pdf",
  social: {
    github: "https://github.com/romainhoffmann",
    linkedin: "https://www.linkedin.com/in/hoffmann-romain",
  },
  about: {
    titleLines: ["ROMAIN", "HOFFMANN"],
  },
  projectsIntro: {
    titleLines: ["SELECTED", "WORK"],
  },
  contact: {
    titleLines: ["LET'S BUILD", "SOMETHING"],
    subtitle: "Available for full-stack roles and product collaborations.",
  },
  profileImage: "/images/profile.webp",
} as const;

export const sections = [
  { id: "about", label: "ABOUT", number: "01" },
  { id: "projects", label: "PROJECTS", number: "02" },
  { id: "contact", label: "CONTACT", number: "03" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
