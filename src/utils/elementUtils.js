export function isFolder(element) {
  return element.type > 256;
}

export function isFile(element) {
  return element.type <= 256;
}
