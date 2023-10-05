"use client";
import Image from "next/image";
import Step1Form from "./components/Step1Form";
import StatusComponent from "./components/StatusComponent";
import { useAtomValue } from "jotai";
import { formStagesAtom } from "./state";
import { ReactElement } from "react";
import { FormStages } from "./types";
export default function Home() {
  let formStage = useAtomValue(formStagesAtom)
  return (
    <main className="flex justify-center">
      
      {formStage.stage == FormStages.Step1Form && <Step1Form></Step1Form>}
      {formStage.stage == FormStages.Step2Form && <StatusComponent></StatusComponent>}
      
    </main>
  );
}
