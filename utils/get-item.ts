import { cache } from 'react';

export const revalidate = 3600; // revalidate the data at most every hour

export const getItem = cache(async () => {
  const item = await fetch('https://rickandmortyapi.com/api/character');
  return item;
});
