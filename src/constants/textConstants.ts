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

export const PERSONAL_PROJECT = 'Personal Project';

export const SECTION_HEADINGS = {
  EXPERIENCE: 'Experience',
  PROJECTS: 'Projects',
  SKILLS: 'Skills',
  LINKS: 'Links',
};

export const ABOUT_SECTION_TEXT = {
  TITLE: 'Shubham Singh',
  SUB_TITLE: 'Full-stack Engineer',
  TAGLINE: 'Building scalable systems with a focus on user experience',
  DESCRIPTION: `
  I'm Shubham, a Software Engineer at Amazon where I design and build both backend and frontend systems that are reliable, scalable, and easy to maintain. I enjoy simplifying complex problems and creating solutions that improve internal workflows, enhance user experience, and stand the test of time.
  <br /><br />
  I believe engineering starts with empathy. Understanding user needs is key to architecting effective systems and features. This approach has helped me streamline complex processes, cutting onboarding times from weeks to hours and empowering users with self-service data ingestion pipelines. Outside of work, I enjoy developing full-stack side projects that combine intuitive UX with solid backend infrastructure.
  <br /><br />
  When I'm not coding, you can find me at the gym, exploring photography with my Fujifilm X100VI, or lost in a good book. I'm driven by curiosity and the constant pursuit of learning and mastering new skills.
  `,
};

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

export interface Project {
  PROJECT_TITLE: string;
  PROJECT_DESCRIPTION: string;
  TECH_STACK: string[];
  PROJECT_LINK?: string;
  GITHUB_LINK?: string;
  TIMELINE: string;
  IMAGE_SRC?: string;
}

export interface ProjectSectionText {
  [key: string]: Project;
}

export const PROJECT_SECTION_TEXT: ProjectSectionText = {
  AI_TRIP_PLANNER: {
    PROJECT_TITLE: 'AI Trip Planner',
    PROJECT_DESCRIPTION:
      'Designed and implemented a multi-step trip planning SPA using Vite, React + TypeScript, and Hero UI with a dynamic form flow capturing destinations, dates, and traveler interests through an intuitive UI with real-time progress tracking.',
    TECH_STACK: ['React', 'TypeScript', 'Go', 'Hugging Face API', 'Vite', 'Hero UI'],
    PROJECT_LINK: 'https://tripplannerwebsite.onrender.com/',
    GITHUB_LINK: 'https://github.com/shusingh/TripPlanner',
    TIMELINE: '2025',
    IMAGE_SRC: '/ai-trip-planner.png',
  },
  KANBAN_BOARD: {
    PROJECT_TITLE: 'Drag & Drop Kanban Board',
    PROJECT_DESCRIPTION:
      'Developed a localStorage-backed, offline-first Kanban board SPA using Vite, React + TypeScript, and Hero UI that enables intuitive task management with drag-and-drop functionality powered by @hello-pangea/dnd.',
    TECH_STACK: ['React', 'TypeScript', 'Hero UI', '@hello-pangea/dnd', 'Vite', 'localStorage'],
    PROJECT_LINK: 'https://kanban-board-6ty7.onrender.com/',
    GITHUB_LINK: 'https://github.com/shusingh/kanban-board',
    TIMELINE: '2025',
    IMAGE_SRC: '/kanban.png',
  },
  CHILL_PIXEL: {
    PROJECT_TITLE: 'Chill Pixel',
    PROJECT_DESCRIPTION:
      'Created a beautiful lofi music player with a pixel art theme, offering a nostalgic aesthetic while streaming relaxing beats.',
    TECH_STACK: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Jamendo API', 'Render.com'],
    PROJECT_LINK: 'https://chill-pixel.onrender.com/',
    GITHUB_LINK: 'https://github.com/shusingh/chill-pixel',
    TIMELINE: '2025',
    IMAGE_SRC: '/chill-pixel.png',
  },
  COST_OPTIMIZATION_ANALYZER: {
    PROJECT_TITLE: 'Cloud Cost Optimization Analyzer',
    PROJECT_DESCRIPTION:
      'Built a serverless tool to automate EC2/RDS cost analysis using AWS SDK with scheduled daily reports delivered via Lambda and CloudWatch Events.',
    TECH_STACK: ['AWS Cost Explorer API', 'QuickSight', 'Python', 'Lambda', 'CloudWatch', 'SNS'],
    TIMELINE: '2024',
  },
};

