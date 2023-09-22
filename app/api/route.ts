import { NextRequest,NextResponse } from 'next/server';
export const dynamic = 'auto';
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = 'auto';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get('page')
  const URL = `https://rickandmortyapi.com/api/character/?${new URLSearchParams(`page=${page}`)}`
  const data = await fetch(URL, {
    cache: 'force-cache',
  }).then((data) => data.json());
  return NextResponse.json(data);
}
