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
  const data = await fetchData({ page: searchParams.page || 1 });
  const { info, results } = data;
  return (
    <div className="space-y-4 bg-gray-100 pb-8 pt-8">
      <div className="pagination-actions">
        {<a href={info.next}>Next</a>}
        {<a href={info.prev}>Prev</a>}
      </div>
      <div className="ml-auto mr-auto max-w-7xl pl-4 pr-4">
        <ul role="list" className="grid grid-cols-4 gap-4">
          {results.map((character, index) => (
            <li
              className="col-span-1 flex flex-col rounded-lg bg-white text-center shadow"
              key={index}
            >
              <div className="flex flex-1 flex-col p-8">
                <img
                  className="ml-auto mr-auto h-32 w-32 shrink-0 rounded-full"
                  src={character.image}
                ></img>
                <h3 className="mt-6 text-sm font-medium leading-5 text-gray-900">
                  {character.name}
                </h3>
                <p className="font-medium text-gray-500">{character.status}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
