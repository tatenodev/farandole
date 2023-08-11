"use client";

import dynamic from "next/dynamic";

export const NoSSRCanvasArea = dynamic(
  () => import("@/app/canvas/components/CanvasArea").then((mod) => mod.CanvasArea),
  {
    ssr: false,
  }
);

export default function CanvasPage() {
  return <NoSSRCanvasArea />;
}
