"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";

import Konva from "konva";
import { Stage, Layer, Rect, Image } from "react-konva";
import useImage from "use-image";

import { CanvasText } from "./CanvasText";

export const GenerateImageCanvas = () => {
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const innerWidth = window.innerWidth - 100;
  const innerHeight = window.innerHeight - 100;
  const { current: orangeBoxPositionX } = useRef(innerWidth);
  const { current: orangeBoxPositionY } = useRef(innerHeight);
  const [width, setWidth] = useState(innerWidth);
  const [height, setHeight] = useState(innerHeight);
  const [imageFile, setImageFile] = useState<string | ArrayBuffer | null | undefined>(null);
  // const [image] = useImage("https://konvajs.org/assets/lion.png");
  const [image] = useImage(String(imageFile));

  const handleExport = (stageRef: MutableRefObject<Konva.Stage | null>) => {
    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL();
    console.log(uri);
  };

  // window幅監視
  useEffect(() => {
    const stageWrapElement = stageWrapRef.current;
    if (!stageWrapElement) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
        setHeight(entry.contentRect.height);
      }
    });
    resizeObserver.observe(stageWrapElement);

    return () => {
      resizeObserver.unobserve(stageWrapElement);
    };
  }, [stageWrapRef]);

  return (
    <>
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={(e) => {
          console.log(e.target.files);
          const file = e.target.files && e.target.files[0];
          const reader = new FileReader();
          file && reader.readAsDataURL(file);
          reader.onload = (e) => {
            const base64Data = e.target?.result;
            console.log("Base64 data:", base64Data);
            setImageFile(base64Data);
          };
        }}
      />
      <button onClick={() => handleExport(stageRef)}>base64形式のデータをログに表示</button>
      <div ref={stageWrapRef}>
        <Stage width={width} height={height} ref={stageRef}>
          <Layer>
            <Image draggable image={image} alt="" />
            <Rect
              draggable
              x={orangeBoxPositionX / 2}
              y={orangeBoxPositionY / 2}
              width={80}
              height={80}
              fill="orange"
              onDragEnd={(e) => {}}
            />
            <Rect x={0} y={0} width={80} height={80} fill="red" />
            <Rect x={width - 80} y={0} width={80} height={80} fill="red" />
            <Rect x={width - 80} y={height - 80} width={80} height={80} fill="red" />
            <Rect x={0} y={height - 80} width={80} height={80} fill="red" />
            <CanvasText stage={stageRef} />
          </Layer>
        </Stage>
      </div>
    </>
  );
};