import { FaJava, FaPython, FaJs, FaAws, FaDocker, FaReact, FaJenkins, FaGitAlt, FaCss3, FaHtml5 } from 'react-icons/fa';
import {
  SiTypescript,
  SiCplusplus,
  SiKubernetes,
  SiPostgresql,
  SiMongodb,
  SiSpring,
  SiGraphql,
  SiExpress,
} from 'react-icons/si';
import { MdDesignServices, MdCached } from 'react-icons/md';
import { VscTypeHierarchy } from 'react-icons/vsc';
import { TbArrowsJoin } from 'react-icons/tb';
import { FaCode, FaGolang } from 'react-icons/fa6';
import { AiTwotoneApi } from 'react-icons/ai';

interface Skill {
  name: string;
  icon: React.ElementType;
}

interface Skills {
  TITLE: string;
  SKILLS: Skill[];
}

interface SkillsSectionText {
  [key: string]: Skills;
}

export const SKILLS_SECTION_TEXT: SkillsSectionText = {
  PROGRAMMING_LANGUAGES: {
    TITLE: 'Programming Languages',
    SKILLS: [
      { name: 'Java', icon: FaJava },
      { name: 'Python', icon: FaPython },
      { name: 'Go', icon: FaGolang },
      { name: 'JavaScript', icon: FaJs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'C/C++', icon: SiCplusplus },
    ],
  },
  DISTRIBUTED_SYSTEMS: {
    TITLE: 'Distributed Systems & System Design',
    SKILLS: [
      { name: 'Distributed Systems', icon: VscTypeHierarchy },
      { name: 'Event-Driven Architecture', icon: TbArrowsJoin },
      { name: 'Fault Tolerance', icon: MdDesignServices },
      { name: 'Design Patterns', icon: MdDesignServices },
      { name: 'Microservices Architecture', icon: FaReact },
    ],
  },
  CLOUD_PLATFORMS: {
    TITLE: 'Cloud Platforms',
    SKILLS: [
      { name: 'Amazon Web Services (AWS)', icon: FaAws },
      { name: 'Kubernetes', icon: SiKubernetes },
      { name: 'Docker', icon: FaDocker },
      { name: 'Load Balancing', icon: FaAws },
      { name: 'Caching', icon: MdCached },
    ],
  },
  DEVOPS_CICD: {
    TITLE: 'DevOps & CI/CD',
    SKILLS: [
      { name: 'CI/CD Pipelines', icon: TbArrowsJoin },
      { name: 'Jenkins', icon: FaJenkins },
      { name: 'GitHub Actions', icon: FaGitAlt },
      { name: 'Infrastructure as Code (IaC)', icon: FaCode },
      { name: 'Monitoring & Alerting (CloudWatch, DataDog)', icon: FaCode },
    ],
  },
  DATABASE_MANAGEMENT: {
    TITLE: 'Database Management',
    SKILLS: [
      { name: 'SQL (PostgreSQL, MySQL)', icon: SiPostgresql },
      { name: 'NoSQL (MongoDB, DynamoDB)', icon: SiMongodb },
    ],
  },
  FRAMEWORKS_TOOLS: {
    TITLE: 'Frameworks & Tools',
    SKILLS: [
      { name: 'React', icon: FaReact },
      { name: 'Spring Boot', icon: SiSpring },
      { name: 'Express.js', icon: SiExpress },
      { name: 'GraphQL', icon: SiGraphql },
      { name: 'RESTful APIs', icon: AiTwotoneApi },
      { name: 'gRPC', icon: FaCode },
    ],
  },
  SOFTWARE_ENGINEERING: {
    TITLE: 'Software Engineering Principles',
    SKILLS: [
      { name: 'Algorithms', icon: MdDesignServices },
      { name: 'Data Structures', icon: MdDesignServices },
      { name: 'Design Patterns', icon: MdDesignServices },
      { name: 'Test Automation (JUnit, PyTest)', icon: FaCode },
      { name: 'Code Reviews & Mentorship', icon: FaCode },
      { name: 'Agile', icon: MdDesignServices },
      { name: 'SCRUM', icon: MdDesignServices },
    ],
  },
  WEB_TECHNOLOGIES: {
    TITLE: 'Web Technologies',
    SKILLS: [
      { name: 'HTML5', icon: FaHtml5 },
      { name: 'CSS3', icon: FaCss3 },
      { name: 'Responsive Design', icon: FaCode },
      { name: 'Accessibility (a11y)', icon: FaCode },
    ],
  },
};

export const SOCIAL_LINKS = {
  Github: 'https://github.com/shusingh',
  LinkedIn: 'https://www.linkedin.com/in/shusingh/',
  Gmail: 'mailto:ksingh.shubh@gmail.com',
};
