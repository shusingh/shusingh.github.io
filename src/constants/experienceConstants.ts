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
    JOB_TITLE: 'Software Development Engineer II',
    JOB_DURATION: 'Aug 2022 - Present',
    JOB_DESCRIPTION:
      'Designed and built a production-grade LLM system using AWS Bedrock and RAG that automated ~80% of manual compliance workflows, enabling natural-language querying across regulatory datasets. Engineered a hybrid search architecture combining OpenSearch (BM25) and vector-based document retrieval (kNN) with secure tool-calling and sub-second AI response latency.\n\nBuilt distributed orchestration using AWS Step Functions, Lambda, and DynamoDB, achieving 4x higher reliability for regulatory pipelines. Architected self-service workflow configuration platforms cutting onboarding time from weeks to hours. Led design of a PySpark-based EU-DSA compliance pipeline processing 30M+ monthly records, reducing incident resolution time by 70%.',
    SKILLS: ['Java', 'Python', 'Go', 'TypeScript', 'AWS', 'Kubernetes', 'PySpark', 'React', 'AWS Bedrock', 'RAG', 'OpenSearch', 'Docker'],
  },
};
