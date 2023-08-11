"use client";

import dynamic from "next/dynamic";

export const NoSSRGenerateImageCanvas = dynamic(
  () => import("./components/GenerateImageCanvas").then((mod) => mod.GenerateImageCanvas),
  {
    ssr: false,
  }
);

export default function GenerateImage() {
  return (
    <>
      <div>generate image</div>
      <NoSSRGenerateImageCanvas />
    </>
  );
}
