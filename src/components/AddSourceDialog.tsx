import { useState } from "react";
import { useModalClose } from "../hooks/useModalClose";

interface AddSourceDialogProps {
  onAdd: (source: NewSourceFormData) => void;
  onClose: () => void;
}

interface FormField {
  required: boolean;
  touched: boolean;
  value: string;
}

interface FormFields {
  [key: string]: FormField;
}

interface BaseSourceFormData {
  name: string;
  url: string;
}

interface VectorSourceFormData extends BaseSourceFormData {
  type: "vector";
}

interface RasterSourceFormData extends BaseSourceFormData {
  type: "raster";
  attribution: string;
}

export type NewSourceFormData = VectorSourceFormData | RasterSourceFormData;

const initialFormState: FormFields = {
  name: { required: true, touched: false, value: "" },
  url: { required: true, touched: false, value: "" },
  type: { required: true, touched: false, value: "vector" },
  attribution: {
    required: false,
    touched: false,
    value: "OpenStreetMap contributors",
  },
};

export function AddSourceDialog({ onAdd, onClose }: AddSourceDialogProps) {
  const [formState, setFormState] = useState<FormFields>(initialFormState);
  const { handleOverlayClick } = useModalClose(onClose);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Mark all fields as touched
    setFormState((prev) =>
      Object.keys(prev).reduce(
        (acc, key) => ({
          ...acc,
          [key]: { ...prev[key], touched: true },
        }),
        {}
      )
    );

    const isValid = Object.entries(formState).every(
      ([key, field]) =>
        !field.required ||
        field.value ||
        (key === "attribution" && formState.type.value !== "raster")
    );

    if (isValid) {
      if (formState.type.value === "raster") {
        onAdd({
          name: formState.name.value,
          type: "raster",
          url: formState.url.value,
          attribution: formState.attribution.value,
        });
      } else {
        onAdd({
          name: formState.name.value,
          type: "vector",
          url: formState.url.value,
        });
      }
    }
  }

  const updateField = (fieldName: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], value },
    }));
  };

  const markAsTouched = (fieldName: string) => {
    setFormState((prev) => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], touched: true },
    }));
  };

  const getInputClassName = (field: FormField) => {
    const baseClasses = "mt-1 block w-full rounded-md shadow-sm p-2";
    const borderColor =
      field.touched && field.required && !field.value
        ? "border-red-500"
        : "border-gray-300";
    return `${baseClasses} border ${borderColor}`;
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      style={{ zIndex: 9999 }}
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add New Map Source</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
              <input
                type="text"
                value={formState.name.value}
                onChange={(e) => updateField("name", e.target.value)}
                onBlur={() => markAsTouched("name")}
                className={getInputClassName(formState.name)}
              />
              {formState.name.touched &&
                formState.name.required &&
                !formState.name.value && (
                  <p className="mt-1 text-sm text-red-500">Required</p>
                )}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
              <select
                value={formState.type.value}
                onChange={(e) => {
                  const newType = e.target.value;
                  setFormState((prev) => ({
                    ...prev,
                    type: { ...prev.type, value: newType },
                    url: { ...prev.url, value: "" },
                    attribution: {
                      ...prev.attribution,
                      value: initialFormState.attribution.value,
                      required: newType === "raster",
                    },
                  }));
                }}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
              >
                <option value="vector">Vector</option>
                <option value="raster">Raster</option>
              </select>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              URL
              <input
                type="url"
                value={formState.url.value}
                onChange={(e) => updateField("url", e.target.value)}
                onBlur={() => markAsTouched("url")}
                className={getInputClassName(formState.url)}
                placeholder={
                  formState.type.value === "vector"
                    ? "https://example.com/style.json"
                    : "https://tile.example.com/{z}/{x}/{y}.png"
                }
              />
              {formState.url.touched &&
                formState.url.required &&
                !formState.url.value && (
                  <p className="mt-1 text-sm text-red-500">Required</p>
                )}
            </label>
          </div>

          {formState.type.value === "raster" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Attribution
                <input
                  type="text"
                  value={formState.attribution.value}
                  onChange={(e) => updateField("attribution", e.target.value)}
                  onBlur={() => markAsTouched("attribution")}
                  className={getInputClassName(formState.attribution)}
                  placeholder="© OpenStreetMap contributors"
                />
                {formState.attribution.touched &&
                  formState.attribution.required &&
                  !formState.attribution.value && (
                    <p className="mt-1 text-sm text-red-500">Required</p>
                  )}
              </label>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
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
              Add Source
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
