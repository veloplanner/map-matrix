import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ApiKeysDialogProps {
  onClose: () => void;
}

interface ApiKeys {
  googleMaps?: string;
}

export function ApiKeysDialog({ onClose }: ApiKeysDialogProps) {
  const [apiKeys, setApiKeys] = useLocalStorage<ApiKeys>("apiKeys", {});
  const [googleMapsKey, setGoogleMapsKey] = useState(apiKeys.googleMaps || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKeys((prev) => ({
      ...prev,
      googleMaps: googleMapsKey,
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">API Keys Configuration</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-500"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Google Maps API Key
              <input
                type="password"
                value={googleMapsKey}
                onChange={(e) => setGoogleMapsKey(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                placeholder="Enter your API key"
              />
            </label>
            <p className="mt-1 text-sm text-gray-500">
              Your API key will be stored locally and never shared.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-brand hover:bg-brand/90 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
