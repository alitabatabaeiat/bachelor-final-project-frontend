import persianJs from 'persianjs';

export function englishNumber(number) {
  return persianJs(number).englishNumber().toString();
}

export function englishNumberWithCommas(amount) {
  const negativeSign = amount < 0 ? '-' : '';
  let i = negativeSign ? amount.toString().substr(1) : amount.toString();
  return englishNumber(negativeSign + i.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','));
}
