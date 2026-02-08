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
      'Designed and built a production-grade LLM system using AWS Bedrock and RAG that <span class="highlight">automated ~80% of manual compliance workflows</span>, enabling natural-language querying across regulatory datasets. Engineered a hybrid search architecture combining OpenSearch (BM25) and vector-based document retrieval (kNN) with secure tool-calling and <span class="highlight">sub-second AI response latency</span>.\n\nBuilt distributed orchestration using AWS Step Functions, Lambda, and DynamoDB, achieving <span class="highlight">4x higher reliability</span> for regulatory pipelines. Architected self-service workflow configuration platforms cutting <span class="highlight">onboarding time from weeks to hours</span>. Led design of a PySpark-based EU-DSA compliance pipeline processing <span class="highlight">30M+ monthly records</span>, reducing incident resolution time by <span class="highlight">70%</span>.',
    SKILLS: ['Java', 'Python', 'Go', 'TypeScript', 'AWS', 'Kubernetes', 'PySpark', 'React', 'AWS Bedrock', 'RAG', 'OpenSearch', 'Docker'],
  },
};
