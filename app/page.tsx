'use server';

interface TodoItem {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

async function fetchData(params: { id: string }): Promise<TodoItem> {
  const res: Response = await fetch('http://localhost:3000/api', {
    method: 'GET',
    cache: 'no-store',
  });
  const data: TodoItem = await res.json();
  return data;
}

export default async function Page() {
  const data = await fetchData({ id: '1' });
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-medium text-gray-200">{data.userId}</h1>
      <p className="font-medium text-gray-500">{data.title}</p>
    </div>
  );
}
