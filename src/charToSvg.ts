const InvalidLineLengthError = Error;
import { CharacterData } from "./characters";

// svg viewbox
export const width = 500;
export const height = 800;

// scale from 8x5 character design in characters.ts
export const heightScale = height / 8;
export const widthScale = width / 5;

function pathForD(d: string) {
  d = d.trim();
  if (d.length == 0) {
    return "";
  }
  return `<path d="${d}z" />`;
}
export function charToSvg(data: CharacterData) {
  const margin = 0.1; // margin fraction between pixels

  const d = data
    .map((line, row) => {
      if (line.length != 5) {
        throw new InvalidLineLengthError("Invalid line length");
      }
      return Array.from({ length: 5 }, (_, colPos) => line.charAt(colPos))
        .map((char, col) => {
          if (char == "X") {
            return `M ${Math.round(
              col * widthScale + widthScale * margin
            )},${Math.round(
              row * heightScale + heightScale * margin
            )} h${Math.round(widthScale * (1 - margin * 2))} v${Math.round(
              heightScale * (1 - margin * 2)
            )} h-${Math.round(widthScale * (1 - margin * 2))} v-${Math.round(
              heightScale * (1 - margin * 2)
            )}`;
          } else {
            return "";
          }
        })
        .join(" ");
    })
    .join("");

  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    ${pathForD(d)}
  </svg>`;
}
