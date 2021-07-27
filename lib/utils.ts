import { differenceInYears } from "date-fns";

function formatNumber(number: number): string {
  return Intl.NumberFormat().format(number);
}

function getLevel(startDate: Date) {
  const years = differenceInYears(new Date(), startDate);
  if (years >= 7) {
    return "Minister";
  } else if (years >= 3) {
    return "Officer";
  } else if (years >= 2) {
    return "Activist";
  } else if (years >= 1) {
    return "Citizen";
  }
  return "Newbie";
}

const defaultExport = {
  formatNumber,
  getLevel,
};

export default defaultExport;
