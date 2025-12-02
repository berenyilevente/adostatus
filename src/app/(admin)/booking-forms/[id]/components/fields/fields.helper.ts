export const getName = (label: string) => {
  return label.toLowerCase().replace(/ /g, '_');
};
