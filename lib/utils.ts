import { differenceInYears, differenceInMonths, yearsToMonths } from "date-fns";

import constants from "./constants";

function formatNumber(number: number): string {
  return Intl.NumberFormat().format(number);
}

function getLevel(startDate: Date) {
  const years = differenceInYears(new Date(), startDate);
  if (years >= 7) {
    return constants.LEVELS[4];
  } else if (years >= 3) {
    return constants.LEVELS[3];
  } else if (years >= 2) {
    return constants.LEVELS[2];
  } else if (years >= 1) {
    return constants.LEVELS[1];
  }
  return constants.LEVELS[0];
}

function getNextLevel(startDate: Date) {
  const level = getLevel(startDate);
  switch (level) {
    default:
    case constants.LEVELS[0]:
      return constants.LEVELS[1];
    case constants.LEVELS[1]:
      return constants.LEVELS[2];
    case constants.LEVELS[2]:
      return constants.LEVELS[3];
    case constants.LEVELS[3]:
      return constants.LEVELS[4];
  }
}

function getTotalProgress(startDate: Date) {
  const years = differenceInYears(new Date(), startDate);
  return years;
}

function getCurrentLevelMax(level: string) {
  switch (level) {
    case constants.LEVELS[3]:
      return yearsToMonths(7);
    case constants.LEVELS[2]:
      return yearsToMonths(3);
    case constants.LEVELS[1]:
      return yearsToMonths(2);
    default:
    case constants.LEVELS[0]:
      return yearsToMonths(1);
  }
}

function getCurrentProgress(startDate: Date) {
  const value = differenceInMonths(new Date(), startDate);
  const max = getCurrentLevelMax(getLevel(startDate));
  return { value, max };
}

function getPercentage(partial: number, total: number) {
  return (100 * partial) / total;
}

const isBrowser = typeof window !== "undefined";

const defaultExport = {
  formatNumber,
  getLevel,
  isBrowser,
  getTotalProgress,
  getCurrentProgress,
  getPercentage,
  getNextLevel,
};

export default defaultExport;
