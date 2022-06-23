import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';

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
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          {!import.meta.env.PROD && <ReactQueryDevtools />}
          <Router>{children}</Router>
        </QueryClientProvider>
      </ChakraProvider>
    </ErrorBoundary>
  );
}
export default Providers;
