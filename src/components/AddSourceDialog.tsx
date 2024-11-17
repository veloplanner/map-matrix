import { useState } from "react";
import { NewSourceFormData } from "../types";

interface AddSourceDialogProps {
  onAdd: (source: NewSourceFormData) => void;
  onClose: () => void;
}

export function AddSourceDialog({ onAdd, onClose }: AddSourceDialogProps) {
  const [formData, setFormData] = useState<NewSourceFormData>({
    name: "",
    type: "vector",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAdd(formData);
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      style={{ zIndex: 9999 }}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add New Map Source</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    type: e.target.value as "vector" | "raster",
                    style: undefined,
                    url: undefined,
                  }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="vector">Vector</option>
                <option value="raster">Raster</option>
              </select>
            </label>
          </div>

          {formData.type === "vector" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Style URL
                <input
                  type="url"
                  value={formData.style ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, style: e.target.value }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder="https://example.com/style.json"
                  required
                />
              </label>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tile URL
                <input
                  type="url"
                  value={formData.url ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, url: e.target.value }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder="https://tile.example.com/{z}/{x}/{y}.png"
                  required
                />
              </label>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Attribution
              <input
                type="text"
                value={formData.attribution ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    attribution: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="© OpenStreetMap contributors"
              />
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white rounded-md bg-blue-600 hover:bg-blue-700"
            >
              Add Source
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
