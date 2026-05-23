type SidebarProps = {
  activeItem?: string;
};

const navItems = ["Dashboard", "Documents", "Security Logs"];

export default function Sidebar({ activeItem = "Dashboard" }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 border-r border-slate-800 bg-slate-900 p-6 text-white">
      <h1 className="text-2xl font-bold text-blue-400">SecureCloud</h1>

      <p className="mt-2 text-sm text-slate-400">Secure Document Platform</p>

      <nav className="mt-10 space-y-3">
        {navItems.map((item) => (
          <div
            key={item}
            className={
              item === activeItem
                ? "rounded-lg bg-slate-800 px-4 py-3"
                : "rounded-lg px-4 py-3 text-slate-400"
            }
          >
            {item}
          </div>
        ))}
      </nav>
    </aside>
  );
}
