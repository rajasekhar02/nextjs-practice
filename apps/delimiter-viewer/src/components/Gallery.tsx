import { storage } from "firebase-client";
import Image from "next/image";
import { useState } from "react";

export default function Gallery({ images }: { images: string[] }) {
  const listURLObjs = images.map(imageURL=>new URL(imageURL))
  const [firebaseImageURLs, setFirebaseImageURLs] = useState<{[key:string]:string}>({})
  const getParam = function(urlObj:URL, param:string):string{
    return urlObj.searchParams.get(param) || "Invalid"
  }
  const handleCopyToClipBoard = async function(urlObj:URL){
    await navigator.clipboard.writeText(urlObj.href)
  }
  const handleSaveImage = async function (urlObj: URL) {
    const response = await fetch(urlObj.href);
    const blob = await response.blob();
    const file = new File([blob], `${urlObj.searchParams.get("t")}.jpg`, {
      type: blob.type,
    });
    const savedURL:string = await storage.saveFile(`${process.env.NEXT_PUBLIC_BUCKET_ROOT}/${urlObj.hostname}`, file);
    setFirebaseImageURLs({...firebaseImageURLs, [getParam(urlObj,'t')]:savedURL})
    console.log(savedURL);
  };
  return (
    <div className="bg-white dark:bg-gray-700">
      <div className="max-w-8xl mx-auto px-2 py-1 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-8">
        <h2 className="sr-only">Images</h2>

        <div className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 lg:grid-cols-7 xl:grid-cols-3 xl:gap-x-8">
          {listURLObjs.map((urlObj: URL, index: number) => {
            return (
              <a href="#" className="group" key={`image-${index}`}>
                <div className="aspect-h-1 aspect-w-1 xl:aspect-h-9 xl:aspect-w-8 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={urlObj.href}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    alt={getParam(urlObj,'t')}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleSaveImage(urlObj)}
                  className="mt-2 rounded-lg bg-blue-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Save to Firebase
                </button>
                <button className={`mt-2 ml-1 rounded-lg bg-blue-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${firebaseImageURLs[getParam(urlObj,'t')]==undefined && "disabled:bg-blue-400 disabled:dark:bg-blue-500 disabled:cursor-not-allowed"}`}
                disabled={firebaseImageURLs[getParam(urlObj,'t')]==undefined} onClick={()=>handleCopyToClipBoard(urlObj)}>
                  Copy to Clipboard 
                </button>
              </a>
            );
          })}
          {/* <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt=""> */}
        </div>
      </div>
    </div>
  );
}
