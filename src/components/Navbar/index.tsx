type NavbarProps = {
  title?: string;
  userName?: string;
  onLogout?: () => void;
};

export default function Navbar({
  title = "SecureCloud",
  userName,
  onLogout,
}: NavbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4 text-white">
      <h1 className="text-xl font-bold text-blue-400">{title}</h1>

      <div className="flex items-center gap-4">
        {userName && <span className="text-sm text-slate-300">{userName}</span>}

        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
