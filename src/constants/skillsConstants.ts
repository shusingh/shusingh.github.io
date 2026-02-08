export interface SkillCategory {
  label: string;
  skills: string[];
}

export const SKILLS_SECTION_TEXT: SkillCategory[] = [
  {
    label: 'Languages',
    skills: ['Java', 'Python', 'TypeScript', 'Go', 'SQL', 'C/C++'],
  },
  {
    label: 'Cloud & Infrastructure',
    skills: [
      'AWS (Lambda, Step Functions, DynamoDB, S3, API Gateway, CloudFront, WAF, Glue)',
      'Docker',
      'Kubernetes',
      'CI/CD',
      'Infrastructure as Code',
    ],
  },
  {
    label: 'AI / LLM',
    skills: [
      'AWS Bedrock',
      'Strands Agents SDK',
      'RAG',
      'Vector Search',
      'Tool-Calling',
      'MCP',
      'Prompt Engineering',
    ],
  },
  {
    label: 'Data & Backend',
    skills: ['PySpark', 'ETL Pipelines', 'REST APIs', 'Microservices', 'Event-Driven Architecture', 'OpenSearch'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'Bash', 'React', 'Redux', 'Agile/Scrum', 'Technical Documentation'],
  },
];
