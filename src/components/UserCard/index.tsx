import type { AppUser } from "@/types";

type UserCardProps = {
  user: AppUser;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-white">
      <h3 className="text-lg font-bold">{user.name}</h3>
      <p className="mt-1 text-sm text-slate-400">{user.email}</p>
      <span className="mt-4 inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase">
        {user.role}
      </span>
    </article>
  );
}
