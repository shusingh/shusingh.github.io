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
  STRANDS_MULTI_AGENT: {
    PROJECT_TITLE: 'Strands Multi-Agent Orchestrator',
    PROJECT_DESCRIPTION:
      'Built a <span class="highlight">multi-agent orchestration system</span> using Strands Agents SDK with specialized agent routing (planner, research, data, synthesizer), MCP tool integration, FastAPI streaming, and observability tracing over heterogeneous data sources including SQL, web search, and document corpora.',
    TECH_STACK: ['Python', 'Strands Agents SDK', 'MCP', 'FastAPI', 'SQL', 'LLM'],
    GITHUB_LINK: 'https://github.com/shusingh/strands-multi-agent',
    TIMELINE: '2026',
    IMAGE_SRC: '/strands-multi-agent.png',
  },
  DISTRIBUTED_RATE_LIMITER: {
    PROJECT_TITLE: 'Distributed Rate Limiter',
    PROJECT_DESCRIPTION:
      'Built a <span class="highlight">distributed rate limiting service</span> in Go using Redis Sorted Sets and atomic Lua sliding window enforcement, exposing an HTTP check API and middleware integration with fail-open behavior and bounded Redis latency.',
    TECH_STACK: ['Go', 'Redis', 'Lua', 'HTTP API', 'Middleware'],
    GITHUB_LINK: 'https://github.com/shusingh/distributed-rate-limiter',
    TIMELINE: '2026',
    IMAGE_SRC: '/distributed-rate-limiter.png',
  },
  RAG_PLATFORM: {
    PROJECT_TITLE: 'RAG Platform',
    PROJECT_DESCRIPTION:
      'Built a <span class="highlight">multi-tenant RAG platform</span> in Go using OpenSearch (BM25 + kNN) with async ingestion (extract, chunk, embed, index), Redis Streams workers, and <span class="highlight">citation-grounded answers</span> over large document corpora.',
    TECH_STACK: ['Go', 'OpenSearch', 'Redis Streams', 'BM25', 'kNN', 'RAG'],
    GITHUB_LINK: 'https://github.com/shusingh/rag-platform',
    TIMELINE: '2025',
    IMAGE_SRC: '/rag-platform.png',
  },
  KANBAN_BOARD: {
    PROJECT_TITLE: 'Drag & Drop Kanban Board',
    PROJECT_DESCRIPTION:
      'Developed a localStorage-backed, <span class="highlight">offline-first Kanban board</span> SPA using Vite, React + TypeScript, and Hero UI that enables intuitive task management with drag-and-drop functionality powered by @hello-pangea/dnd.',
    TECH_STACK: ['React', 'TypeScript', 'Hero UI', '@hello-pangea/dnd', 'Vite', 'localStorage'],
    PROJECT_LINK: 'https://kanban-board-6ty7.onrender.com/',
    GITHUB_LINK: 'https://github.com/shusingh/kanban-board',
    TIMELINE: '2025',
    IMAGE_SRC: '/kanban.png',
  },
  CHILL_PIXEL: {
    PROJECT_TITLE: 'Chill Pixel',
    PROJECT_DESCRIPTION:
      'Created a beautiful <span class="highlight">lofi music player with a pixel art theme</span>, offering a nostalgic aesthetic while streaming relaxing beats.',
    TECH_STACK: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Jamendo API', 'Render.com'],
    PROJECT_LINK: 'https://chill-pixel.onrender.com/',
    GITHUB_LINK: 'https://github.com/shusingh/chill-pixel',
    TIMELINE: '2025',
    IMAGE_SRC: '/chill-pixel.png',
  },
  AI_TRIP_PLANNER: {
    PROJECT_TITLE: 'AI Trip Planner',
    PROJECT_DESCRIPTION:
      'Designed and implemented a <span class="highlight">multi-step trip planning SPA</span> using Vite, React + TypeScript, and Hero UI with a dynamic form flow capturing destinations, dates, and traveler interests through an intuitive UI with real-time progress tracking.',
    TECH_STACK: ['React', 'TypeScript', 'Go', 'Hugging Face API', 'Vite', 'Hero UI'],
    PROJECT_LINK: 'https://tripplannerwebsite.onrender.com/',
    GITHUB_LINK: 'https://github.com/shusingh/TripPlanner',
    TIMELINE: '2025',
    IMAGE_SRC: '/ai-trip-planner.png',
  },
};
