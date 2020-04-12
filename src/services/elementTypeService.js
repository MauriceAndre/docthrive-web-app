const elementTypes = [
  {
    id: 1,
    name: "File",
    extensions: ["*"],
    icon: "file",
  },
  {
    id: 257,
    name: "Root",
    icon: "archive",
  },
  {
    id: 258,
    name: "Folder",
    icon: "folder",
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
