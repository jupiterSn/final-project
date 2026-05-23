type AuthLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function AuthLayout({
  title,
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <h1 className="mb-6 text-3xl font-bold text-center">
          {title}
        </h1>

        {children}
      </section>
    </main>
  );
}