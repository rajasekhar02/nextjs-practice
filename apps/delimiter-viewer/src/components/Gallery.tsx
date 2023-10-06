import { updateNotesImage } from "@/lib/firebase/storage";
import Image from "next/image";

export default function Gallery({ images }: { images: string[] }) {
  const handleSaveImage = async function (imageUrl: string) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File(
      [blob],
      `${imageUrl.slice(imageUrl.length - 20, 20)}.jpg`,
      { type: blob.type },
    );
    console.log(file);
    const savedURL = await updateNotesImage(imageUrl.slice(0, 20), file);
    console.log(savedURL);
  };
  return (
    <div className="bg-white dark:bg-gray-700">
      <div className="lg:max-w-10xl mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {images.map((imageURL: string, index: number) => {
            return (
              <a href="#" className="group" key={`image-${index}`}>
                <div className="aspect-h-1 aspect-w-1 xl:aspect-h-9 xl:aspect-w-8 w-full overflow-hidden rounded-lg bg-gray-200">
                  <Image
                    fill={true}
                    src={imageURL}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    alt={imageURL}
                  ></Image>
                </div>
                <button
                  onClick={() => handleSaveImage(imageURL)}
                  className="mt-4 text-sm text-gray-700 dark:text-gray-300"
                >
                  Save to Firebase
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
