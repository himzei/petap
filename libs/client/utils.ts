export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export function priceFormat(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function dateFormat(date: string) {
  const before = date.split("-");
  const after = `${before[0]}년 ${before[1]}월 ${before[2]}일`;
  return after;
}
