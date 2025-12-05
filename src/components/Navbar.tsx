const Navbar = () => {
  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-3 shrink-0">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <span className="font-bold text-slate-800 text-lg tracking-tight">
            LassiAI
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
