const elementTypes = [
  {
    id: 1,
    name: "File",
    extension: "*",
  },
  {
    id: 257,
    name: "Folder",
  },
];

// 1-256 === documents
// 257-512 === folders

export async function getAllElementTypes() {
  return elementTypes;
}

export default {
  getAllElementTypes,
};
