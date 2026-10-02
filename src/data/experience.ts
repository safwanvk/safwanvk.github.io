export type Job = {
  company: string;
  companyUrl: string;
  period: string;
  title: string;
  highlights: string[];
};

export const jobs: Job[] = [
  {
    company: "Barq Group",
    companyUrl: "https://www.barqgroup.com/",
    period: "Sep 2025 – Present",
    title: "Lead Backend Engineer",
    highlights: [
      "Own backend architecture and APIs for healthcare products that improve hospital operations and patient experience across many facilities.",
    ],
  },
  {
    company: "Epixel Solutions Pvt Ltd",
    companyUrl: "https://www.epixelmlmsoftware.com/",
    period: "Feb 2023 – Sep 2025",
    title: "Senior Software Engineer",
    highlights: [
      "Led R&D initiatives to design and deliver innovative MLM features, optimizing processes and reducing development time by 10%.",
      "Built intelligent automation and data-driven solutions, driving business efficiency and client success.",
      "Integrated MailChimp and SMS campaigns, achieving a 25% open rate and 15% higher response rates.",
      "Leveraged QR codes to boost referral sign-ups by 40% and organized 20+ offline/online events, enhancing user engagement by 30%.",
      "Implemented free subscription renewals, improving customer retention by 20%.",
      "Conceptualized and developed 4+ MLM projects tailored to client requirements.",
      "Migrated a WordPress project to Django for Italia Gas e Luce SRL (https://www.italiagaseluce.it/), streamlining client-server communication by 40% and enhancing user satisfaction.",
      "Developed a multi-step order form with OTP verification, document uploads, and email notifications.",
      "Built back-office tools for staff management, order & campaign management, offer handling, and analytics dashboards with API integrations.",
      "Supported customer operations by delivering feature enhancements, bug fixes, and system optimizations to meet evolving client needs.",
    ],
  },
  {
    company: "GI Aerospace & Defence",
    companyUrl: "https://giaerospace.com/",
    period: "Jan 2022 – Feb 2023",
    title: "Software Development Engineer-1",
    highlights: [
      "Built backend services for TARA, a SaaS platform for aircraft maintenance compliance and operational analytics.",
      "Designed and implemented Django REST APIs that replaced legacy processes and powered web and native clients.",
      "Built advanced features for TARA Electronic Tech Log (ETL), enabling real-time tracking of flight and technical data, significantly reducing manual errors and improving compliance.",
      "Engineered 3D Repair Mapping, delivering lifecycle tracking of aircraft damages with intuitive 3D visualizations across iPad, Windows, and macOS platforms.",
      "Developed advanced search capabilities with OpenSearch, enabling OCR-based document indexing and real-time dashboard analytics.",
      "Automated critical workflows using Apache Airflow, optimizing file handling and task management for streamlined operations.",
      "Enhanced the user experience of Vue.js-based web applications, focusing on organization and user management functionality to improve tenant-based software usability.",
      "Collaborated on cross-platform native application development using Qt, QML, and C++, ensuring seamless performance and compatibility.",
      "Delivered secure cryptographic digital signing and YubiKey authentication, aligning with FAA and EASA standards for compliance and security.",
      "Supported modular integrations with industry standards such as ATA SPEC 2000, XML, and GraphQL, ensuring robust and scalable data exchange.",
    ],
  },
  {
    company: "Xanthron e-solutions",
    companyUrl: "https://xanthron.com/",
    period: "Jun 2020 – Oct 2021",
    title: "Software Engineer (Backend)",
    highlights: [
      "Contributed to the development of innovative educational administration products, creating scalable and user-centric software solutions to enhance institutional efficiency and user satisfaction.",
      "Played a key role in building XEMS, a digital false numbering system for answer script evaluation, replacing manual processes and ensuring secure and error-free handling of revaluation requests.",
      "Developed backend services for XCampus, a comprehensive campus management platform encompassing attendance, finance, examination, and internal evaluation management, significantly reducing administrative workloads and enhancing accuracy.",
      "Designed and implemented Online Question Paper Dispatch, enabling secure, paperless question paper management through encrypted data input and decentralized printing, ensuring data integrity and confidentiality.",
      "Utilized Python, Flask-RESTful, and MySQL to develop highly available APIs, ensuring seamless integration with Angular-based front-end applications for an intuitive user experience.",
      "Delivered a Matrimony App, simplifying matrimonial agency operations with advanced technologies and enabling efficient single-handed management with streamlined workflows.",
      "Strengthened product modularity by ensuring code quality and maintainability through version control systems like Git and adhering to best practices in backend development.",
      "Focused on scalability and performance optimization, ensuring the seamless functionality of applications even during peak usage periods.",
    ],
  },
];
