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
      Designed and built scalable backend services and internal platforms to improve developer productivity and operational visibility.<br /><br />
      Architected an artifact management system used by 25K+ daily users; integrated CI/CD workflows to streamline search, upload, and release pipelines.<br /><br />
      Developed high-throughput ETL pipelines in PySpark to automate compliance reporting under the EU Digital Services Act, reducing manual overhead by 80%.<br /><br />
      Led development of a real-time observability dashboard backed by Andes; adopted by 6+ internal teams to monitor system health and track SLAs.<br /><br />
      Promoted engineering best practices through design reviews, mentorship, and collaborative development across Java, Python, Go, and TypeScript microservices.
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
}

export interface ProjectSectionText {
  [key: string]: Project;
}

export const PROJECT_SECTION_TEXT: ProjectSectionText = {
  PLATFORM_OBSERVABILITY_DASHBOARD: {
    PROJECT_TITLE: 'Platform Observability Dashboard',
    PROJECT_DESCRIPTION: `
      Designed and built a Grafana-like dashboard to visualize platform metrics, logs, and SLAs across services using data aggregated in Andes.<br /><br />
      Empowered internal teams with real-time insights into system health, reducing incident triage time and improving visibility across distributed microservices.
    `,
    TECH_STACK: ['React.js', 'TypeScript', 'Andes', 'Go', 'AWS'],
  },
  DATA_COLLECTION_SERVICE: {
    PROJECT_TITLE: 'Data Collection & Transformation Service',
    PROJECT_DESCRIPTION: `
      Engineered a scalable data processing service for ingesting and transforming large API-driven datasets using PySpark and Java.<br /><br />
      Leveraged AWS Glue, S3, and Lambda for secure processing workflows; integrated CI/CD pipelines for automated deployment and testing.
    `,
    TECH_STACK: ['Java', 'Python', 'PySpark', 'AWS Glue', 'S3', 'Lambda', 'CDK'],
  },
  COST_OPTIMIZATION_ANALYZER: {
    PROJECT_TITLE: 'Cloud Cost Optimization Analyzer',
    PROJECT_DESCRIPTION: `
      Built a serverless tool to analyze cloud usage and provide actionable insights using AWS Cost Explorer and QuickSight.<br /><br />
      Automated daily cost reports and alerts, helping teams reduce spend through smarter resource allocation and usage monitoring.
    `,
    TECH_STACK: ['AWS Cost Explorer API', 'QuickSight', 'Python', 'Lambda'],
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

import { 
  FaJava, 
  FaPython, 
  FaJs, 
  FaAws, 
  FaDocker, 
  FaReact, 
  FaJenkins, 
  FaGitAlt, 
  FaCss3,
  FaHtml5 } from 'react-icons/fa';
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
