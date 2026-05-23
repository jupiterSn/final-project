import type { Exam } from "@/types";

type ExamCardProps = {
  exam: Exam;
};

export default function ExamCard({ exam }: ExamCardProps) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-white">
      <h3 className="text-lg font-bold">{exam.title}</h3>
      <p className="mt-2 text-sm text-slate-400">{exam.description}</p>
      <p className="mt-4 text-sm text-blue-300">{exam.durationMinutes} minutes</p>
    </article>
  );
}
