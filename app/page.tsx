"use server";

interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  gender: "Male" | "Female";
  image: string;
}

type Info = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};
interface ListCharacterResponse {
  info: Info;
  results: Character[];
}

type URLParams = {
  page: number;
};

async function fetchData({
  page,
}: {
  page: number;
}): Promise<ListCharacterResponse> {
  const URL = `http://localhost:3000/api?${new URLSearchParams(
    `page=${page}`,
  )}`;
  console.log(URL);
  const res: Response = await fetch(URL, {
    method: "GET",
    cache: "no-store",
  });
  const data: ListCharacterResponse = await res.json();
  data.info.next = `?page=${page + 1 > data.info.pages ? 1 : page + 1}`;
  data.info.prev = `?page=${page - 1 == 0 ? data.info.pages : page - 1}`;
  return data;
}

export default async function Page({
  searchParams,
}: {
  searchParams: URLParams;
}) {
  console.log(searchParams);
  const data = await fetchData({ page: searchParams.page || 1 });
  const { info, results } = data;
  return (
    <div className="space-y-4">
      <div className="pagination-actions">
        {<a href={info.next}>Next</a>}
        {<a href={info.prev}>Prev</a>}
      </div>
      <ul className="grid-cols-4 grid gap-4">
        {results.map((character) => (
          <li>
            <h1 className="text-2xl font-medium text-gray-200">
              {character.name}
            </h1>
            <p className="font-medium text-gray-500">{character.status}</p>
            <img
              className="rounded-full w-32 h-32 shrink-0"
              src={character.image}
            ></img>
          </li>
        ))}
      </ul>
    </div>
  );
}
