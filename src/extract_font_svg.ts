import { characters } from "./characters.js";
import { charToSvg, width, widthScale } from "./charToSvg.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";

const targetDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "font-build"
);

function pathForChar(char: string, characterName: undefined | string) {
  const code = char.charCodeAt(0);
  let charName = characterName ?? char;
  return path.join(targetDir, `${code}-${charName}.svg`);
}

await Promise.all(
  Object.entries(characters).map(async ([char, { data, characterName }]) => {
    const fileName = pathForChar(char, characterName);
    console.log(`Writing ${fileName}`);
    try {
      await fs.writeFile(fileName, charToSvg(data));
    } catch (e) {
      console.log(`Error writing ${char}`);
    }
  })
);

const importFontforgeScript =
  `Open("${targetDir}/../LCD1602.sfd");
` +
  Object.entries(characters)
    .map(([char, { characterName }]) => {
      return `Select(${char.charCodeAt(0)});
Clear();
Import(${JSON.stringify(pathForChar(char, characterName))});
SetWidth(${width + widthScale});
CenterInWidth();
`;
    })
    .join("\n") +
  `
  Generate("${targetDir}/LCD1602.ttf");
    Generate("${targetDir}/LCD1602.woff2");
    Save("${targetDir}/../LCD1602.sfd");
    Close();
    `;

await fs.writeFile(
  path.join(targetDir, "fontforge_import.pe"),
  importFontforgeScript
);
