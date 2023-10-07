import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export async function saveFile(folderPath: string, file: File):Promise<string> {
  try {
    if (!folderPath) throw new Error("No notion notes id has been provided");
    if (!file || !file.name)
      throw new Error("A valid image has not been provided");
    const publicImageUrl = await uploadFile(folderPath, file);
    return publicImageUrl;
  } catch (error) {
    console.error(`Error processing request:${error}`);
    return `Error processing request:${error}`
  }
}

async function uploadFile(folderPath: string, file: File):Promise<string> {
  const filePath = `${folderPath}/${file.name}`;
  const newImageRef = ref(storage, filePath);
  await uploadBytesResumable(newImageRef, file);
  return await getDownloadURL(newImageRef);
}

const fireStorageMethods = {
  saveFile
}

export default fireStorageMethods;