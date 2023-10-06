"use client";
import Image from "next/image";
import Step1Form from "@/components/Step1Form";
import GalleryView from "@/components/GalleryView";
import { useAtomValue } from "jotai";
import { formStagesAtom } from "./state";
import { FormStages } from "./types";
export default function Home() {
  let formStage = useAtomValue(formStagesAtom);
  return (
    <main className="flex justify-center">
      {formStage.stage == FormStages.Step1Form && <Step1Form></Step1Form>}
      {formStage.stage == FormStages.GalleryView && <GalleryView></GalleryView>}
    </main>
  );
}
