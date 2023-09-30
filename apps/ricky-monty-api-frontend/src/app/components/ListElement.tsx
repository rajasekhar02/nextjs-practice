import Image from "next/image";
import type { Character } from "../types";

const statusToColor: { [k in Character["status"]]: [string, string] } = {
    Alive: ["text-green-700/100", "ring-green-600/20"],
    Dead: ["text-red-700/100", "ring-red-600/20"],
    unknown: ["text-gray-700/100", "ring-gray-600/20"],
  };
  

export default function ListElement  (character: Character, index: number) {
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