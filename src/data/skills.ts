export type SkillCategory = {
  id: string;
  label: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frameworks",
    label: "Frameworks",
    items: ["Django", "Django REST framework", "FastAPI", "Flask", "Flask-RESTful"],
  },
  {
    id: "languages",
    label: "Languages",
    items: ["Python", "JavaScript", "HTML", "CSS"],
  },
  {
    id: "database",
    label: "Database",
    items: ["PostgreSQL", "MySQL"],
  },
  {
    id: "tools",
    label: "Tools",
    items: ["Bash", "Git & GitHub", "Postman", "Chrome DevTools"],
  },
];
