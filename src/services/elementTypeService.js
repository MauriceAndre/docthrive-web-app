const elementTypes = [
  {
    _id: 1,
    name: "File",
    extensions: ["*"],
    icon: "file",
  },
  {
    _id: 257,
    name: "Root",
    icon: "archive",
  },
  {
    _id: 258,
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
