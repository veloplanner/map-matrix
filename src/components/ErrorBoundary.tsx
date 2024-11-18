import { Component, ReactNode } from "react";
import { useApp } from "../contexts/AppContext";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

function ErrorFallback() {
  const { dispatch } = useApp();

  function handleReset() {
    if (
      window.confirm(
        "Are you sure you want to reset? This will clear all custom sources and settings."
      )
    ) {
      localStorage.clear();
      dispatch({ type: "RESET_STATE" });
      window.location.reload();
    }
  }

  function handleReload() {
    window.location.reload();
  }

  return (
    <div className="fixed inset-0 flex flex-col">
      <div className="flex-1 bg-slate-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-4">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Unexpected Error
          </h2>
          <p className="text-slate-600 mb-6">
            There was an unexpected error. You can try to reload the page or
            reset the application state.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleReload}
              className="px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors"
            >
              Reload Page
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Reset Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
