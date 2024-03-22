export const toAcronym = (str) => {
  if (!str) return '';
  return str
    .toUpperCase()
    .replace(/[^a-zA-Z ]/g, '')
    .split(' ')
    .map((word) => word[0])
    .join('');
};

export const getBranchesNames = (branches) => {
  if (!branches) return [];
  return branches.map((branch) => branch.name).join('\n');
};
export const getTelesaleNames = (telesale) => {
  if (!telesale) return [];
  return telesale.map((tele) => tele.fullname).join('\n');
};

