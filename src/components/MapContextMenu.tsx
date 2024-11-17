import { useEffect } from "react";

interface MapContextMenuProps {
  x: number;
  y: number;
  lat: number;
  lng: number;
  zoom: number;
  onClose: () => void;
}

export function MapContextMenu({
  x,
  y,
  lat,
  lng,
  zoom,
  onClose,
}: MapContextMenuProps) {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const menu = document.getElementById("map-context-menu");
      if (menu && !menu.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      id="map-context-menu"
      className="absolute z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-[200px]"
      style={{ left: x, top: y }}
    >
      <a
        href={`https://www.openstreetmap.org/#map=${Math.round(
          zoom
        )}/${lat}/${lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block px-4 py-2 text-sm hover:bg-slate-100"
      >
        Open in OpenStreetMap
      </a>
    </div>
  );
}
