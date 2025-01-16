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
  Hi, I'm Shubham. I have a passion for building scalable and efficient solutions. 
  Fueled by curiosity and a passion for elegant design, 
  I blend cutting-edge tech with user-centric thinking to build experiences people love.
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
      Led the development of scalable software solutions, 
      including designing and deploying an artifact search and upload platform 
      using AWS and microservices architecture to enhance retrieval efficiency 
      and improve user experience.
      <br /><br />
      Built and maintained PySpark ETL pipelines to automate compliance checks 
      under the EU Digital Services Act, ensuring accurate reporting 
      and reducing manual intervention.
      <br /><br />
      Focused on performance optimization, dynamic feature integration, 
      and fostering best practices through code reviews and mentorship, 
      consistently delivering high-quality, production-ready solutions.
`,
  },
  ELI_LILLY: {
    COMPANY_NAME: 'Eli Lilly & Co.',
    COMPANY_LINK: 'https://www.lilly.com/',
    JOB_TITLE: 'Data Analyst Intern (Co-op)',
    JOB_DURATION: 'Jan 2021 - March 2021',
    JOB_DESCRIPTION: `
    Led the development of a machine learning pipeline to analyze 
    cancer-related gene lines, optimizing data preprocessing and model accuracy.
    `,
  },
  INDIANA_UNIVERSITY: {
    COMPANY_NAME: 'Indiana University Bloomington',
    COMPANY_LINK: 'https://bloomington.iu.edu/index.html',
    JOB_TITLE: 'Research & Teaching Assistant',
    JOB_DURATION: 'May 2021 - Aug 2021',
    JOB_DESCRIPTION: `
    Conducted geospatial analysis using QGIS, 
    identifying environmental risk factors for Biosphere Reserves 
    and proposing mitigation strategies.
    <br /><br />
    Assisted students in advanced data visualization techniques 
    during I422 Data Visualization lab sessions, 
    providing practical guidance on analysis tools.
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
  DATA_COLLECTION_SERVICE: {
    PROJECT_TITLE: 'Data Collection & Transformation Service',
    PROJECT_DESCRIPTION: `
      Built a data collection and transformation service using Java and Python, implementing the ACBDA pattern and Dagger for dependency injection.<br /><br />
      Designed scalable workflows for processing API-based datasets with PySpark, achieving 90%+ unit test coverage. Leveraged AWS Glue and S3 for secure data storage and retrieval, integrating deployment pipelines with AWS Lambda, CloudFormation, and CDK to ensure scalability and maintainability.
    `,
    TECH_STACK: ['Java', 'Python', 'PySpark', 'AWS Glue', 'S3', 'Lambda', 'CDK'],
  },
  COST_OPTIMIZATION_ANALYZER: {
    PROJECT_TITLE: 'Cost-Optimization Analyzer',
    PROJECT_DESCRIPTION: `
      Built a cost-optimization tool to analyze and reduce cloud spending patterns using AWS Cost Explorer API and QuickSight.<br /><br />
      Visualized resource consumption trends, providing actionable insights to optimize cloud resource allocation and reduce potential costs.
    `,
    TECH_STACK: ['AWS Cost Explorer API', 'QuickSight', 'Python'],
  },
  MICROSERVICES_ECOMMERCE: {
    PROJECT_TITLE: 'Microservices E-Commerce Playground',
    PROJECT_DESCRIPTION: `
      Developed a microservices-based e-commerce system for personal learning, splitting core functionalities (products, orders, payments) into independent services.<br /><br />
      Containerized each service with Docker and deployed them on AWS ECS to experiment with horizontal scaling and service discovery.
    `,
    TECH_STACK: ['Java', 'Spring Boot', 'Docker', 'AWS ECS'],
  },
  REAL_TIME_CHAT_APP: {
    PROJECT_TITLE: 'Real-Time Chat Application',
    PROJECT_DESCRIPTION: `
      Built a real-time chat application using Socket.IO and Express to gain hands-on experience with low-latency, event-driven communication.<br /><br />
      Deployed the application on AWS EC2 with an Nginx reverse proxy for load balancing, learning best practices for basic DevOps and server configuration.
    `,
    TECH_STACK: ['Node.js', 'Express', 'Socket.IO', 'AWS EC2', 'Nginx'],
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
} from 'react-icons/fa';
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
import { VscTypeHierarchy } from "react-icons/vsc";
import { TbArrowsJoin } from "react-icons/tb";
import { FaCode } from "react-icons/fa6";
import { AiTwotoneApi } from "react-icons/ai";

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
      { name: 'JavaScript', icon: FaJs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'C/C++', icon: SiCplusplus },
    ],
  },
  DISTRIBUTED_SYSTEMS: {
    TITLE: 'Distributed Systems & System Design',
    SKILLS: [
      { name: 'Distributed Systems', icon: VscTypeHierarchy },
      { name: 'Load Balancing', icon: FaAws },
      { name: 'Fault Tolerance', icon: FaAws },
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
    ],
  },
  SOFTWARE_ENGINEERING: {
    TITLE: 'Software Engineering Principles',
    SKILLS: [
      { name: 'Algorithms', icon: MdDesignServices },
      { name: 'Data Structures', icon: MdDesignServices },
      { name: 'Design Patterns', icon: MdDesignServices },
      { name: 'Agile', icon: MdDesignServices },
      { name: 'SCRUM', icon: MdDesignServices },
    ],
  },
};

export const SOCIAL_LINKS = {
  Github: 'https://github.com/shusingh',
  LinkedIn: 'https://www.linkedin.com/in/shusingh/',
  Gmail: 'mailto:ksingh.shubh@gmail.com'
}

