"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, RefObject } from "react";

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
  const [canvasTextPosition, setCanvasTextPositionl] = useState({ x: 0, y: 0 });
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

  const removeTextArea = (event: MouseEvent | KeyboardEvent<HTMLInputElement>) => {
    if (event instanceof MouseEvent && inputTextRef.current && !inputTextRef.current.contains(event.target as Node)) {
      setIsSelected(false);
      textRef.current?.show();
    }
    if ("key" in event && event.key === "Enter") {
      setIsSelected(false);
      textRef.current?.show();
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", removeTextArea);
    return () => window.removeEventListener("mousedown", removeTextArea);
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
            onKeyDown={removeTextArea}
          />
        </Html>
      )}
      <Text
        draggable
        ref={textRef}
        x={canvasTextPosition.x}
        y={canvasTextPosition.y}
        onDragEnd={(e) => setCanvasTextPositionl({ x: e.target.attrs.x, y: e.target.attrs.y })}
        text={inputText}
        onDblClick={handleDblClick}
      />
    </>
  );
};
