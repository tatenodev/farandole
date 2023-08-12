"use client";

import { RefObject, useEffect, useRef, useState } from "react";

import Konva from "konva";
import { Stage } from "konva/lib/Stage";
import { Text } from "react-konva";
import { Html } from "react-konva-utils";

type CanvasTextProps = {
  stage: RefObject<Stage>;
};

export const CanvasText = ({ stage }: CanvasTextProps) => {
  const textRef = useRef<Konva.Text>(null);
  const inputTextRef = useRef<HTMLInputElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isSelected, setIsSelected] = useState(false);
  const [inputText, setInputText] = useState("draggableなテキスト&ダブルクリックでテキスト入力");

  const handleDblClick = () => {
    if (!stage.current || !textRef.current) return;
    setIsSelected(true);
    textRef.current.hide();
    const textPosition = textRef.current.absolutePosition();
    const areaPosition = {
      x: textPosition.x,
      y: textPosition.y,
      // x: stage.current.container().offsetLeft + textPosition.x,
      // y: stage.current.container().offsetTop + textPosition.y,
    };
    setPosition(areaPosition);
  };

  const handleShow = (event: MouseEvent) => {
    if (inputTextRef.current && !inputTextRef.current.contains(event.target as Node)) {
      setIsSelected(false);
      textRef.current?.show();
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleShow);
    return () => window.removeEventListener("mousedown", handleShow);
  }, []);

  return (
    <>
      {isSelected && (
        <Html
          divProps={{
            style: {
              position: "absolute",
              top: `${position.y}px`,
              left: `${position.x}px`,
            },
          }}
        >
          <input
            ref={inputTextRef}
            placeholder="テキストの入力"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Html>
      )}
      <Text draggable ref={textRef} text={inputText} onDblClick={handleDblClick} />
    </>
  );
};
