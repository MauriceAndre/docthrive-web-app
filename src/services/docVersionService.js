const docVersions = [
  {
    id: 1,
    elementId: 22,
    workVersion: true,
    type: 1,
    createdAt: Date.now(),
    url:
      "https://file-examples.com/wp-content/uploads/2017/08/file_example_PPT_250kB.ppt",
    version: "1.0",
  },
  {
    id: 1,
    elementId: 26,
    workVersion: true,
    type: 1,
    createdAt: Date.now(),
    url:
      "https://file-examples.com/wp-content/uploads/2017/02/file-sample_1MB.doc",
    version: "1.0",
  },
  {
    id: 1,
    elementId: 28,
    workVersion: true,
    type: 1,
    createdAt: Date.now(),
    url: "https://go.microsoft.com/fwlink/?LinkID=521962",
    version: "1.0",
  },
];

export async function getAllDocVersions() {
  return docVersions;
}

export async function getDocVersion(id) {
  return docVersions.find((docVersion) => docVersion.id === id);
}

export function getWorkVersion(elementId) {
  return docVersions.find(
    (docVersion) => docVersion.elementId === elementId && docVersion.workVersion
  );
}

export default { getAllDocVersions, getDocVersion, getWorkVersion };
