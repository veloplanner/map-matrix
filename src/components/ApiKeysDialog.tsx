import { useState } from "react";
import { useModalClose } from "../hooks/useModalClose";
import { useApp } from "../contexts/AppContext";
import { CopyButton } from "./CopyButton";
import { GOOGLE_PROJECT_URL, RADAR_PROJECT_URL } from "../constants/mapSources";

interface ApiKeysDialogProps {
  onClose: () => void;
}

export function ApiKeysDialog({ onClose }: ApiKeysDialogProps) {
  const { state, dispatch } = useApp();
  const [googleMapsKey, setGoogleMapsKey] = useState(
    state.apiKeys?.googleMaps || ""
  );
  const [radarMapsKey, setRadarMapsKey] = useState(
    state.apiKeys?.radarMaps || ""
  );
  const { handleOverlayClick } = useModalClose(onClose);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE_API_KEYS",
      payload: {
        ...state.apiKeys,
        googleMaps: googleMapsKey,
        radarMaps: radarMapsKey,
      },
    });
    onClose();
  };

  const handleClearKeys = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all API keys? This action cannot be undone."
    );

    if (confirmed) {
      dispatch({
        type: "UPDATE_API_KEYS",
        payload: {},
      });
      setGoogleMapsKey("");
      setRadarMapsKey("");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
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
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              <a
                href={GOOGLE_PROJECT_URL}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                Google Maps
              </a>{" "}
              API Key
              <input
                type="password"
                autoComplete="off"
                value={googleMapsKey}
                onChange={(e) => setGoogleMapsKey(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                placeholder="Enter your Google Maps API key"
              />
            </label>
            <CopyButton value={googleMapsKey} label="Google Maps API key" />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              <a
                href={RADAR_PROJECT_URL}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                Radar Maps
              </a>{" "}
              API Key
              <input
                type="password"
                autoComplete="off"
                value={radarMapsKey}
                onChange={(e) => setRadarMapsKey(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                placeholder="Enter your Radar Maps API key"
              />
            </label>
            <CopyButton value={radarMapsKey} label="Radar Maps API key" />
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Your API keys will be stored locally and never shared.
          </p>

          <div className="flex justify-between gap-2">
            <button
              type="button"
              onClick={handleClearKeys}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
            >
              Clear All Keys
            </button>
            <div className="flex gap-2">
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
          </div>
        </form>
      </div>
    </div>
  );
}
