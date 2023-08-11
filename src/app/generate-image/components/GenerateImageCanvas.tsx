"use client";

import Konva from "konva";
import { MutableRefObject, useRef } from "react";
import { Stage, Layer, Rect } from "react-konva";

export const GenerateImageCanvas = () => {
  const width = window.innerWidth - 100;
  const height = window.innerHeight - 100;
  const stageRef = useRef(null);

  const handleExport = (stageRef: MutableRefObject<Konva.Stage | null>) => {
    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL();
    console.log(uri);
  };

  return (
    <>
      <button onClick={() => handleExport(stageRef)}>base64形式のデータをログに表示</button>
      <Stage width={width} height={height} ref={stageRef}>
        <Layer>
          <Rect x={0} y={0} width={80} height={80} fill="red" />
          <Rect x={width - 80} y={0} width={80} height={80} fill="red" />
          <Rect x={width - 80} y={height - 80} width={80} height={80} fill="red" />
          <Rect x={0} y={height - 80} width={80} height={80} fill="red" />
        </Layer>
      </Stage>
    </>
  );
};
