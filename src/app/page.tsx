import { readFileSync } from "fs";
import satori from "satori";

export default async function Home() {
  const fontFile = readFileSync("src/fonts/Noto_Sans_JP/static/NotoSansJP-Medium.ttf");

  const createSVG = async () => {
    const svg = await satori(
      <div style={{ color: "black", background: "orange", width: "100%", height: "100%" }}>SVG画像</div>,
      {
        width: 600,
        height: 400,
        fonts: [
          {
            name: "NotoSansJP",
            data: await fontFile,
          },
        ],
      }
    );
    return svg;
  };

  return (
    <main>
      <p>generate images</p>
      <div dangerouslySetInnerHTML={{ __html: await createSVG() }} />
    </main>
  );
}
