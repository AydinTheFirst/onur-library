import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

function fallbackRender({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export const ErrorCatcher = () => {
  return (
    <ErrorBoundary FallbackComponent={fallbackRender}>
      <Outlet />
    </ErrorBoundary>
  );
};
