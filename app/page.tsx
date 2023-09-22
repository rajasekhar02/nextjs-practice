"use server";

import Image from "next/image";
import type {
  ListCharacterResponse,
  Character,
  Info,
  RickMortyAPIListParams,
  RickMortyAPISearchParams,
} from "./types";

const statusToColor: { [k in Character["status"]]: [string, string] } = {
  Alive: ["text-green-700/100", "ring-green-600/20"],
  Dead: ["text-red-700/100", "ring-red-600/20"],
  unknown: ["text-gray-700/100", "ring-gray-600/20"],
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

const paginationElement = function (info: Info, currentPage: number) {
  return (
    <nav>
      <div>
        {(currentPage - 1) * 20 + 1} - {currentPage * 20} of {info.count}
      </div>
      <div>{<a href={info.prev}>Prev</a>}</div>
      <div>{<a href={info.next}>Next</a>}</div>
    </nav>
  );
};

export default async function Page({
  searchParams,
}: {
  searchParams: RickMortyAPIListParams & RickMortyAPISearchParams;
}) {
  const data = await fetchData({ page: searchParams.page || 1 });
  const { info, results } = data;

  return (
    <div className="space-y-4 bg-gray-100 pb-8 pt-8">
      <div className="pagination-actions">
        {paginationElement(info, searchParams.page || 1)}
      </div>
      <div className="ml-auto mr-auto max-w-7xl pl-4 pr-4">
        <ul role="list" className="grid grid-cols-4 gap-4">
          {results.map(ListElement)}
        </ul>
      </div>
    </div>
  );
}
