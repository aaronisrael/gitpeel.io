import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from '@/config/theme';

import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/900.css';

const ErrorFallback = () => {
  return (
    <div role="alert">
      <h2>Ooops, something went wrong :( </h2>
      <button onClick={() => window.location.assign(window.location.origin)}>Refresh</button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

function Providers({ children }: AppProviderProps) {
  const queryClient = new QueryClient();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {!import.meta.env.PROD && <ReactQueryDevtools />}
          <Router>{children}</Router>
        </QueryClientProvider>
      </ChakraProvider>
    </ErrorBoundary>
  );
}
export default Providers;
