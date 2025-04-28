export interface Experience {
  COMPANY_NAME: string;
  COMPANY_LINK: string;
  JOB_TITLE: string;
  JOB_DURATION: string;
  JOB_DESCRIPTION: string;
}

export interface ExperienceSectionText {
  [key: string]: Experience;
}

export const PERSONAL_PROJECT = 'Personal Project';

export const SECTION_HEADINGS = {
  ABOUT: 'About',
  EXPERIENCE: 'Experience',
  PROJECTS: 'Projects',
  SKILLS: 'Skills',
  LINKS: 'Links',
};

export const ABOUT_SECTION_TEXT = {
  TITLE: 'Shubham Singh',
  SUB_TITLE: 'Product-focused Developer',
  DESCRIPTION: `
  Hi, I'm Shubham — a software engineer passionate about building scalable, 
  elegant, and high-impact systems. I thrive at the intersection of performance, 
  design, and usability, blending cutting-edge technology with user-centric 
  thinking to craft solutions people love.
  <br />Always shipping, always learning, always ready for the next challenge.
  `,
};

export const EXPERIENCE_SECTION_TEXT: ExperienceSectionText = {
  AMAZON: {
    COMPANY_NAME: 'Amazon Inc.',
    COMPANY_LINK: 'https://www.amazon.com/',
    JOB_TITLE: 'Software Development Engineer',
    JOB_DURATION: '2022 - Present',
    JOB_DESCRIPTION: `
      Architected and delivered a File Ingestor Self-Service platform (UI + backend) that streamlined critical data ingestion from third-party sellers, enabling data-driven decision making and reducing manual coordination by 90%.<br /><br />
      Designed and implemented an automated artifact-management platform with CI/CD pipelines and fine-grained RBAC, transforming manual document reviews into streamlined workflows that cut review turnaround by 60% and case closure time by 40%.<br /><br />
      Engineered high-performance PySpark ETL pipelines processing 30M+ monthly records for EU regulatory compliance, implementing row-level validation with S3 quarantine and automated alerts that reduced incident resolution time by 70%.<br /><br />
      Built a plug-and-play User Management Service with resource-level RBAC that consolidated authentication across 10+ microservices, eliminating critical security gaps and reducing security incidents by 60%.<br /><br />
      Led technical design reviews and cross-functional collaborations across distributed microservices in Java, Python, Go and TypeScript, establishing engineering best practices and ensuring maintainable, high-quality code through rigorous peer reviews.
    `,
  },
  ELI_LILLY: {
    COMPANY_NAME: 'Eli Lilly & Co.',
    COMPANY_LINK: 'https://www.lilly.com/',
    JOB_TITLE: 'Data Analyst Intern (Co-op)',
    JOB_DURATION: 'Jan 2021 - March 2021',
    JOB_DESCRIPTION: `
      Built Python pipelines to automate the analysis of 10K+ cancer-related gene samples, enhancing the accuracy and reproducibility of bioinformatics research.<br /><br />
      Delivered key visual insights for research teams using Matplotlib and Seaborn, supporting experimental decisions across multiple trials.
    `,
  },
  INDIANA_UNIVERSITY: {
    COMPANY_NAME: 'Indiana University Bloomington',
    COMPANY_LINK: 'https://bloomington.iu.edu/index.html',
    JOB_TITLE: 'Research & Teaching Assistant',
    JOB_DURATION: 'May 2021 - Aug 2021',
    JOB_DESCRIPTION: `
      Conducted geospatial analysis using QGIS to identify environmental risk factors for Biosphere Reserves and suggest mitigation strategies.<br /><br />
      Mentored students in I422 Data Visualization labs, guiding hands-on analysis with tools like Tableau and D3.js to support project-based learning.
    `,
  },
};

export interface Project {
  PROJECT_TITLE: string;
  PROJECT_DESCRIPTION: string;
  TECH_STACK: string[];
  PROJECT_LINK?: string;
  GITHUB_LINK?: string;
}

export interface ProjectSectionText {
  [key: string]: Project;
}

export const PROJECT_SECTION_TEXT: ProjectSectionText = {
  AI_TRIP_PLANNER: {
    PROJECT_TITLE: 'AI Trip Planner',
    PROJECT_DESCRIPTION: `
      Designed and implemented a multi-step trip planning SPA using Vite, React + TypeScript, and Hero UI with a dynamic form flow capturing destinations, dates, and traveler interests through an intuitive UI with real-time progress tracking.<br /><br />
      Built a scalable Go REST API backend that integrates with Hugging Face Inference API (Flan-T5-Base) to generate personalized travel recommendations based on user preferences.
    `,
    TECH_STACK: ['React', 'TypeScript', 'Go', 'Hugging Face API', 'Vite', 'Hero UI'],
    PROJECT_LINK: 'https://tripplannerwebsite.onrender.com/',
    GITHUB_LINK: 'https://github.com/shusingh/TripPlanner',
  },
  KANBAN_BOARD: {
    PROJECT_TITLE: 'Drag & Drop Kanban Board',
    PROJECT_DESCRIPTION: `
      Developed a localStorage-backed, offline-first Kanban board SPA using Vite, React + TypeScript, and Hero UI that enables intuitive task management with drag-and-drop functionality powered by @hello-pangea/dnd.<br /><br />
      Implemented advanced UI features including per-column color theming, dark/light mode support, deletion confirmation modals, and persistent state management for seamless user experience.
    `,
    TECH_STACK: ['React', 'TypeScript', 'Hero UI', '@hello-pangea/dnd', 'Vite', 'localStorage'],
    PROJECT_LINK: 'https://kanban-board-6ty7.onrender.com/',
    GITHUB_LINK: 'https://github.com/shusingh/kanban-board',
  },
  CHILL_PIXEL: {
    PROJECT_TITLE: 'Chill Pixel',
    PROJECT_DESCRIPTION: `
      Created a beautiful lofi music player with a pixel art theme, offering a nostalgic aesthetic while streaming relaxing beats.<br /><br />
      Implemented features like retro-style controls, playlist management, and real-time track information using React, TypeScript, and the Jamendo API.
    `,
    TECH_STACK: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Jamendo API', 'Render.com'],
    PROJECT_LINK: 'https://chill-pixel.onrender.com/',
    GITHUB_LINK: 'https://github.com/shusingh/chill-pixel',
  },
  COST_OPTIMIZATION_ANALYZER: {
    PROJECT_TITLE: 'Cloud Cost Optimization Analyzer',
    PROJECT_DESCRIPTION: `
      Built a serverless tool to automate EC2/RDS cost analysis using AWS SDK with scheduled daily reports delivered via Lambda and CloudWatch Events.<br /><br />
      Integrated AWS Budgets API to trigger real-time SNS alerts and created interactive QuickSight dashboards to visualize cost trends, helping teams reduce spend through smarter resource allocation.
    `,
    TECH_STACK: ['AWS Cost Explorer API', 'QuickSight', 'Python', 'Lambda', 'CloudWatch', 'SNS'],
  },
  DISTRIBUTED_KEY_VALUE_STORE: {
    PROJECT_TITLE: 'Distributed Key-Value Store',
    PROJECT_DESCRIPTION: `
      Created a Raft-based key-value store to simulate a fault-tolerant, distributed database system with leader election and consistent hashing.<br /><br />
      Focused on performance under network partitions and containerized deployment using Helm and Kubernetes.
    `,
    TECH_STACK: ['Go', 'Raft', 'gRPC', 'Kubernetes', 'Helm'],
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
