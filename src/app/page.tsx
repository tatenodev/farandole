import { readFileSync } from "fs";
import satori from "satori";
import { ImageFactory } from "./components/ImageFactory";

export default async function Home() {
  const fontFile = readFileSync("src/fonts/Noto_Sans_JP/static/NotoSansJP-Medium.ttf");

  const createSVG = async () => {
    const svg = await satori(<ImageFactory />, {
      width: 400,
      height: 600,
      fonts: [
        {
          name: "NotoSansJP",
          data: await fontFile,
        },
      ],
    });
    return svg;
  };

  return (
    <main>
      <p>generate images</p>
      <ImageFactory />
      <div dangerouslySetInnerHTML={{ __html: await createSVG() }} />
    </main>
  );
}
