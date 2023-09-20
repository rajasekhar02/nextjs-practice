import type { InferGetStaticPropsType } from 'next';
interface TodoItem {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

async function fetchData(params: { id: string }) {
  const res = await fetch('/api/', { cache: 'no-store' });
  const data = await res.json();
  return data;
}

export default async function Page() {
  const data = await fetchData({ id: '1' });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-medium text-gray-200">{data.title}</h1>
      <p className="font-medium text-gray-500">{data.body}</p>
    </div>
  );
}
