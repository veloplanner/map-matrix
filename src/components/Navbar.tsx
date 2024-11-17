import { Toolbar } from "./Toolbar";

export function Navbar() {
  return (
    <nav className="h-14 bg-white border-b border-slate-200">
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex w-full items-center justify-between gap-8">
          <h1 className="text-lg font-semibold text-slate-900">MapMatrix</h1>
          <Toolbar />
        </div>
      </div>
    </nav>
  );
}
