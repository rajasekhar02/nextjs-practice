import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/firebase";

export async function updateNotesImage(notionNotesId: string, image: File) {
  try {
    if (!notionNotesId) throw new Error("No notion notes id has been provided");
    if (!image || !image.name)
      throw new Error("A valid image has not been provided");
    const publicImageUrl = await uploadImage(notionNotesId, image);
    return publicImageUrl;
  } catch (error) {
    console.error("Error processing request:", error);
  }
}

async function uploadImage(notionNotesId, image) {
  const filePath = `images/notionNotesId_${image.name}`;
  const newImageRef = ref(storage, filePath);
  await uploadBytesResumable(newImageRef, image);
  return await getDownloadURL(newImageRef);
}
