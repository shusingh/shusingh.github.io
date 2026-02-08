import styled from 'styled-components';

const AboutContainer = styled.div`
  color: var(--color-whiteAlpha-700);
  line-height: 1.6;
  font-size: 1rem;

  p + p {
    margin-top: 1rem;
  }
`;

const Highlight = styled.span`
  color: var(--text-primary);
  font-weight: 600;
`;

export const About = () => {
  return (
    <AboutContainer>
      <p>
        I'm Shubham, a <Highlight>Software Development Engineer II at Amazon</Highlight> with 3+
        years of experience building distributed systems, LLM-powered platforms, and large-scale
        compliance infrastructure on AWS. I specialize in designing{' '}
        <Highlight>production-grade AI systems</Highlight>, high-reliability orchestration pipelines,
        and self-service tooling that simplifies complex workflows.
      </p>
      <p>
        I believe engineering starts with empathy. Understanding user needs is key to architecting
        effective systems and features. This approach has helped me automate{' '}
        <Highlight>~80% of manual compliance workflows</Highlight> using LLM systems, cut onboarding
        times from <Highlight>weeks to hours</Highlight> with self-service platforms, and build
        robust data pipelines processing <Highlight>30M+ monthly records</Highlight>. Outside of
        work, I enjoy building side projects exploring AI/ML, distributed systems, and full-stack
        development.
      </p>
      <p>
        When I'm not coding, you can find me at the gym, exploring photography with my Fujifilm
        X100VI, or lost in a good book. I'm driven by curiosity and the constant pursuit of learning
        and mastering new skills.
      </p>
    </AboutContainer>
  );
};
