import "maplibre-gl/dist/maplibre-gl.css";

import { AppProvider } from "./contexts/AppContext";
import { Layout } from "./components/Layout";
import { ErrorBoundary } from "./components/ErrorBoundary";

export function App() {
  return (
    <AppProvider>
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    </AppProvider>
  );
}
