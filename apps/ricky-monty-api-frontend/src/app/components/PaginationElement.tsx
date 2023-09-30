import { Info } from "../types";

export default function PaginationElement ( {
    info,
    currentPage,
    currPageCharacterSize,
}: {info: Info,
    currentPage: number,
    currPageCharacterSize: number,}) {
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
  