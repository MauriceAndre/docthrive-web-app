const elements = [
  {
    id: 20,
    name: "2019",
    type: 257,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    children: [
      {
        id: 21,
        name: "Jan",
        type: 257,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        children: [
          {
            id: 22,
            name: "Invoice Icelandair 2019",
            type: 1,
            labels: ["Invoice", "Vacation"],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
        ],
      },
      {
        id: 25,
        name: "Feb",
        type: 257,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        children: [
          {
            id: 26,
            name: "Contract Impark 2019",
            type: 1,
            labels: ["Contract", "Work"],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
          {
            id: 28,
            name: "Letter Canada 2019",
            type: 1,
            labels: ["Family"],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
        ],
      },
    ],
  },
  {
    id: 30,
    name: "2020",
    type: 257,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    children: [
      {
        id: 31,
        name: "Jan",
        type: 257,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        children: [
          {
            id: 32,
            name: "Invoice Icelandair 2020",
            type: 1,
            labels: ["Invoice", "Vacation"],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
        ],
      },
      {
        id: 35,
        name: "Feb",
        type: 257,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        children: [
          {
            id: 36,
            name: "Contract Impark 2020",
            type: 1,
            labels: ["Contract", "Work"],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
          {
            id: 38,
            name: "Letter Canada 2020",
            type: 1,
            labels: ["Family"],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
        ],
      },
    ],
  },
  {
    id: 40,
    name: "2021",
    type: 257,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    children: [
      {
        id: 41,
        name: "Jan",
        type: 257,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        children: [
          {
            id: 42,
            name: "Invoice Icelandair 2021",
            type: 1,
            labels: ["Invoice", "Vacation"],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
        ],
      },
      {
        id: 45,
        name: "Feb",
        type: 257,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        children: [
          {
            id: 46,
            name: "Contract Impark 2021",
            type: 1,
            labels: ["Contract", "Work"],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
          {
            id: 48,
            name: "Letter Canada 2021",
            type: 1,
            labels: ["Family"],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
        ],
      },
    ],
  },
];

export async function getAllElements() {
  return elements;
}

// function findElement(id, children, child) {}

export async function getElement(id) {
  // return findElement(id, )
}

export default { getAllElements };
