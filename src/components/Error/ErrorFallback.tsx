import { Stack } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  background-color: var(--text-primary);
  color: var(--bg-color);

  &:hover {
    opacity: 0.9;
  }
`;

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <Stack>
      <Alert status="error" title="Error!">
        {error.message}
      </Alert>
      <StyledButton onClick={resetErrorBoundary}>Try Again</StyledButton>
    </Stack>
  );
}

export default ErrorFallback;
