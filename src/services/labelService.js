const labels = [
  { id: "1", name: "contract" },
  { id: "2", name: "invoice" },
  { id: "3", name: "email" },
  { id: "4", name: "Berufschule", custom: true },
  { id: "5", name: "Arbeit", custom: true },
  { id: "6", name: "DRK", custom: true },
  { id: "7", name: "Bank", custom: true },
];

export async function saveLabel(label) {
  labels.push({
    id: labels.length + 1,
    name: label,
    custom: true,
  });
}

export async function getAllLabels() {
  return labels;
}

export default { getAllLabels, saveLabel };
