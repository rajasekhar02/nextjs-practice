"use server";

import Image from "next/image";
import type {
  ListCharacterResponse,
  Character,
  Info,
  RickMortyAPIListParams,
  RickMortyAPISearchParams,
  CharacterPageRouteParams,
} from "./types";

const statusToColor: { [k in Character["status"]]: [string, string] } = {
  Alive: ["text-green-700/100", "ring-green-600/20"],
  Dead: ["text-red-700/100", "ring-red-600/20"],
  unknown: ["text-gray-700/100", "ring-gray-600/20"],
};

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

const ListElement = function (character: Character, index: number) {
  return (
    <li
      className="col-span-1 flex flex-col rounded-lg bg-white text-center shadow"
      key={index}
    >
      <div className="relative flex flex-1 flex-col p-8">
        <div className="relative ml-auto mr-auto h-32 w-32">
          <Image
            fill={true}
            alt="character_picture"
            className=" shrink-0 rounded-full"
            src={character.image}
          ></Image>
        </div>

        <h3 className="mt-6 text-sm font-medium leading-5 text-gray-900">
          {character.name}
        </h3>
        <dl>
          <dt className="[clip: rect(0,0,0,0)] absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0">
            Gender | Species
          </dt>
          <dd className="text-sm text-gray-500/100">
            {character.gender} | {character.species}
          </dd>
          <dt className="[clip: rect(0,0,0,0)] absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0">
            Status
          </dt>
          <dd className="mt-3">
            <span
              className={[
                "inline-flex",
                "items-center",
                "rounded-full",
                "bg-green-50/100",
                "pb-1",
                "pl-2",
                "pr-2",
                "pt-1",
                "text-xs",
                "font-medium",
                "ring-1",
                "ring-inset",
                "capitalize",
                ...statusToColor[character.status],
              ].join(" ")}
            >
              {character.status}
            </span>
          </dd>
        </dl>
      </div>
    </li>
  );
};

const paginationElement = function (
  info: Info,
  currentPage: number,
  currPageCharacterSize: number,
) {
  const startCharacterNo = (currentPage - 1) * 20 + 1;
  return (
    <nav className="md:flex md:items-center md:justify-between">
      {/* <div className="custom-number-input h-10 w-32">
        <label
          htmlFor="custom-input-number"
          className="w-full text-sm font-semibold text-gray-700"
        >
          Goto
        </label>
        <div className="relative mt-1 flex h-10 w-full flex-row rounded-lg bg-transparent">
          <input
            type="number"
            className="text-md md:text-basecursor-default flex w-full items-center bg-gray-300 text-center font-semibold text-gray-700  outline-none hover:text-black focus:text-black  focus:outline-none"
            name="custom-input-number"
            value="0"
          ></input>
        </div>
      </div> */}
      <div className="min-w-0 flex-1">
        <h2 className="sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap sm:text-3xl sm:tracking-tight">
          Ricky Morty Characters
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
          <p className="mt-2 flex items-center text-sm text-gray-500">
            {`Showing ${startCharacterNo}-${
              startCharacterNo + currPageCharacterSize - 1
            } out of ${info.count}`}
          </p>
        </div>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0">
        <span className="sm:block">
          <a
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            href={info.prev}
          >
            Prev
          </a>
        </span>
        <span className="ml-3 sm:block">
          <a
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            href={info.next}
          >
            Next
          </a>
        </span>
      </div>
    </nav>
  );
};

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
          {paginationElement(info, parsedRouteParams.page, results.length)}
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
