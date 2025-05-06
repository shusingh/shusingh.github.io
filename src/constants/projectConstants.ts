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