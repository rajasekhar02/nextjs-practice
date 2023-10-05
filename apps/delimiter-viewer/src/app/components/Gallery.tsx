import Image from "next/image"

export default function Gallery({images}:{images:string[]}){
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
{            images.map((imageURL:string, index:number)=>{
                            return (
                                <Image key={`image-${index}`} fill={true} src={imageURL} className="h-auto max-w-full rounded-lg" alt={imageURL}></Image>
                            )
                        })}
                {/* <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt=""> */}
            </div>
        </div>
    )
}