export type AccessibilityToken = string;

let idCounter = 0;

export default function accessibilityToken(prefix: string = 'id_'): AccessibilityToken {
  idCounter += 1;
  const id = idCounter;
  return prefix + id;
}
