import { readFileSync } from "fs";
import satori from "satori";
import Link from "next/link";
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
      <ul>
        <li>
          <Link href="/canvas">canvas</Link>
        </li>
        <li>
          <Link href="/generate-image">generate-image</Link>
        </li>
      </ul>
      <ImageFactory />
      <div dangerouslySetInnerHTML={{ __html: await createSVG() }} />
    </main>
  );
}
