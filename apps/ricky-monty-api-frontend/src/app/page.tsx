"use server";


import type {
  ListCharacterResponse,
  Character,
  Info,
  RickMortyAPIListParams,
  RickMortyAPISearchParams,
  CharacterPageRouteParams,
} from "./types";

import ListElement from "./components/ListElement";
import PaginationElement from "./components/PaginationElement";

async function fetchData({
  page,
}: RickMortyAPIListParams &
  RickMortyAPISearchParams): Promise<ListCharacterResponse> {
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

export default async function CharacterPage({
  searchParams,
}: {
  searchParams: CharacterPageRouteParams;
}) {
  const parsedRouteParams = {
    page: searchParams.page ? +searchParams.page : 1,
  };

  const data = await fetchData({
    page: parsedRouteParams.page,
  });
  const { info, results } = data;
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/100 shadow-sm">
        <div className="pagination-actions ml-auto mr-auto max-w-7xl pb-4 pl-4 pr-4 pt-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8">
          <PaginationElement info={info} currentPage={parsedRouteParams.page} currPageCharacterSize={results.length}></PaginationElement>
          {/* {paginationElement(info, parsedRouteParams.page, results.length)} */}
        </div>
      </header>
      <main>
        <div className="ml-auto mr-auto max-w-7xl sm:pl-6 sm:pr-4 lg:pl-8 lg:pr-8">
          <ul
            role="list"
            className="grid grid-cols-1 gap-4 pb-8 pl-4 pr-4 pt-8 sm:grid-cols-2 sm:pl-0 sm:pr-0 md:grid-cols-3 lg:grid-cols-4"
          >
            {results.map(ListElement)}
          </ul>
        </div>
      </main>
    </>
  );
}
