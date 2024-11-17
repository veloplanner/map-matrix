import "maplibre-gl/dist/maplibre-gl.css";

import { AppProvider } from "./contexts/AppContext";
import { Layout } from "./components/Layout";

export function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}
