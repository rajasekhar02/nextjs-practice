'use client';
import { useEffect, useState } from 'react';
const getData = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
interface TodoItem {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}
export default function Page() {
  let [apiData, setApiData] = useState<TodoItem>({} as TodoItem); //
  useEffect(() => {
    (async function () {
      const data: TodoItem = await getData();
      setApiData(data);
      console.log(data);
    })();
  });
  return <main>{Object.values(apiData).join(', ')}</main>;
}
