import { promises as fs, readdirSync } from 'fs';
import FileType from 'file-type';
import fetch from 'isomorphic-fetch';

// --- Function to get name to call image, last bit before extension and after last /
export function getImageName(path) {
  return path.split('/').pop();
}

// --- Write JSON Files Function  ---
export async function writeJSONFiles(data, filePath) {
  await fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) throw err;
  });
}

// --- Write MDX Files Function ---
export async function writeMDXFiles(data, filePath) {
  await fs.writeFile(filePath, data, {
    encoding: 'utf-8',
  });
}

// --- Function to download media from Twitter ---
export async function downloadMedia(remotePath, localPath) {
  // console.log(`Downloading ${remotePath} to ${localPath}`);
  const data = await fetch(remotePath).then((res) => res.buffer());
  const { ext = 'png' } = await FileType.fromBuffer(data);
  const fileName = getImageName(remotePath);
  const [, extension] = fileName.split('.');
  await fs.writeFile(`${localPath}/${fileName}${extension ? '' : `.${ext}`}`, data);
}

// --- Get an array of folder names existing within the passsed folder path.
export function getFolderNames(source) {
  const getDirectories = readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  return getDirectories;
}

// Function used to combine parameters into one string ready to be sent to API.
export function stringifyParams(params) {
  return Object.entries(params)
    .map(([key, vals]) => {
      // Remove all spaces
      const transformedVals = vals.toString().replace(/ /g, '');
      return `${key}=${transformedVals}`;
    })
    .join('&');
}
