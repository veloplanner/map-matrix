import { AppProvider } from "./contexts/AppContext";
import { Layout } from "./components/Layout";

export function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}
