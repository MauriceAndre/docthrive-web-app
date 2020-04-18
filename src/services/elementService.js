const elements = [
  {
    id: "20",
    name: "2019",
    type: 258,
    parentId: "1",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "21",
    name: "Jan",
    type: 258,
    parentId: "20",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "25",
    name: "Feb",
    type: 258,
    parentId: "20",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "22",
    name: "Invoice Icelandair 2019",
    type: 1,
    parentId: "21",
    labels: ["Invoice", "Vacation"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "26",
    name: "Contract Impark 2019",
    type: 1,
    parentId: "25",
    labels: ["Contract", "Work"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "28",
    name: "Letter Canada 2019",
    type: 1,
    parentId: "25",
    labels: ["Family"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "30",
    name: "2020",
    type: 258,
    parentId: "1",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "31",
    name: "Jan",
    type: 258,
    parentId: "30",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "32",
    name: "Invoice Icelandair 2020",
    type: 1,
    parentId: "31",
    labels: ["Invoice", "Vacation"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "35",
    name: "Feb",
    type: 258,
    parentId: "30",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "36",
    name: "Contract Impark 2020",
    type: 1,
    parentId: "35",
    labels: ["Contract", "Work"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "38",
    name: "Letter Canada 2020",
    type: 1,
    parentId: "35",
    labels: ["Family"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "40",
    name: "2021",
    type: 258,
    parentId: "1",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "41",
    name: "Jan",
    type: 258,
    parentId: "40",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "42",
    name: "Invoice Icelandair 2021",
    type: 1,
    parentId: "41",
    labels: ["Invoice", "Vacation"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "46",
    name: "Contract Impark 2021",
    type: 1,
    parentId: "45",
    labels: ["Contract", "Work"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "48",
    name: "Letter Canada 2021",
    type: 1,
    parentId: "45",
    labels: ["Family"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "45",
    name: "Feb",
    type: 258,
    parentId: "40",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export async function getAllElements() {
  return elements;
}

// function findElement(id, children, child) {}

export async function getElement(id) {
  // return findElement(id, )
}

export async function getChildren(elementId) {
  return elements.filter((element) => elementId === element.parentId);
}

export default { getAllElements, getChildren };
