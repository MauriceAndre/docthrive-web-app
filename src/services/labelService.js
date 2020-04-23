const labels = [
  { _id: "1", name: "contract" },
  { _id: "2", name: "invoice" },
  { _id: "3", name: "email" },
  { _id: "4", name: "Berufschule", custom: true },
  { _id: "5", name: "Arbeit", custom: true },
  { _id: "6", name: "DRK", custom: true },
  { _id: "7", name: "Bank", custom: true },
];

export async function saveLabel(label) {
  labels.push({
    _id: labels.length + 1,
    name: label,
    custom: true,
  });
}

export async function getAllLabels() {
  return labels;
}

export default { getAllLabels, saveLabel };
