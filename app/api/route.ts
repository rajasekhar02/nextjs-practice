import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
    cache: 'force-cache',
  }).then((data) => data.json());
  return NextResponse.json(JSON.stringify(data));
}
