import { NextResponse } from 'next/server';
export const dynamic = 'auto';
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = 'auto';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

export async function GET(request: Request) {
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
    cache: 'force-cache',
  }).then((data) => data.json());
  return NextResponse.json(data);
}
