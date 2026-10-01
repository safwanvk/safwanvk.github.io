export type SkillCategory = {
  id: string;
  label: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["Python", "JavaScript", "HTML", "CSS"],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    items: ["Django", "Flask", "Django REST framework", "Flask-RESTful"],
  },
  {
    id: "tools",
    label: "Tools",
    items: ["Bash", "Git & GitHub", "Chrome DevTools", "Postman"],
  },
  {
    id: "database",
    label: "Database",
    items: ["MySQL", "PostgreSQL"],
  },
];
