function formatNumber(number: number): string {
  return Intl.NumberFormat().format(number);
}

const defaultExport = {
  formatNumber,
};

export default defaultExport;
