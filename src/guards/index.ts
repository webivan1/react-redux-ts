export function isHtmlInputElement(element: unknown): element is HTMLInputElement {
  return element instanceof HTMLInputElement;
}