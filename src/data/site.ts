export const site = {
  name: "Romain Hoffmann",
  initials: "RH",
  role: "Full-stack developer.",
  tagline: "I build web and mobile products with clean code.",
  location: "Based in France",
  availability: "Available for freelance",
  email: "hello@romainhoffmann.dev",
  resumePath: "/resume.pdf",
  social: {
    github: "https://github.com/romainhoffmann",
    linkedin: "https://linkedin.com/in/romainhoffmann",
  },
  about: {
    titleLines: ["ROMAIN", "HOFFMANN."],
  },
  projectsIntro: {
    titleLines: ["SELECTED", "WORK."],
    subtitle:
      "Three projects focused on product thinking, clean code and useful experiences.",
  },
  contact: {
    titleLines: ["LET'S BUILD", "SOMETHING."],
    subtitle:
      "Available for freelance opportunities, product collaborations and full-stack roles.",
  },
  profileImage: "/images/profile.webp",
} as const;

export const sections = [
  { id: "about", label: "ABOUT", number: "01" },
  { id: "projects", label: "PROJECTS", number: "02" },
  { id: "contact", label: "CONTACT", number: "03" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
