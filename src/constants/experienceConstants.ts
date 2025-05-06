export interface Experience {
  COMPANY_NAME: string;
  COMPANY_LINK: string;
  JOB_TITLE: string;
  JOB_DURATION: string;
  JOB_DESCRIPTION: string;
  SKILLS: string[];
}

export interface ExperienceSectionText {
  [key: string]: Experience;
}

export const EXPERIENCE_SECTION_TEXT: ExperienceSectionText = {
  AMAZON: {
    COMPANY_NAME: 'Amazon Inc.',
    COMPANY_LINK: 'https://www.amazon.com/',
    JOB_TITLE: 'Software Development Engineer',
    JOB_DURATION: '2022 - Present',
    JOB_DESCRIPTION:
      'At Amazon, I led the end-to-end design and delivery of self-service platforms and automated workflows that empowered teams to onboard data and manage artifacts with minimal effort. I built intuitive UIs backed by scalable microservices in Java, Python, Go, and TypeScript, and crafted robust ETL pipelines in PySpark to meet stringent compliance requirements. Throughout, I partnered closely with cross-functional teams—driving architecture reviews, implementing CI/CD and role-based access controls, and championing best practices—to ensure reliable, maintainable solutions that streamline complex business processes.',
    SKILLS: ['Java', 'Python', 'Go', 'TypeScript', 'AWS', 'Kubernetes', 'PySpark', 'React'],
  },
  ELI_LILLY: {
    COMPANY_NAME: 'Eli Lilly & Co.',
    COMPANY_LINK: 'https://www.lilly.com/',
    JOB_TITLE: 'Data Analyst Intern (Co-op)',
    JOB_DURATION: 'Jan - Mar 2021',
    JOB_DESCRIPTION:
      'Built Python pipelines to automate the analysis of 10K+ cancer-related gene samples, enhancing the accuracy and reproducibility of bioinformatics research.',
    SKILLS: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Bioinformatics'],
  },
  INDIANA_UNIVERSITY: {
    COMPANY_NAME: 'Indiana University Bloomington',
    COMPANY_LINK: 'https://bloomington.iu.edu/index.html',
    JOB_TITLE: 'Research & Teaching Assistant',
    JOB_DURATION: 'May - Aug 2021',
    JOB_DESCRIPTION:
      'Conducted geospatial analysis using QGIS to identify environmental risk factors for Biosphere Reserves and suggest mitigation strategies.',
    SKILLS: ['QGIS', 'Geospatial Analysis', 'Data Visualization', 'Tableau', 'D3.js'],
  },
};
