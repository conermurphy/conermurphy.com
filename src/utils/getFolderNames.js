import { readdirSync } from 'fs';

// --- Get an array of folder names existing within the passsed folder path.
export function getFolderNames(source) {
  const getDirectories = readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  return getDirectories;
}
