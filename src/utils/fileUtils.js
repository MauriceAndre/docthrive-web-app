export const getName = function (file) {
  const splitChar = ".";
  let name = file.name.split(splitChar);
  name.length > 1 && name.pop();
  return name.join(splitChar);
};
